<template>
  <layout-document :is-loading="loading">
    <template #header>
      <search-bar
        place-holder="Search for resources"
        @handleSearch="handleSearch"
      />
    </template>
    <template #body>
      <DocumentItem
        :logged-in="loggedIn"
        document-type="resource"
        :document="document"
        v-for="(document, index) in paginatedItems"
        :key="index"
        @read="handleRead"
        @edit="handleEdit"
        @publish="handlePublish"
        @unPublish="handleUnPublish"
        @delete="handleDelete"
        :permissions="userPermissions"
        :use-ellipsis="true"
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
import LayoutDocument from "@/views/layouts/LayoutDocument";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import ResourceService from "@/services/ResourcesService";
import { booleanFieldSort, timestampFieldSort } from "@/utils/SortUtil";

export default {
  name: "Resources",
  components: {
    DocumentItem,
    LayoutDocument,
    Pagination,
    SearchBar
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
      pageLimits: [5, 10, 15, 20]
    };
  },
  computed: {
    loggedIn: function() {
      return this.$store.getters.loggedIn;
    },
    userPermissions: function() {
      const permissions = this.$store.state.userPermissions;
      return {
        CAN_READ: permissions["CAN_READ_RESOURCE"],
        CAN_EDIT: permissions["CAN_EDIT_RESOURCE"],
        CAN_PUBLISH: permissions["CAN_PUBLISH_RESOURCE"],
        CAN_DELETE: permissions["CAN_DELETE_RESOURCE"]
      };
    }
  },
  watch: {
    searchQuery: {
      async handler(newSearchQuery) {
        await this.setDefaultData(newSearchQuery);
      },
      immediate: true
    }
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
      let resources = await ResourceService.getPublishedResources();
      resources = booleanFieldSort(resources, "isFree");
      return timestampFieldSort(resources, "updatedAt");
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
        true: "ReadFreeResource",
        false: "ReadResource"
      };
      this.$router.push({
        name: readRoutes[document.isFree],
        params: { resourceId: document.id }
      });
    },
    handleEdit(document) {
      this.$router.push({
        name: "EditResource",
        params: { resourceId: document.id }
      });
    },
    async handlePublish(document) {
      if (confirm("Are you sure you want to publish?")) {
        await ResourceService.updateResource(document.id, { published: true, updatedAt: new Date() });
        await this.setDefaultData();
      }
    },
    async handleUnPublish(document) {
      if (confirm("Are you sure you want to unPublish?")) {
        await ResourceService.updateResource(document.id, { published: false, updatedAt: new Date() });
        await this.setDefaultData();
      }
    },
    async handleDelete(document) {
      if (confirm("Are you sure you want to delete?")) {
        await ResourceService.deleteResource(document.id);
        this.$router.go(0);
      }
    }
  }
};
</script>
<style scoped></style>
