<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label" />
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Books</li>
          <li class="breadcrumb-item active" aria-current="page">Edit Book</li>
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
              <img
                class="my-3 rounded mx-auto d-block"
                :src="book.cover"
                alt="default item"
                style="width: 20vh; height: 20vh"
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
              <div class="text-center">
                <strong>Pdf:</strong>&nbsp;<a
                  :href="book.location"
                  target="_blank"
                  >{{ book.title }}</a
                >
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button class="mb-3 btn btn-primary" @click="updateBook">
                Update Book
              </button>
              <button class="mb-3 btn btn-danger" @click="deleteBook">
                Delete Book
              </button>
            </div>
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
  name: "EditBook",
  components: {
    loading,
  },
  data() {
    return {
      book: {},
      upload: {},
      coverProvided: false,
      locationProvided: false,
      loader: {
        show: false,
        label: "Loading...",
      },
    };
  },
  async mounted() {
    this.book = await this.getBook();
    this.book.coverProvided = false;
    this.book.locationProvided = false;
  },
  methods: {
    async getBook() {
      const bookId = this.$route.params.bookId;
      return BooksService.getBook(bookId);
    },
    async updateBook() {
      this.loader.show = true;

      const bookCoverUploadDir = "books/cover";
      const bookFileUploadDir = "books/location";

      if (this.coverProvided) {
        this.book.coverPath = `${bookCoverUploadDir}/${this.upload.cover.name}`;
        this.book.cover = await this.uploadFiles(bookCoverUploadDir, this.upload.cover);
      }

      if (this.locationProvided) {
        this.book.locationPath = `${bookFileUploadDir}/${this.upload.location.name}`;
        this.book.location = await this.uploadFiles(bookFileUploadDir, this.upload.location);
      }

      this.book.updatedAt = new Date();
      await BooksService.updateBook(this.book.id, this.book);

      this.$toast.success("Book has been updated successfully");
      await this.$router.push({ name: "Books" });

      this.loader.show = false;
    },
    async deleteBook() {
      if (confirm("Are you sure you want to delete this book?")) {
        await BooksService.deleteBook(this.book.id);
        this.$toast.warning("Book has been deleted successfully!");
        await this.$router.push({ name: "Books" });
      } else {
        this.$toast.success("Delete canceled!");
      }
    },
    async uploadFiles(filePath, file) {
      await StorageService.uploadFile(filePath, file);
    },
    setSelectedFiles(files, type) {
      let file = files[0];
      if (file) {
        this.upload[type] = file;
        if (type === "cover") {
          this.coverProvided = true;
        } else {
          this.locationProvided = true;
        }
      }

      if (!file) {
        this.coverProvided = false;
        this.locationProvided = false;
      }
    },
  },
};
</script>
<style scoped></style>
