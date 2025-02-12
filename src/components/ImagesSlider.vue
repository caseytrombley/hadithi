<template>
  <div class="h-75">
    <carousel
      :perPage="numberImagesPerSlide"
      :navigationEnabled="true"
      :paginationEnabled="false"
      :value="imageNumber"
      :centerMode="centerMode"
      :navigateTo="imageStartIndex"
      navigationPrevLabel="<i class='bi bi-arrow-left-circle-fill text-white'></i>"
      navigationNextLabel="<i class='bi bi-arrow-right-circle-fill text-white'></i>"
      @page-change="handlePageChange"
    >
      <slide
        v-for="(image, index) in images"
        :key="image.id"
        :data-index="index"
        :data-name="image.title"
      >
        <p class="text-wrap text-center">{{ image.title }}</p>
        <img
          :src="getImageKitUrl(image['filePath'])"
          alt="Gallery Item"
          style="height: 50vh; width: 100vh"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          :title="getImageTags(image)"
          class="rounded mx-auto d-block img-fluid"
        />
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import { getImageKitUrl } from "@/utils/ImageKitUtil";

export default {
  name: "ImagesSlider",
  components: {
    Carousel,
    Slide,
  },
  props: {
    images: {
      type: Array,
    },
    imageNumber: {
      type: Number,
      default: 10,
    },
    imageStartIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      numberImagesPerSlide: 1,
      centerMode: true,
    };
  },
  methods: {
    getImageKitUrl,
    handlePageChange(pageNumber) {
      this.$emit("setActiveImage", pageNumber);
    },
    getImageTags(image) {
      return "tags" in image && image.tags.length > 0
        ? image.tags.join(",").toString()
        : "No Tags";
    },
  },
};
</script>
<style scoped></style>
