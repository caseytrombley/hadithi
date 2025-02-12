<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Podcasts</li>
          <li class="breadcrumb-item active" aria-current="page">Add Podcast</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <div class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4" onsubmit="return false">
            <div class="mb-3">
              <label for="title" class="form-label">Podcast Title</label>
              <input class="d-flex col-12 form-input p-2" type="text" v-model="podcast.title"
                     @change="toggleDisabledSaveButton(false)" :maxlength="maxInputChars" placeholder="Podcast Title"/>
            </div>
            <div class="mb-3">
              <label for="anchor" class="form-label">Podcast Anchor(s)</label>
              <input class="d-flex col-12 form-input p-2" type="text" v-model="podcast.anchor"
                     @change="toggleDisabledSaveButton(false)" :maxlength="maxInputChars"
                     placeholder="Podcast Anchor(s)"/>
            </div>
            <Grammarly :clientId="grammarlyClientId" :config="grammarlyConfig">
              <div class="mb-3">
                <label class="form-label">Podcast Note</label>
                <GrammarlyEditorPlugin>
                  <quill-editor ref="myQuillEditor" v-model="podcast.note" @change="onEditorChange"/>
                </GrammarlyEditorPlugin>
              </div>
            </Grammarly>
            <div class="mb-3">
              <label class="form-label">Podcast Tags</label>
              <multi-select data-set="tags" @handleInput="handleInput" @change="toggleDisabledSaveButton(false)"/>
            </div>
            <div class="mb-3">
              <label class="form-label">Podcast Cover</label>
              <input type="file" placeholder="Podcast cover" class="form-control" accept="image/*"
                     @change="setSelectedFiles($event.target.files)"/>
            </div>
            <div class="mt-5 mb-3">
              <ButtonMenu
                  :document="podcast"
                  :permissions="permissions"
                  :is-disabled="isDisabled"
                  :is-saved="saved"
                  @cancel="handleCancel"
                  @save="handleSave"
                  @view="handleView"
                  @edit="handleEdit"
                  @publish="handlePublish(true)"
                  @unPublish="handlePublish(false)"
                  @delete="handleDelete"
                  :key="reloadKey"
              />
            </div>
            <div class="writer-generated">
              <span class="chip" v-if="saved">
                last saved {{ getRelativeTime(this.lastSavedAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMenu from "@/components/ButtonMenu";
import MultiSelect from "@/components/MultiSelect";
import {Grammarly, GrammarlyEditorPlugin} from "@grammarly/editor-sdk-vue";
import loading from "vue-full-loading";
import moment from "moment";
import PodcastService from "@/services/PodcastsService";
import {validateRequiredFields} from "@/utils/ValidationUtil";
import StorageService from "@/services/StorageService";

export default {
  name: "AddPodcast",
  components: {
    ButtonMenu,
    Grammarly,
    GrammarlyEditorPlugin,
    loading,
    MultiSelect
  },
  data() {
    return {
      loader: {
        show: false,
        label: "Loading...",
      },
      maxInputChars: 140,
      podcast: {
        title: "",
        anchor: "",
        note: "",
        coverProvided: false,
        coverPath: "",
        cover: "",
        tags: [],
        chapters: [],
        published: false,
        email: localStorage.getItem("email"),
      },
      grammarlyClientId: `${process.env.VUE_APP_GRAMMARLY_CLIENT_ID}`,
      grammarlyConfig: {
        documentDialect: 'american',
        autocomplete: 'on'
      },
      isDisabled: true,
      podcastId: null,
      saved: false,
      lastSavedAt: "",
      permissions: {},
      reloadKey: 0
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    userPermissions: function () {
      return this.$store.state.userPermissions;
    },
  },
  mounted() {
    this.permissions = this.getUserPermissions(this.userPermissions);
  },
  methods: {
    getUserPermissions(userPermissions) {
      return {
        CAN_WRITE: userPermissions["CAN_WRITE_PODCAST"],
        CAN_READ: userPermissions["CAN_READ_PODCAST"],
        CAN_EDIT: userPermissions["CAN_EDIT_PODCAST"],
        CAN_PUBLISH: userPermissions["CAN_PUBLISH_PODCAST"],
        CAN_DELETE: userPermissions["CAN_DELETE_PODCAST"]
      };
    },
    toggleDisabledSaveButton(isDisabled) {
      this.isDisabled = isDisabled;
      this.reloadKey++;
    },
    getRelativeTime(timestamp) {
      return moment(timestamp).fromNow();
    },
    onEditorChange(event) {
      this.content = event.html;
      this.toggleDisabledSaveButton(false);
    },
    setSelectedFiles(files) {
      this.toggleDisabledSaveButton(false);
      const file = files[0];
      if (file) {
        this.podcast.cover = file;
        this.podcast.coverProvided = true;
      }
      if (!file) {
        this.podcast.cover = "";
        this.podcast.coverPath = "";
        this.podcast.coverProvided = false;
      }
    },
    handleInput(input) {
      this.podcast[input.key] = input.values;
    },
    handleCancel() {
      this.$router.push({name: "MyPodcasts"});
    },
    async handleSave() {
      this.loader.show = true;
      this.toggleDisabledSaveButton(true);

      if (this.podcast.coverProvided) {
        const podcastCoverUploadDir = "podcasts/covers";
        this.podcast.coverPath = `${podcastCoverUploadDir}/${this.podcast.cover.name}`;
        this.podcast.cover = await StorageService.uploadFile(podcastCoverUploadDir, this.podcast.cover);
      }

      if (this.podcastId && this.checkRequiredFields(this.podcast)) {
        this.podcast.updatedAt = new Date();
        await PodcastService.updatePodcast(this.podcastId, this.podcast);
      }

      if (!this.podcastId && this.checkRequiredFields(this.podcast)) {
        const podcast = await PodcastService.addPodcast(this.podcast);
        this.podcastId = this.podcast.id = podcast["id"];
      }

      this.saved = true;
      this.lastSavedAt = Date.now();
      this.loader.show = false;
      this.podcast.coverProvided = false;
    },
    handleView() {
      this.$router.push({name: "ViewPodcast", params: {podcastId: this.podcastId}});
    },
    handleEdit() {
      this.$router.push({name: "EditPodcast", params: {podcastId: this.podcastId}});
    },
    async handlePublish(isPublished) {
      this.podcast.published = isPublished;
      await PodcastService.updatePodcast(this.podcastId, this.podcast);
      this.toggleDisabledSaveButton(true);
    },
    async handleDelete() {
      await PodcastService.deletePodcast(this.podcastId);
      this.toggleDisabledSaveButton(true);
      this.handleCancel();
    },
    checkRequiredFields(newObject) {
      const validatedObject = validateRequiredFields(newObject);
      if (!validatedObject.valid) {
        alert(validatedObject.message);
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped></style>
