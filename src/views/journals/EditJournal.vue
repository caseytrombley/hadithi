<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Journals</li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Journal
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto text-align-start">
          <div class="mb-3">
            <label class="form-label">Journal Title</label>
            <input
                class="d-flex col-12 form-input p-2"
                type="text"
                v-model="journal.title"
                @change="toggleDisabledSaveButton(false)"
                :maxlength="maxTitleChars"
                required
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Journal Type</label>
            <select
                class="form-select"
                v-model="journal.type"
                @change="toggleDisabledSaveButton(false)"
            >
              <option
                  :value="type"
                  v-for="(type, index) in journalTypes"
                  :key="index"
              >
                {{ type }}
              </option>
            </select>
          </div>
          <Grammarly :clientId="grammarlyClientId" :config="grammarlyConfig">
            <div class="mb-3">
              <label class="form-label">Journal Note</label>
              <GrammarlyEditorPlugin>
                <quill-editor ref="myQuillEditor" v-model="journal.note" @change="onEditorChange"/>
              </GrammarlyEditorPlugin>
            </div>
          </Grammarly>
          <Grammarly :clientId="grammarlyClientId" :config="grammarlyConfig">
            <div class="mb-3">
              <label class="form-label">Journal References</label>
              <GrammarlyEditorPlugin>
                <quill-editor ref="myQuillEditor" v-model="journal.references" @change="onEditorChange"/>
              </GrammarlyEditorPlugin>
            </div>
          </Grammarly>
          <div class="mb-3">
            <label class="form-label">Journal Tags</label>
            <multi-select
                data-set="tags"
                :selected-options="journal.tags"
                :key="reloadKey"
                @handleInput="handleInput"
                @change="toggleDisabledSaveButton(false)"
            />
          </div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="journal.isFree" @change="toggleDisabledSaveButton(false)">
            <label class="form-check-label" for="flexSwitchCheckChecked">Is Free?</label>
          </div>
          <div class="mt-5 mb-3">
            <ButtonMenu
                :document="journal"
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
import loading from "vue-full-loading";
import JournalService from "@/services/JournalsService";
import router from "@/router";
import {Grammarly, GrammarlyEditorPlugin} from "@grammarly/editor-sdk-vue";

export default {
  name: "EditJournal",
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
      journal: {},
      journalTypes: [],
      isDisabled: true,
      journalId: null,
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
    this.journalId = this.$route.params.journalId;
    this.journal = await this.getJournal();
    this.journalTypes = JournalService.getJournalTypes();
    this.permissions = this.getUserPermissions(this.userPermissions);
    this.reloadKey++;
  },
  methods: {
    getJournal() {
      return JournalService.getJournal(this.journalId);
    },
    getUserPermissions(userPermissions) {
      return {
        CAN_WRITE: userPermissions["CAN_WRITE_JOURNAL"],
        CAN_READ: userPermissions["CAN_READ_JOURNAL"],
        CAN_EDIT: userPermissions["CAN_EDIT_JOURNAL"],
        CAN_PUBLISH: userPermissions["CAN_PUBLISH_JOURNAL"],
        CAN_DELETE: userPermissions["CAN_DELETE_JOURNAL"],
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
      this.journal[input.key] = input.values;
    },
    handleCancel() {
      this.$router.push({name: "MyJournals"});
    },
    async handleUpdate() {
      this.loader.show = true;
      this.toggleDisabledSaveButton(true);

      this.journal.updatedAt = new Date();
      await JournalService.updateJournal(this.journalId, this.journal);

      this.saved = true;
      this.lastSavedAt = Date.now();
      this.loader.show = false;
    },
    handleView() {
      router.push({
        name: "ReadJournal",
        params: {journalId: this.journalId},
      });
    },
    handleEdit() {
      router.push({
        name: "EditJournal",
        params: {journalId: this.journalId},
      });
    },
    async handlePublish() {
      this.journal.published = true;
      this.journal.updatedAt = new Date();
      await JournalService.updateJournal(this.journalId, this.journal);
      this.toggleDisabledSaveButton(true);
    },
    async handleUnPublish() {
      this.journal.published = false;
      this.journal.updatedAt = new Date();
      await JournalService.updateJournal(this.journalId, this.journal);
      this.toggleDisabledSaveButton(true);
    },
    async handleDelete() {
      await JournalService.deleteJournal(this.journalId);
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
