<template>
  <layout-document :is-loading="loading">
    <template #header>
      <search-bar
          place-holder="Search for images"
          @handleSearch="handleSearch"
      />
    </template>
    <template #body>
      <div class="col-12 grid d-flex align-items-center justify-content-center">
        <div v-for="(item, index) in paginatedItems" :key="index">
          <gallery-item :item="item" :item-index="getItemIndex(item.id)" />
        </div>
      </div>
    </template>
    <template #navigation>
      <pagination
          :number-of-items="computedItems.length"
          @handlePagination="handlePagination"
      />
    </template>
  </layout-document>
</template>
<script>
import GalleryItem from "@/components/GalleryItem";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import GalleryService from "@/services/ImagesService";
import LayoutDocument from "@/views/layouts/LayoutDocument";
import { filterByValue } from "@/utils/SearchUtil";

export default {
  name: "MyGallery",
  components: {
    LayoutDocument,
    GalleryItem,
    Pagination,
    SearchBar,
  },
  data() {
    return {
      loading: false,
      creatorEmail: localStorage.getItem("email"),
      searchQuery: null,
      itemStartIndex: 0,
      itemEndIndex: 0,
      items: [],
      computedItems: [],
      paginatedItems: [],
    };
  },
  computed: {
    permissions: function () {
      const permissions = this.$store.state.userPermissions
      return {
        CAN_MANAGE_IMAGES: permissions["CAN_MANAGE_IMAGES"]
      };
    },
  },
  watch: {
    searchQuery: {
      async handler(newSearchQuery) {
        this.loading = true;
        this.itemStartIndex = 0;
        this.itemEndIndex = 24;
        this.items = await this.getItems();
        this.computedItems = this.getComputedItems(newSearchQuery);
        this.paginatedItems = this.getPaginatedItems(
          this.itemStartIndex,
          this.itemEndIndex
        );
        this.loading = false;
      },
      immediate: true,
    },
  },
  methods: {
    async getItems() {
      if (this.permissions["CAN_MANAGE_IMAGES"]) {
        return GalleryService.getImages();
      }
      return GalleryService.getImagesByCreator(this.creatorEmail);
    },
    getItemIndex(itemId) {
      return this.items.findIndex((item) => item.id === itemId);
    },
    getComputedItems(searchQuery) {
      if (searchQuery && searchQuery.length >= 3) {
        return filterByValue(this.items, searchQuery);
      }
      return this.items;
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
  },
};
</script>
<style scoped>
.grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
</style>
