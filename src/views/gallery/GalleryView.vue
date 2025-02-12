<template>
  <div class="gallery-view">
    <search-bar
        place-holder="Search for images"
        @handleSearch="handleSearch"
    />

    <b-container fluid="xl">

      <base-loader v-if="loading" large block />

      <grid-images
        v-if="!loading && paginatedItems.length>0"
        :prop-images="paginatedItems"
        prop-mixed-grid
      />

      <pagination
          :number-of-items="computedItems.length"
          @handlePagination="handlePagination"
      />

    </b-container>

  </div>

</template>
<script>
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import GalleryService from "@/services/ImagesService";
import BaseLoader from "@/components/base/BaseLoader";
import GridImages from "@/components/GridImages";
import { filterByValue } from "@/utils/SearchUtil";
import { randomSort } from "@/utils/SortUtil";

export default {
  name: "GalleryView",
  components: {
    GridImages,
    BaseLoader,
    Pagination,
    SearchBar,
  },
  data() {
    return {
      loading: null,
      searchQuery: null,
      itemStartIndex: 0,
      itemEndIndex: 0,
      items: [],
      computedItems: [],
      paginatedItems: [],
    };
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
      const images = await GalleryService.getImages();
      return randomSort(images);
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
