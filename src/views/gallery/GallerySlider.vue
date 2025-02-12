<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div class="m-3 rounded">
          <images-slider
              :images="galleryItems"
              :image-start-index="galleryItemIndex"
              :key="renderKey.slider"
              @setActiveImage="setActiveImage"
              class="p-5 bg-dark bg-gradient text-white rounded"
          />
          <div class="mt-3">
            <div class="d-flex float-start">
              <social-sharing :share-content="shareContent" :show-name="false" :key="renderKey.sharing"/>
            </div>
            <div class="d-flex float-end">
              <em class="bi bi-hand-thumbs-up-fill icon" @click="reactGalleryItem"></em>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">
        <RssFeed :feed-data="feedData"/>
      </div>
    </div>
  </div>
</template>

<script>
import ImagesSlider from "@/components/ImagesSlider";
import RssFeed from "@/components/RssFeed";
import SocialSharing from "@/components/SocialSharing";
import GalleryService from "@/services/ImagesService";
import {mapState} from "vuex";

export default {
  name: "GallerySlider",
  components: {
    ImagesSlider,
    RssFeed,
    SocialSharing,
  },
  data() {
    return {
      renderKey: {
        slider: 0,
        sharing: 0,
      },
      galleryItemIndex: parseInt(this.$route.params.galleryItemIndex) || 0,
      item: null,
      shareContent: {
        url: "",
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      },
      feedData: {
        url: `${process.env.VUE_APP_RSS_FEED}`,
        name: "HISTORY FEED",
        limit: 10
      }
    };
  },
  computed: {
    ...mapState(["galleryItems"]),
    galleryItems() {
      return Object.values(this.$store.getters.getGalleryItems);
    },
  },
  watch: {
    galleryItems() {
      this.renderKey.slider++;
      this.setActiveImage(this.galleryItemIndex);
    },
  },
  methods: {
    reactGalleryItem() {
      this.item.likes++;
      GalleryService.updateImage(this.item.id, this.item);
      this.$toast("You have liked!");
    },
    setActiveImage(itemIndex) {
      if (this.galleryItems.length > 0) {
        this.item = this.galleryItems[itemIndex];
        this.shareContent.url = `${window.location.origin}/gallery/image/${itemIndex}`;
        this.shareContent.title = this.item.title;
        this.renderKey.sharing++;
      }
    },
  },
};
</script>
<style scoped>
.icon {
  font-size: 1.6rem;
  color: green;
}
</style>
