<template>
  <div
    class="card book-preview shadow-lg mb-5 bg-body rounded"
    aria-hidden="true"
  >
    <label-tag v-if="book.isFree" theme="corner-label">Free</label-tag>
    <img
      :src="getImageKitUrl(book.coverPath)"
      class="card-img-top rounded"
      :alt="book.title"
      width="220px"
      height="270px"
      @click="readBook"
    />
    <div class="mt-2" v-if="loggedIn()">
      <em class="bi bi-pencil-square icon" @click="editBook"></em>
    </div>
  </div>
</template>

<script>
import LabelTag from "@/components/LabelTag";
import { getImageKitUrl } from "@/utils/ImageKitUtil";

export default {
  name: "BookPreview",
  components: {LabelTag},
  props: {
    book: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    getImageKitUrl,
    readBook() {
      this.$emit("readBook", this.book);
    },
    editBook() {
      this.$router.push({ name: "EditBook", params: { bookId: this.book.id } });
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style scoped>
.book-preview {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: .25rem;
  width: 200px !important;
  border: 0;
  cursor: pointer;
  overflow: hidden;
}

.icon {
  font-size: 1.2rem;
  color: green;
}
</style>
