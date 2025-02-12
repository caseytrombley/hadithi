<template>
  <div class="pagination-wrapper row">
    <div class="col-auto">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{ disabled: this.isPreviousButtonDisabled }"
          >
            <a class="page-link" @click="handleButtonClick(-1)">Previous</a>
          </li>
          <li
            class="page-item"
            v-for="page in pageList"
            :key="page"
            :class="page === currentPage ? 'active' : ''"
          >
            <a class="page-link" @click="handlePageClick(page)">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: this.isNextButtonDisabled }"
          >
            <a class="page-link" @click="handleButtonClick(1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="col-auto">
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="itemPerPageSelect" class="col-form-label"
            >Items per page</label
          >
        </div>
        <div class="col-auto">
          <select
            class="form-select"
            id="itemPerPageSelect"
            v-model="numberPerPage"
            @change="handlePagination(startPage)"
          >
            <option
              :value="pageLimit"
              v-for="pageLimit in pageLimits"
              :key="pageLimit"
            >
              {{ pageLimit }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    startPage: {
      type: Number,
      default: 1,
    },
    numberOfItems: {
      type: Number,
    },
    ItemsPerPage: {
      type: Number,
      default: 24,
    },
    pageLimits: {
      type: Array,
      default: () => [24, 48, 96],
    },
  },
  data() {
    return {
      numberPerPage: this.ItemsPerPage,
      currentPage: this.startPage,
      pageShift: 1,
    };
  },
  computed: {
    maxPages: function () {
      return this.getMaxPages(this.numberOfItems, this.numberPerPage);
    },
    pageList: function () {
      return this.getPageList(this.maxPages, this.pageShift);
    },
    isPreviousButtonDisabled: function () {
      return this.currentPage === 1;
    },
    isNextButtonDisabled: function () {
      return this.currentPage === this.maxPages || this.maxPages === 0;
    },
  },
  methods: {
    getMaxPages(numberOfItems, numberPerPage) {
      numberOfItems = numberOfItems < 0 ? 0 : numberOfItems;
      return Math.ceil(numberOfItems / numberPerPage);
    },
    getPageList(maxPages, pageShift) {
      maxPages = maxPages < 0 ? 0 : maxPages;
      return Array(maxPages)
        .fill(0)
        .map((_, i) => i + pageShift);
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    getItemStartIndex(page, numberPerPage, pageShift) {
      const itemStartIndex = (page - pageShift) * numberPerPage;
      return itemStartIndex < 0 ? 0 : itemStartIndex;
    },
    getItemEndIndex(page, numberPerPage, numberOfItems, pageShift) {
      const itemEndIndex =
        this.getItemStartIndex(page, numberPerPage, pageShift) + numberPerPage;
      return itemEndIndex >= numberOfItems ? numberOfItems : itemEndIndex;
    },
    handleButtonClick(shiftIndex) {
      const newCurrentPage = this.currentPage + shiftIndex;
      this.handlePagination(newCurrentPage);
    },
    handlePageClick(page) {
      this.handlePagination(page);
    },
    handlePagination(newCurrentPage) {
      if (newCurrentPage >= this.startPage && newCurrentPage <= this.maxPages) {
        this.setCurrentPage(newCurrentPage);
        this.$emit("handlePagination", {
          itemStartIndex: this.getItemStartIndex(
            newCurrentPage,
            this.numberPerPage,
            this.pageShift
          ),
          itemEndIndex: this.getItemEndIndex(
            newCurrentPage,
            this.numberPerPage,
            this.numberOfItems,
            this.pageShift
          ),
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 3rem 0 0;
  background: #f7f7f7;
  border-radius: 8px;

  .pagination {
    margin-bottom: 0;
  }
}
</style>
