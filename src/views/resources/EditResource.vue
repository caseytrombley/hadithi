<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Resources</li>
          <li class="breadcrumb-item active" aria-current="page">Edit Resource</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <div class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4" onsubmit="return false">
            <div class="mb-3">
              <label for="title" class="form-label">Resource Title</label>
              <input class="d-flex col-12 form-input p-2" type="text" v-model="resource.title"
                     @change="toggleDisabledSaveButton(false)" :maxlength="maxTitleChars" required
                     placeholder="Resource Title" />
            </div>
            <Grammarly :clientId="grammarlyClientId" :config="grammarlyConfig">
              <div class="mb-3">
                <label class="form-label">Resource Note</label>
                <GrammarlyEditorPlugin>
                  <quill-editor ref="myQuillEditor" v-model="resource.note" @change="onEditorChange" />
                </GrammarlyEditorPlugin>
              </div>
            </Grammarly>
            <div class="mb-3">
              <label class="form-label">Resource Tags</label>
              <multi-select
                data-set="tags"
                :selected-options="resource.tags"
                :key="reloadKey"
                @handleInput="handleInput"
                @change="toggleDisabledSaveButton(false)"
              />
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="resource.isFree"
                     @change="toggleDisabledSaveButton(false)">
              <label class="form-check-label" for="flexSwitchCheckChecked">Is Free?</label>
            </div>
            <div class="mb-3">
              <label class="form-label">Upload Resource</label>
              <input type="file" class="form-control" accept="application/pdf"
                     @change="setSelectedFiles($event.target.files)" />
              <div class="text-center">
                <strong>Pdf:</strong>&nbsp;
                <a :href="resource.location" target="_blank">{{ resource.title }}</a>
              </div>
            </div>
            <div class="mt-5 mb-3">
              <ButtonMenu
                :document="resource"
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
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-vue";
import loading from "vue-full-loading";
import moment from "moment";
import { validateRequiredFields } from "@/utils/ValidationUtil";
import ResourceService from "@/services/ResourcesService";
import StorageService from "@/services/StorageService";

export default {
  name: "EditResource",
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
        label: "Loading..."
      },
      maxTitleChars: 140,
      resource: {
        title: "",
        note: "",
        locationProvided: false,
        locationPath: "",
        location: "",
        tags: [],
        published: false,
        isFree: false,
        email: localStorage.getItem("email")
      },
      grammarlyClientId: `${process.env.VUE_APP_GRAMMARLY_CLIENT_ID}`,
      grammarlyConfig: {
        documentDialect: "american",
        autocomplete: "on"
      },
      isDisabled: true,
      resourceId: null,
      saved: true,
      lastSavedAt: Date.now(),
      permissions: {},
      reloadKey: 0
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    userPermissions: function() {
      return this.$store.state.userPermissions;
    }
  },
  async created() {
    this.resourceId = this.$route.params.resourceId;
    this.resource = await this.getResource();
    this.resource.locationProvided = false;
    this.permissions = this.getUserPermissions(this.userPermissions);
    this.reloadKey++;
  },
  methods: {
    getResource() {
      return ResourceService.getResource(this.resourceId);
    },
    getUserPermissions(userPermissions) {
      return {
        CAN_WRITE: userPermissions["CAN_WRITE_RESOURCE"],
        CAN_READ: userPermissions["CAN_READ_RESOURCE"],
        CAN_EDIT: userPermissions["CAN_EDIT_RESOURCE"],
        CAN_PUBLISH: userPermissions["CAN_PUBLISH_RESOURCE"],
        CAN_DELETE: userPermissions["CAN_DELETE_RESOURCE"]
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
        this.resource.location = file;
        this.resource.locationProvided = true;
      }
      if (!file) {
        this.resource.location = "";
        this.resource.locationPath = "";
        this.resource.locationProvided = false;
      }
    },
    handleInput(input) {
      this.resource[input.key] = input.values;
    },
    handleCancel() {
      this.$router.push({ name: "MyResources" });
    },
    async handleSave() {
      this.loader.show = true;
      this.toggleDisabledSaveButton(true);

      if (this.resource.locationProvided) {
        const resourceUploadDir = "resources";
        await StorageService.deleteFile(this.resource.locationPath);
        this.resource.locationPath = `${resourceUploadDir}/${this.resource.location.name}`;
        this.resource.location = await StorageService.uploadFile(
          resourceUploadDir, this.resource.location);
      }

      if (this.resourceId && this.checkRequiredFields(this.resource)) {
        this.resource.updatedAt = new Date();
        await ResourceService.updateResource(this.resourceId, this.resource);
      }

      if (!this.resourceId && this.checkRequiredFields(this.resource)) {
        const resource = await ResourceService.addResource(this.resource);
        this.resourceId = this.resource.id = resource["id"];
      }

      this.saved = true;
      this.lastSavedAt = Date.now();
      this.loader.show = false;
      this.resource.locationProvided = false;
    },
    handleView() {
      this.$router.push({ name: "ReadResource", params: { resourceId: this.resourceId } });
    },
    handleEdit() {
      this.$router.push({ name: "EditResource", params: { resourceId: this.resourceId } });
    },
    async handlePublish(isPublished) {
      this.resource.published = isPublished;
      this.resource.updatedAt = new Date();
      await ResourceService.updateResource(this.resourceId, this.resource);
      this.toggleDisabledSaveButton(true);
    },
    async handleDelete() {
      await ResourceService.deleteResource(this.resourceId);
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
