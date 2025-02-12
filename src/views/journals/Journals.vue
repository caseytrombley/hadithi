<template>
  <layout-document :is-loading="loading">
    <template #header>
      <search-bar
          place-holder="Search for journals"
          @handleSearch="handleSearch"
      />
    </template>
    <template #body>
      <DocumentItem
          :logged-in="loggedIn"
          document-type="journal"
          :document="document"
          v-for="(document, index) in paginatedItems"
          :key="index"
          @read="handleRead"
          @edit="handleEdit"
          @publish="handlePublish"
          @unPublish="handleUnPublish"
          @delete="handleDelete"
          :permissions="userPermissions"
      />
    </template>
    <template #navigation>
      <pagination
          :number-of-items="computedItems.length"
          :items-per-page="itemEndIndex"
          :page-limits="pageLimits"
          @handlePagination="handlePagination"
      />
    </template>
  </layout-document>
</template>
<script>
import DocumentItem from "@/components/DocumentItem";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import JournalService from "@/services/JournalsService";
import LayoutDocument from "@/views/layouts/LayoutDocument";
import {booleanFieldSort, timestampFieldSort} from "@/utils/SortUtil";

export default {
  name: "Journals",
  components: {
    LayoutDocument,
    DocumentItem,
    Pagination,
    SearchBar,
  },
  data() {
    return {
      loading: false,
      searchQuery: null,
      itemStartIndex: 0,
      itemEndIndex: 0,
      items: [],
      computedItems: [],
      paginatedItems: [],
      pageLimits: [5, 10, 15, 20],
    };
  },
  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn;
    },
    journalType: function () {
      return this.$route.params.type;
    },
    userPermissions: function () {
      const permissions = this.$store.state.userPermissions
      return {
        CAN_READ: permissions["CAN_READ_JOURNAL"],
        CAN_EDIT: permissions["CAN_EDIT_JOURNAL"],
        CAN_PUBLISH: permissions["CAN_PUBLISH_JOURNAL"],
        CAN_DELETE: permissions["CAN_DELETE_JOURNAL"]
      };
    },
  },
  watch: {
    searchQuery: {
      async handler(newSearchQuery) {
        await this.setDefaultData(newSearchQuery);
      },
      immediate: true,
    },
    journalType: {
      async handler() {
        await this.setDefaultData();
      },
      immediate: true,
    },
  },
  methods: {
    async setDefaultData(newSearchQuery = "") {
      this.loading = true;
      this.itemStartIndex = 0;
      this.itemEndIndex = 5;
      this.items = await this.getItems();
      this.computedItems = this.getComputedItems(newSearchQuery);
      this.paginatedItems = this.getPaginatedItems(
          this.itemStartIndex,
          this.itemEndIndex
      );
      this.loading = false;
    },
    async getItems() {
      let journals = [];
      const journalTypes = JournalService.getJournalTypes();

      if (journalTypes.includes(this.journalType)) {
        journals = await JournalService.getPublishedJournalsByType(this.journalType);
      }
      if (!journalTypes.includes(this.journalType)) {
        journals = await JournalService.getPublishedJournals();
      }
      journals = booleanFieldSort(journals, "isFree");
      return timestampFieldSort(journals, "updatedAt");
    },
    getComputedItems(searchQuery) {
      if (searchQuery && searchQuery.length >= 3) {
        return this.items.filter((item) => {
          return searchQuery
              .toLowerCase()
              .split(" ")
              .every(
                  (v) =>
                      item.title !== undefined && item.title.toLowerCase().includes(v)
              );
        });
      } else {
        return this.items;
      }
    },
    getPaginatedItems(itemStartIndex, itemEndIndex) {
      return this.computedItems.slice(itemStartIndex, itemEndIndex);
    },
    handlePagination(pagination) {
      this.itemStartIndex = pagination.itemStartIndex;
      this.itemEndIndex = pagination.itemEndIndex;
      this.paginatedItems = this.getPaginatedItems(
          this.itemStartIndex,
          this.itemEndIndex
      );
    },
    handleSearch(searchQuery) {
      this.searchQuery = searchQuery;
    },
    handleRead(document) {
      const readRoutes = {
        true: "ReadFreeJournal",
        false: "ReadJournal"
      };
      this.$router.push({
        name: readRoutes[document.isFree],
        params: {journalId: document.id},
      });
    },
    handleEdit(document) {
      this.$router.push({
        name: "EditJournal",
        params: {journalId: document.id},
      });
    },
    async handlePublish(document) {
      if (confirm("Are you sure you want to publish?")) {
        await JournalService.updateJournal(document.id, {status: "published", published: true, updatedAt: new Date()});
        await this.setDefaultData();
      }
    },
    async handleUnPublish(document) {
      if (confirm("Are you sure you want to unPublish?")) {
        await JournalService.updateJournal(document.id, {status: "review", published: false, updatedAt: new Date()});
        await this.setDefaultData();
      }
    },
    handleDelete(document) {
      if (confirm("Are you sure you want to delete?")) {
        JournalService.deleteJournal(document.id);
        this.$router.go(0);
      }
    },
  },
};
</script>
<style scoped></style>
