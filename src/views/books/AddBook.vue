<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Books</li>
          <li class="breadcrumb-item active" aria-current="page">Add Book</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <div
            class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4"
            onsubmit="return false"
          >
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="book.title"
                required
                placeholder="Book Title"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="book.description"
                placeholder="Book description"
              ></textarea>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="book.isFree">
              <label class="form-check-label" for="flexSwitchCheckChecked">Is Free?</label>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Book cover</label>
              <input
                type="file"
                required
                placeholder="Book cover"
                class="form-control"
                accept="images/*"
                @change="setSelectedFiles($event.target.files, 'cover')"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Upload book</label>
              <input
                type="file"
                required
                placeholder="Upload book"
                class="form-control"
                accept="application/pdf"
                @change="setSelectedFiles($event.target.files, 'location')"
              />
            </div>
            <button
              class="mb-3 btn btn-primary"
              @click="saveBook"
              :disabled="!book.locationProvided || !book.coverProvided"
            >
              Save Book
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from "vue-full-loading";
import BooksService from "@/services/BooksService";
import StorageService from "@/services/StorageService";

export default {
  name: "AddBook",
  components: {
    loading
  },
  data() {
    return {
      book: {
        title: "",
        description: "",
        coverProvided: false,
        locationProvided: false,
        coverPath: "",
        cover: "",
        locationPath: "",
        location: "",
        tags: [],
        reactions: [],
        isFree: false,
        creatorEmail: localStorage.getItem("email")
      },
      pages: 0,
      loader: {
        show: false,
        label: "Loading..."
      }
    };
  },
  methods: {
    async saveBook() {
      this.loader.show = true;

      const bookCoverUploadDir = "books/cover";
      const bookFileUploadDir = "books/location";

      this.book.coverPath = `${bookCoverUploadDir}/${this.book.cover.name}`;
      this.book.locationPath = `${bookFileUploadDir}/${this.book.location.name}`;

      this.book.cover = await this.uploadFiles(bookCoverUploadDir, this.book.cover);
      this.book.location = await this.uploadFiles(bookFileUploadDir, this.book.location);

      await BooksService.addBook(this.book);

      this.$toast.success("Book has been saved successfully");
      this.loader.show = false;

      await this.$router.push({ name: "Books" });
    },
    async uploadFiles(filePath, file) {
      return StorageService.uploadFile(filePath, file);
    },
    setNumberPages(pages) {
      this.pages = pages;
    },
    setSelectedFiles(files, type) {
      let file = files[0];
      if (file) {
        this.book[type] = file;
        if (type === "cover") {
          this.book.coverProvided = true;
        } else {
          this.book.locationProvided = true;
        }
      }
    }
  }
};
</script>

<style scoped></style>
