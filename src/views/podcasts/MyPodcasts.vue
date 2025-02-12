<template>
  <layout-document :is-loading="loading">
    <template #header>
      <search-bar place-holder="Search for podcasts" @handleSearch="handleSearch"/>
    </template>
    <template #body>
      <div class="col-12 grid d-flex align-items-center justify-content-center">
        <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3 mt-2 mb-2" v-for="(item, index) in paginatedItems" :key="index">
          <podcast-preview :podcast="item" @viewPodcast="handleViewPodcast"/>
        </div>
      </div>
    </template>
    <template #navigation>
      <pagination :number-of-items="computedItems.length" @handlePagination="handlePagination"/>
    </template>
  </layout-document>
</template>
<script>
import LayoutDocument from "@/views/layouts/LayoutDocument";
import Pagination from "@/components/Pagination";
import PodcastPreview from "@/components/PodcastPreview";
import SearchBar from "@/components/SearchBar";
import PodcastService from "@/services/PodcastsService";
import {timestampFieldSort} from "@/utils/SortUtil";

export default {
  name: "Podcasts",
  components: {
    LayoutDocument,
    Pagination,
    PodcastPreview,
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
      creatorEmail: localStorage.getItem("email")
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
    handleViewPodcast(podcast) {
      this.$router.push({name: "ViewPodcast", params: {podcastId: podcast.id}});
    },
    async getItems() {
      const podcasts = await PodcastService.getPodcastsByEmail(this.creatorEmail);
      return timestampFieldSort(podcasts, "createdAt");
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
