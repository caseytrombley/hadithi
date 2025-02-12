<template>
  <div
      class="card podcast-preview mb-5 bg-body rounded"
      aria-hidden="true"
  >
    <div @click="viewPodcast" class="img-wrapper">
      <label-tag v-if="isFree" theme="corner-label">Free</label-tag>
      <lazy-background
          :image-source="getImageKitUrl(podcast.coverPath, {'width': 'auto', 'height': 'auto'})"
          loading-image="/img/loading.svg"
          error-image="/img/error.svg"
          image-class="placeholder-img"
          background-size="cover"
      >
      </lazy-background>
      <div class="media-type-label">
        {{ podcast.chapters[0].category }}
      </div>

    </div>

    <div class="podcast-label ">

      <h5 class="card-title">
        {{ podcast.title }}

      </h5>
      <Ellipsis
        :content="podcast.chapters[0].note"
        :lines="2"
        class="podcast-label-note"
      />
    </div>

    <div class="edit-section" v-if="loggedIn">
      <em class="bi bi-pencil-square icon" @click="editPodcast"></em>
    </div>

  </div>
</template>

<script>
import PodcastService from "@/services/PodcastsService";
import LabelTag from "@/components/LabelTag";
import { getImageKitUrl } from "@/utils/ImageKitUtil";
import Ellipsis from "@/components/Ellipsis.vue";
import previewImage from '/public/img/africa/ben-mcleod-GF2GJGzOV5s-unsplash.jpg';

export default {
  name: "PodcastPreview",
  components: { Ellipsis, LabelTag},
  props: {
    podcast: {
      type: Object,
    },
  },
  computed: {
    loggedIn(){
      return this.$store.getters.loggedIn;
    },
    isFree() {
      return this.podcast.chapters[0].isFree;
    }
  },
  data() {
    return {
      PodcastService: PodcastService,
      podcastPreviewImage: previewImage,
    };
  },
  methods: {
    getImageKitUrl,
    viewPodcast() {
      this.$emit("viewPodcast", this.podcast);
    },
    editPodcast() {
      this.$router.push({name: "EditPodcast", params: {podcastId: this.podcast.id}});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.podcast-preview {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  width: 100% !important;
  border: 0 !important;
  color: #000000;
  //background: radial-gradient(circle closest-corner at 163px 63px, #2b2821, #212121 270%) no-repeat center center;
  background-size: cover;
  cursor: pointer;
  overflow: hidden;
}

.podcast-label {
  padding: .5rem 0;

  .card-title {
    margin: 0 0 .25rem;
    font-size: 1rem;

    @media (max-width: 767px) {
      font-size: 1rem;
    }
  }
}

.placeholder-img {
  height: 200px;
  cursor: pointer;
  background-position: 50% 50%;
  border-radius: 0;
  background-repeat: no-repeat;
}

.podcast-label-note {
  padding: 0 !important;
  color: #777777;
  font-size: .85rem;
}

.img-wrapper {
  position: relative;
  padding: 0;
}

.media-type-label {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 0.25rem;
  font-size: 0.875rem;
  line-height: 1;
  background: #ef6603;
  color: #ffffff;
  text-transform: capitalize;
}

.edit-section {
  margin: auto 0 0;
}
</style>
