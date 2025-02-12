<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label"></loading>
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Gallery</li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Image(s)
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <div class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4" onsubmit="return false">
            <div class="mb-3">
              <label for="description" class="form-label">Image(s)</label>
              <multi-image-upload
                data-set="images"
                :max-images-size="maxImagesSize"
                :max-images="maxImages"
                :storage-path="storagePath"
                @handleUpload="handleUpload"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Tags</label>
              <multi-select data-set="tags" @handleInput="handleInput" />
            </div>
            <button class="mb-3 btn btn-primary" @click="handleSave" :disabled="!saveEnabled">
              <em class="bi bi-save"></em> Save
              <strong>({{ this.images.length }})</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ImagesService from "@/services/ImagesService";
import loading from "vue-full-loading";
import MultiSelect from "@/components/MultiSelect";
import MultiImageUpload from "@/components/MultiImageUpload";

export default {
  name: "AddGallery",
  components: {
    loading,
    MultiSelect,
    MultiImageUpload
  },
  data() {
    return {
      loader: {
        show: false,
        label: "Loading..."
      },
      creatorEmail: localStorage.getItem("email"),
      storagePath: "gallery",
      images: [],
      tags: [],
      maxImagesSize: 2147483648, //2GB
      maxImages: 150
    };
  },
  computed: {
    saveEnabled: function() {
      return this.images.length > 0;
    }
  },
  methods: {
    toggleLoader(status) {
      this.loader.show = status;
    },
    async handleSave() {
      const noImagesUploaded = this.images.length === 0;

      if (noImagesUploaded) {
        return this.$toast.error("No image(s) uploaded!");
      }

      if (!noImagesUploaded) {
        this.toggleLoader(true);

        this.images.map(async (image) => {
          const imageName = image.imagePath.split("\\").pop().split("/").pop();
          const item = {
            title: imageName,
            description: imageName,
            filePath: image.imagePath,
            ref: image.imagePath,
            url: image.imageUrl,
            tags: this.tags,
            likes: 0,
            views: 0,
            creatorEmail: this.creatorEmail
          };

          await ImagesService.addImage(item);

          await this.$toast.success(`Image: ${item.title} has been saved`);
        });

        this.toggleLoader(false);

        await this.$router.push("/gallery");
      }
    },
    handleInput(input) {
      this[input.key] = input.values;
    },
    handleUpload(upload) {
      this[upload.key] = upload.values;
    }
  }
};
</script>
