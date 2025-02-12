<template>
  <layout-document :is-loading="loading">
    <template #header>
      <search-bar
          place-holder="Search for books"
          @handleSearch="handleSearch"
      />
    </template>
    <template #body>
      <div class="col-12 grid d-flex align-items-center justify-content-center">
        <div
            class="col-sm-4 col-md-4 col-lg-3 col-xl-2 mt-2 mb-2"
            v-for="(item, index) in paginatedItems"
            :key="index"
        >
          <book-preview :book="item" @readBook="setReadBook"/>
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
import BookPreview from "@/components/BookPreview";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import BooksService from "@/services/BooksService";
import LayoutDocument from "@/views/layouts/LayoutDocument";
import {booleanFieldSort, timestampFieldSort} from "@/utils/SortUtil";

export default {
  name: "Books",
  components: {
    LayoutDocument,
    BookPreview,
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
      creatorEmail: localStorage.getItem("email"),
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
    setReadBook(book) {
      const readRoutes = {
        true: "ReadFreeBook",
        false: "ReadBook"
      };
      this.$router.push({name: readRoutes[book.isFree], params: {bookId: book.id}});
    },
    async getItems() {
      let myBooks = await BooksService.getBooksByCreator(this.creatorEmail);
      myBooks = booleanFieldSort(myBooks, "isFree");
      return timestampFieldSort(myBooks, "createdAt");
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
