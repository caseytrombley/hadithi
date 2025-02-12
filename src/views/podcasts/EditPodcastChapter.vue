<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a :href="`/podcasts/view/${podcastId}`">Chapters</a></li>
          <li class="breadcrumb-item active" aria-current="page">Edit Chapter</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <div class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4" onsubmit="return false">
            <div class="mb-3">
              <label for="title" class="form-label">Chapter Title</label>
              <input class="d-flex col-12 form-input p-2" type="text" v-model="chapter.title"
                     @change="toggleDisabledSaveButton(false)" :maxlength="maxInputChars" placeholder="Chapter Title"/>
            </div>
            <Grammarly :clientId="grammarlyClientId" :config="grammarlyConfig">
              <div class="mb-3">
                <label class="form-label">Chapter Note</label>
                <GrammarlyEditorPlugin>
                  <quill-editor ref="myQuillEditor" v-model="chapter.note" @change="onEditorChange"/>
                </GrammarlyEditorPlugin>
              </div>
            </Grammarly>
            <div class="mb-3">
              <label class="form-label">Chapter Category</label>
              <select class="form-select" aria-label="Chapter Category" v-model="chapter.category" @change="handleChangeChapterCategory">
                <option selected value="audio">Audio</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div class="mb-3" v-if="isAudio">
              <label for="description" class="form-label">Chapter Audio Feed</label>
              <input type="file" placeholder="Chapter audio feed" class="form-control" accept=".mp3"
                     @change="setSelectedFiles($event.target.files)"/>
              <div class="text-center">
                <strong>Mp3:</strong>&nbsp;
                <a :href="chapter.feed" target="_blank">{{ chapter.title }}</a>
              </div>
            </div>
            <div class="mb-3" v-if="isVideo">
              <label for="title" class="form-label">Chapter Video Feed</label>
              <input class="d-flex col-12 form-input p-2" type="text" v-model="chapter.feed"
                     @change="toggleDisabledSaveButton(false)" placeholder="Chapter Video Feed"/>
              <p class="text-center"><strong>Vimeo:</strong></p>
              <div class="d-flex justify-content-center align-content-center">
                <video-player :video-id="chapter.feed" />
              </div>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="chapter.isFree"
                     @change="toggleDisabledSaveButton(false)">
              <label class="form-check-label" for="flexSwitchCheckChecked">Is Free?</label>
            </div>
            <div class="mt-5 mb-3">
              <ButtonMenu
                  :document="chapter"
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
import VideoPlayer from "@/components/VideoPlayer.vue";
import {Grammarly, GrammarlyEditorPlugin} from "@grammarly/editor-sdk-vue";
import loading from "vue-full-loading";
import moment from "moment";
import PodcastService from "@/services/PodcastsService";
import {validateRequiredFields} from "@/utils/ValidationUtil";
import StorageService from "@/services/StorageService";

export default {
  name: "EditPodcastChapter",
  components: {
    ButtonMenu,
    Grammarly,
    GrammarlyEditorPlugin,
    loading,
    MultiSelect,
    VideoPlayer
  },
  data() {
    return {
      loader: {
        show: false,
        label: "Loading...",
      },
      maxInputChars: 140,
      chapter: {
        title: "",
        note: "",
        category: "audio",
        feedProvided: false,
        feedPath: "",
        feed: "",
        isFree: false,
        published: false
      },
      grammarlyClientId: `${process.env.VUE_APP_GRAMMARLY_CLIENT_ID}`,
      grammarlyConfig: {
        documentDialect: 'american',
        autocomplete: 'on'
      },
      isDisabled: true,
      podcastId: null,
      chapterId: null,
      saved: true,
      lastSavedAt: Date.now(),
      permissions: {},
      reloadKey: 0,
      PodcastService: PodcastService
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    userPermissions: function () {
      return this.$store.state.userPermissions;
    },
    isAudio() {
      return this.chapter.category === "audio";
    },
    isVideo() {
      return this.chapter.category === "video";
    }
  },
  async created() {
    this.podcastId = this.$route.params.podcastId;
    this.chapterId = this.$route.params.chapterId;
    this.chapter = {...this.chapter, ...await this.getChapter(this.podcastId, this.chapterId)};
    this.chapter.feedProvided = false;
    this.permissions = this.getUserPermissions(this.userPermissions);
    this.reloadKey++;
  },
  methods: {
    getChapter(podcastId, chapterId) {
      return PodcastService.getPodcastChapter(podcastId, chapterId);
    },
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
        this.chapter.feed = file;
        this.chapter.feedProvided = true;
      }
      if (!file) {
        this.chapter.feed = "";
        this.chapter.feedPath = "";
        this.chapter.feedProvided = false;
      }
    },
    handleInput(input) {
      this.chapter[input.key] = input.values;
    },
    handleCancel() {
      this.handleView();
    },
    async handleSave() {
      this.loader.show = true;
      this.toggleDisabledSaveButton(true);

      if (this.chapter.feedProvided) {
        await StorageService.deleteFile(this.chapter.feedPath);
        const podcastChapterFeedUploadDir = `podcasts/chapters/${this.podcastId}`;
        this.chapter.feedPath = `${podcastChapterFeedUploadDir}/${this.chapter.feed.name}`;
        this.chapter.feed = await StorageService.uploadFile(podcastChapterFeedUploadDir, this.chapter.feed);
      }

      if (this.chapterId && this.checkRequiredFields(this.chapter)) {
        this.chapter.updatedAt = new Date();
        await PodcastService.updatePodcastChapter(this.podcastId, this.chapterId, this.chapter);
      }

      if (!this.chapterId && this.checkRequiredFields(this.chapter)) {
        const chapter = await PodcastService.addPodcastChapter(this.podcastId, this.chapter);
        this.chapterId = this.chapter.id = chapter["id"];
      }

      this.saved = true;
      this.lastSavedAt = Date.now();
      this.loader.show = false;
      this.chapter.feedProvided = false;
    },
    handleView() {
      this.$router.push({name: "ViewPodcast", params: {podcastId: this.podcastId}});
    },
    handleEdit() {
      this.$router.push({name: "EditPodcastChapter", params: {chapterId: this.chapterId}});
    },
    async handlePublish(isPublished) {
      this.chapter.published = isPublished;
      this.chapter.updatedAt = new Date();
      await PodcastService.updatePodcastChapter(this.podcastId, this.chapterId, this.chapter);
      this.toggleDisabledSaveButton(true);
    },
    async handleDelete() {
      await PodcastService.deletePodcastChapter(this.podcastId, this.chapterId);
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
    },
    handleChangeChapterCategory(e){
      this.toggleDisabledSaveButton(false);
      const selected = e.target.value;
      if(selected === "video"){
        this.chapter.feedPath = selected;
        this.chapter.feedProvided = false;
      }
    }
  }
};
</script>

<style scoped></style>
