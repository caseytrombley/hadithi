<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Stories</li>
          <li class="breadcrumb-item active" aria-current="page">Edit Story</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto text-align-start">
          <div class="mb-3">
            <label class="form-label">Story Title</label>
            <input
                class="d-flex col-12 form-input p-2"
                type="text"
                v-model="story.title"
                @change="toggleDisabledSaveButton(false)"
                :maxlength="maxTitleChars"
                required
            />
          </div>
          <Grammarly :clientId="grammarlyClientId" :config="grammarlyConfig">
            <div class="mb-3">
              <label class="form-label">Story Note</label>
              <GrammarlyEditorPlugin>
                <quill-editor ref="myQuillEditor" v-model="story.note" @change="onEditorChange"/>
              </GrammarlyEditorPlugin>
            </div>
          </Grammarly>
          <div class="mb-3">
            <label class="form-label">Story Tags</label>
            <multi-select
                data-set="tags"
                :selected-options="story.tags"
                :key="reloadKey"
                @handleInput="handleInput"
                @change="toggleDisabledSaveButton(false)"
            />
          </div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="story.isFree" @change="toggleDisabledSaveButton(false)">
            <label class="form-check-label" for="flexSwitchCheckChecked">Is Free?</label>
          </div>
          <div class="mt-5 mb-3">
            <ButtonMenu
                :document="story"
                :permissions="permissions"
                :is-disabled="isDisabled"
                :is-saved="saved"
                @cancel="handleCancel"
                @save="handleUpdate"
                @view="handleView"
                @edit="handleEdit"
                @publish="handlePublish"
                @unPublish="handleUnPublish"
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
</template>
<script>
import ButtonMenu from "@/components/ButtonMenu";
import MultiSelect from "@/components/MultiSelect";
import moment from "moment/moment";
import router from "@/router";
import loading from "vue-full-loading";
import StoryService from "@/services/StoriesService";
import {Grammarly, GrammarlyEditorPlugin} from "@grammarly/editor-sdk-vue";

export default {
  name: "EditStory",
  components: {
    ButtonMenu,
    MultiSelect,
    loading,
    Grammarly,
    GrammarlyEditorPlugin
  },
  data() {
    return {
      loader: {
        show: false,
        label: "Loading...",
      },
      maxTitleChars: 140,
      story: {},
      isDisabled: true,
      storyId: null,
      saved: true,
      lastSavedAt: Date.now(),
      permissions: {},
      reloadKey: 0,
      grammarlyClientId: `${process.env.VUE_APP_GRAMMARLY_CLIENT_ID}`,
      grammarlyConfig: {
        documentDialect: 'american',
        autocomplete: 'on'
      }
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
  async created() {
    this.storyId = this.$route.params.storyId;
    this.story = await this.getStory();
    this.permissions = this.getUserPermissions(this.userPermissions);
    this.reloadKey++;
  },
  methods: {
    getStory() {
      return StoryService.getStory(this.storyId);
    },
    getUserPermissions(userPermissions) {
      return {
        CAN_WRITE: userPermissions["CAN_WRITE_STORY"],
        CAN_READ: userPermissions["CAN_READ_STORY"],
        CAN_EDIT: userPermissions["CAN_EDIT_STORY"],
        CAN_PUBLISH: userPermissions["CAN_PUBLISH_STORY"],
        CAN_DELETE: userPermissions["CAN_DELETE_STORY"],
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
    handleInput(input) {
      this.story[input.key] = input.values;
    },
    handleCancel() {
      router.push({name: "MyStories"});
    },
    async handleUpdate() {
      this.loader.show = true;
      this.toggleDisabledSaveButton(true);

      this.story.updatedAt = new Date();
      await StoryService.updateStory(this.storyId, this.story);

      this.saved = true;
      this.lastSavedAt = Date.now();
      this.loader.show = false;
    },
    handleView() {
      router.push({name: "ReadStory", params: {storyId: this.storyId}});
    },
    handleEdit() {
      router.push({name: "EditStory", params: {storyId: this.storyId}});
    },
    async handlePublish() {
      this.story.published = true;
      this.story.updatedAt = new Date();
      await StoryService.updateStory(this.storyId, this.story);
      this.toggleDisabledSaveButton(true);
    },
    async handleUnPublish() {
      this.story.published = false;
      this.story.updatedAt = new Date();
      await StoryService.updateStory(this.storyId, this.story);
      this.toggleDisabledSaveButton(true);
    },
    async handleDelete() {
      await StoryService.deleteStory(this.storyId);
      this.toggleDisabledSaveButton(true);
      this.handleCancel();
    },
  },
};
</script>
<style scoped>
input::placeholder {
  font-weight: bold;
}
</style>
