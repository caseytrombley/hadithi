<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Gallery</li>
          <li class="breadcrumb-item active" aria-current="page">Edit Image</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <div class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4" onsubmit="return false">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="item.title"
                required
                placeholder="Item Title"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="item.description"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Image</label>
              <input
                type="file"
                required
                placeholder="Upload Image"
                class="form-control"
                accept="image/*"
                @change="setSelectedFiles($event.target.files)"
              />
              <img
                class="my-3 rounded mx-auto d-block"
                :src="getImageKitUrl(item['filePath'])"
                alt="default item"
                style="width: 20vh; height: 20vh"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Tags</label>
              <multi-select
                data-set="tags"
                :selected-options="item.tags"
                @handleInput="handleInput"
              />
            </div>
            <button class="mb-3 btn btn-primary" @click="handleUpdate">
              Update Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loading from "vue-full-loading";
import MultiSelect from "@/components/MultiSelect";
import ImagesService from "@/services/ImagesService";
import StorageService from "@/services/StorageService";
import { getImageKitUrl } from "@/utils/ImageKitUtil";

export default {
  name: "EditGallery",
  components: {
    loading,
    MultiSelect
  },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      loader: {
        show: false,
        label: "Loading..."
      }
    };
  },
  methods: {
    getImageKitUrl,
    toggleLoader(status) {
      this.loader.show = status;
    },
    async handleUpdate() {
      this.toggleLoader(true);

      if (this.item.title === "") {
        this.toggleLoader(false);
        return this.$toast.error("Missing title for Item!");
      }

      await this.updateItem();

      this.$toast.success("Item has been updated successfully");

      this.toggleLoader(false);

      await this.$router.push("/gallery");
    },
    async updateItem() {
      this.item.updatedAt = new Date();
      await ImagesService.updateImage(this.item.id, this.item);
    },
    async setSelectedFiles(files) {
      const file = files[0];
      if (file) {
        this.toggleLoader(true);
        const imageUploadDir = "gallery";
        await StorageService.deleteFile(this.item.filePath);

        this.item.filePath = `${imageUploadDir}/${file.name}`;
        this.item.url = await StorageService.uploadFile(imageUploadDir, file);

        await this.updateItem();

        this.toggleLoader(false);
      }
    },
    handleInput(input) {
      this.item[input.key] = input.values;
    }
  }
};
</script>
