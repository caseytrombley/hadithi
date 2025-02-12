<template>
  <div class="d-flex flex-column flex-md-row h-100">
    <loading :show="loader.show" :label="loader.label" />
    <kanban-lane :contents="topics" group="To do" :key="`topics-${reload}`" />
    <kanban-lane :contents="draftContent" group="In Progress" :key="`draft-${reload}`" />
    <kanban-lane :contents="reviewContent" group="In Review" :key="`review-${reload}`" />
    <kanban-lane :contents="publishedContent" group="Complete" :key="`complete-${reload}`" />
  </div>
</template>

<script>
import KanbanLane from "@/components/kanban/KanbanLane";
import loading from "vue-full-loading";
import TopicService from "@/services/TopicsService";
import StoryService from "@/services/StoriesService";
import JournalService from "@/services/JournalsService";

export default {
  name: "WorkManagement",
  components: { KanbanLane, loading },
  data() {
    return {
      topics: [],
      stories: [],
      contents: [],
      reload: 0,
      loader: {
        show: false,
        label: "Loading...",
      },
    };
  },
  computed: {
    updateWork() {
      return this.$store.state.updateWork;
    },
    publishedContent() {
      return this.contents.filter((content) => content.status === "published");
    },
    reviewContent() {
      return this.contents.filter((content) => content.status === "review");
    },
    draftContent() {
      return this.contents.filter((content) => content.status === "draft");
    }
  },
  watch: {
    updateWork() {
      const isUpdateWork = this.$store.state.updateWork;
      if (isUpdateWork) {
        this.setContent();
        this.reload++;
        this.$store.commit("setUpdateWork", false);
      }
    }
  },
  mounted() {
    this.setContent();
  },
  methods: {
    async getTopics() {
      this.topics = await TopicService.getTopics();
    },
    async getStories() {
      this.stories = await StoryService.getStories();
    },
    async getJournals() {
      this.journals = await JournalService.getJournals();
    },
    async setContent() {
      this.loader.show = true;
      await this.getTopics();
      await this.getStories();
      await this.getJournals();
      this.contents = this.stories.concat(this.journals);
      this.loader.show = false;
    }
  }
};
</script>
