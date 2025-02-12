<template>
  <div class="search-bar form-group has-search" :class="theme">
    <div v-if="theme==='default'" class="container">
      <span class="bi bi-search form-control-feedback mb-3"></span>
      <input
          type="text"
          class="form-control"
          :placeholder="placeHolder"
          v-model="searchQuery"
          @input="handleSearch"
      />
    </div>
    <div v-if="theme==='basic'">
      <span class="bi bi-search form-control-feedback mb-3"></span>
      <input
          type="text"
          class="form-control"
          :placeholder="placeHolder"
          v-model="searchQuery"
          @input="handleSearch"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  props: {
    placeHolder: {
      type: String,
    },
    title: {
      type: String,
      default: null
    },
    basic: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchQuery: null,
    };
  },
  computed: {
    theme() {
      if (this.basic) {
        return 'basic'
      } else {
        return 'default'
      }
    }
  },
  methods: {
    handleSearch() {
      this.$emit("handleSearch", this.searchQuery);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-bar {
  position: relative;

  .form-group {
    width: 100%;
  }
}

.default {
  padding: 2rem;
  background: $antique;
}

.has-search .form-control {
  padding-left: 3rem;
  height: 3rem;
  border: 0;
  border-radius: 4px;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}
</style>
