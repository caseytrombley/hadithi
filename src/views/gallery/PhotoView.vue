<template>
  <div class="main-content">
    <b-container fluid="xl" class="photo-view">

      <base-section-loader v-if="loading" block large />

      <div v-if="!loading" class="photo-wrapper d-flex flex-column">

        <div class="photo-details">
          <div class="section-title aos-init aos-animate" data-aos="zoom-out">
            <h2>Photograph</h2>
            <p>{{ image.title }}</p>
          </div>
        </div>

        <img v-if="imageId" :src="getImageKitUrl(image.filePath)" :alt="image.title || 'Hadithi historical photography'"
             class="image">

        <div class="photo-actions">
          <div>
            <base-button
              @click.native="downloadImage(image)"
              class="download-button"
              is-action
              icon="download"
            >
              Download
            </base-button>
          </div>
          <div>
            <social-sharing :share-content="shareContent" :show-name="false" />
          </div>
        </div>
      </div>

    </b-container>

    <div v-if="relatedImages.length > 0" class="related-images section-dark">

      <b-container fluid="xl">
        <h3>Related images</h3>

      </b-container>

      <grid-images :prop-images="relatedImages" />

    </div>
  </div>

</template>
<script>
import GalleryService from "@/services/ImagesService";
import GridImages from "@/components/GridImages.vue";
import BaseButton from "@/components/base/BaseButton";
import SocialSharing from "@/components/SocialSharing";
import BaseSectionLoader from "@/components/base/BaseSectionLoader";
import { randomSort } from "@/utils/SortUtil";
import { getImageKitUrl } from "@/utils/ImageKitUtil";

export default {
  name: "PhotoView",
  components: {
    BaseSectionLoader,
    SocialSharing,
    BaseButton,
    GridImages
  },
  data() {
    return {
      GalleryService: GalleryService,
      imageId: null,
      image: {},
      loading: null,
      images: [],
      relatedImages: [],
      shareContent: {
        url: "",
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      }
    };
  },
  async mounted() {
    window.scrollTo(0, 0);
    await this.setImage();
    await this.getImages();
  },
  methods: {
    getImageKitUrl,
    async setImage() {
      this.loading = true;
      this.imageId = this.$route.params.id;
      this.image = await this.GalleryService.getImage(this.imageId);
      this.loading = false;
      this.shareContent.title = this.image.title;
      this.shareContent.url = `${window.location.protocol}//${window.location.host}/photo/${this.image.id}`;
    },
    async getImages() {
      this.images = await GalleryService.getImages();
      this.relatedImages = randomSort(this.getRelatedImages(this.images, this.image));
      this.loading = false;
    },
    getRelatedImages(images, targetImage){
      return images.filter(image => image.tags.some(tag => targetImage.tags.includes(tag)));
    },
    downloadImage(image) {
      let link = document.createElement("a");
      link.href = getImageKitUrl(image.filePath);
      link.download = image.title;
      link.click();
      link.remove();
    }
  }
};
</script>
<style lang="scss" scoped>
.photo-view {
  margin: 2rem auto;
  text-align: center;

  @media (min-width: 992px) {
    margin: 3rem auto;
    text-align: left;
  }
}

.photo-actions {
  margin: 2rem auto;

  > div {

    @media (max-width: 450px) {
      display: block;
      text-align: center;

      .download-button {
        margin-bottom: 2rem;
      }
    }

  }

  @media (min-width: 450px) {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    width: 100%;
  }
}

.photo-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description {
  position: relative;
  text-align: center;

  @media (min-width: 992px) {
    text-align: right;
    margin-right: 1rem;
  }

}


</style>
