<template v-cloak>
  <layout-read @clickPrint="printPdf" :is-loading="loading">
    <template #body>
      <div id="print-content">
        <div class="journal-summary">
          <h1 v-if="journal.title">{{ journal.title }}</h1>
          <h6 class="text-uppercase fw-bold" v-if="journal.type">
            {{ journal.type }} Paper
          </h6>
          <strong>Tags:</strong>
          <tag-item v-for="tag in journal.tags" :key="tag" :tag-name="tag" />
          <hr />
        </div>
        <div class="journal-content p-3">
          <span class="text-justify" v-html="journal.note"></span>
        </div>
        <div class="journal-references p-3">
          <label class="fw-bold">
            References >
            <span @click="toggleReferencesOptions(!referenceToggle.status)"><u>{{ referenceToggle.text }}</u></span>
          </label>
          <hr />
          <span v-if="referenceToggle.status" class="text-justify" v-html="journal.references"></span>
        </div>
      </div>
    </template>
    <template #comments>
      <comments-box :resource-id="journal.id" :resource-category="resourceCategory" v-if="('id' in journal)"/>
    </template>
  </layout-read>
</template>
<script>
import CommentsBox from "@/components/CommentsBox";
import SocialSharing from "@/components/SocialSharing";
import TagItem from "@/components/TagItem";
import JournalService from "@/services/JournalsService";
import { printHtmlToPdf } from "@/utils/PdfUtil";
import LayoutRead from "@/views/layouts/LayoutRead";

export default {
  name: "ReadJournal",
  components: {
    LayoutRead,
    CommentsBox,
    SocialSharing,
    TagItem,
  },
  data() {
    return {
      loading: false,
      journal: {
        title: "",
      },
      resourceCategory: "journals",
      shareContent:{
        url: window.location.href,
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      },
      referenceToggle: {},
      referenceToggleOptions: [
        { status: false, text: "Show" },
        { status: true, text: "Hide" },
      ],
      printHtmlToPdf: printHtmlToPdf,
    };
  },
  async created() {
    this.loading = true;
    this.journal = await this.getJournal();
    this.toggleReferencesOptions(false);
    this.shareContent.title = this.journal.title;
  },
  methods: {
    getJournal() {
      const journalId = this.$route.params.journalId;
      this.loading = false;
      return JournalService.getJournal(journalId);
    },
    toggleReferencesOptions(toggleStatus) {
      this.referenceToggle = this.referenceToggleOptions.find(
        (referenceToggleOption) => referenceToggleOption.status === toggleStatus
      );
    },
    async printPdf() {
      await this.toggleReferencesOptions(true);
      await this.printHtmlToPdf("print-content");
    },
  },
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none
}

.text-justify {
  text-align: justify;
}
</style>
