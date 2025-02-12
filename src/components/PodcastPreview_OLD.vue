<template>
  <div
      class="card podcast-preview mb-5 bg-body rounded"
      aria-hidden="true"
  >
    <div class="podcast-label ">
      <div class="podcast-media-type">
        {{ podcast.chapters[0].category }}
      </div>
      <h5 class="card-title">
        {{ podcast.title }}
        <label-tag v-if="isFree">Free</label-tag>
      </h5>
      <Ellipsis class="podcast-label-note" :content="podcast.chapters[0].note"/>
    </div>

    <div class="img-wrapper">
      <img
          :src="getImageKitUrl(podcast.coverPath, {'width': '100', 'height': '100'})"
          class="card-img-top rounded"
          :alt="podcast.title"
          @click="viewPodcast"
      />
    </div>

    <div class="mt-2" v-if="loggedIn">
      <em class="bi bi-pencil-square icon" @click="editPodcast"></em>
    </div>
  </div>
</template>

<script>
import PodcastService from "@/services/PodcastsService";
import LabelTag from "@/components/LabelTag";
import { getImageKitUrl } from "@/utils/ImageKitUtil";
import bgImage from '/public/img/lee-pigott-OJ4m4_yIgjY-unsplash.jpg';
import Ellipsis from "@/components/Ellipsis.vue";

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
      cardBackground: bgImage,
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
  color: #ffffff;
  background: radial-gradient(circle closest-corner at 163px 63px, #2b2821, #212121 270%) no-repeat center center;
  background-size: cover;
  cursor: pointer;
  overflow: hidden;
}

.podcast-label {
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  .card-title {
    @media (max-width: 767px) {
      font-size: 1rem;
    }
  }

  .podcast-media-type {
    display: inline-block;
    margin: 0 0 5px;
    padding: 0.25rem;
    font-size: 0.875rem;
    line-height: 1;
    background: #ef6603;
    color: #ffffff;
    text-transform: capitalize;
  }
}

.img-wrapper {
  padding: .5rem 1rem 1rem;

  @media (min-width: 768px) {
    padding: 1rem 1.5rem 1.5rem;
  }
}
</style>
