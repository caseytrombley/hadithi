<template>
  <layout-document :is-loading="loading">
    <template #header>

      <page-hero>
        <template #title>Podcasts</template>
        <template #text>
          Tune in to explore the power of the human voice as we delve into captivating narratives, uncover hidden histories, and engage in enlightening conversations.
          Each podcast episode is a journey of discovery, offering a unique perspective on the world around us.
        </template>

        <template #cta>
          <div class="inline-group">
            <base-button
                is-link
                variant="outline-primary"
                href="#latestPodcasts"
                class=" scrollto"
            >
              Go to podcasts
            </base-button>

          </div>
        </template>
      </page-hero>

    </template>
    <template #body>
      <div id="latestPodcasts" class="section-title section-title aos-init aos-animate" data-aos="zoom-out">

        <div class="search-wrapper">
          <search-bar
              basic
              place-holder="Search for podcasts"
              @handleSearch="handleSearch"
          />
        </div>

        <h2>{{ (searchQuery && searchQuery.length >= 3) ? 'Searched' : 'All'}} Podcasts</h2>
        <p></p>
      </div>
      <div class="grid">
        <podcast-preview
          v-for="(item, index) in paginatedItems"
          :key="index"
          :podcast="item"
          @viewPodcast="handleViewPodcast"
          class="grid-item"
        />
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
import PageHero from "@/components/sections/PageHero";
import BaseButton from "@/components/base/BaseButton";

export default {
  name: "Podcasts",
  components: {
    BaseButton,
    PageHero,
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
      const podcasts = await PodcastService.getPublishedPodcasts();
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
<style lang="scss" scoped>
.hero {
  position: relative;
  padding: 2rem 0 4rem;
  background: #222222;

  .search {
    padding: 2rem 0;
  }
}

.grid {
  display: block;

  .grid-item {
    display: block;
  }

  @media (min-width: 576px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-gap: .5rem;
    // align-items: flex-start;
    grid-auto-flow: column;
    grid-auto-rows: 1fr;
    grid-auto-columns: minmax(260px, 1fr);
  }
}

.search-wrapper {
  margin: 0 0 3rem;
  border-bottom: 1px solid #000000;
}

#latestPodcasts {
  &::before {
    content: '';
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }
}

</style>
