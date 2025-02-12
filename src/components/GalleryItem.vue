<template>
  <div class="rounded m-2 scale-transform">
    <img
      v-if="('filePath' in item)"
      :src="getImageKitUrl(item.filePath)"
      alt="galleryItem"
      class="img-fluid rounded"
      style="width: 300px; height: 260px"
      @click="viewItem"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      :title="itemTags"
    />
    <div v-if="loggedIn">
      <em class="bi bi-pencil-square icon float-start" @click="editItem"></em>
      <em class="bi bi-trash icon float-end" @click="deleteItem"></em>
    </div>
  </div>
</template>
<script>
import ImagesService from "../services/ImagesService";
import { getImageKitUrl } from "@/utils/ImageKitUtil";

export default {
  name: "GalleryItem",
  props: {
    item: {
      type: Object,
    },
    itemIndex: {
      type: Number,
    },
  },
  data() {
    return {
      loggedIn: false,
      itemTags: ""
    };
  },
  mounted() {
    this.checkLoggedIn();
    this.setTags();
  },
  methods: {
    getImageKitUrl,
    checkLoggedIn() {
      this.loggedIn = this.$store.state.logged;
    },
    setTags() {
      this.itemTags =
        "tags" in this.item && this.item.tags.length > 0
          ? this.item.tags.join(",").toString()
          : "No Tags";
    },
    viewItem() {
      this.updateItemViews();
      this.$router.push({
        name: "GallerySlider",
        params: {
          galleryItemIndex: this.itemIndex,
        },
      });
    },
    editItem() {
      this.$router.push({
        name: "EditGallery",
        params: {
          item: this.item,
        },
      });
    },
    async deleteItem() {
      if (window.confirm("Confirm! Do you want to delete this gallery?")) {
        await ImagesService.deleteImage(this.item.id);
        this.$toast.warning("Image has been deleted!");
        this.$router.go(0);
      }
    },
    async updateItemViews() {
      this.item.views++;
      await ImagesService.updateImage(this.item.id, this.item);
    },
  },
};
</script>
<style scoped>
.icon {
  font-size: 1.4rem;
  color: red;
}

.scale-transform:hover {
  transform: scale(1.1);
}
</style>
