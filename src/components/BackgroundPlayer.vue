<template>
  <div class="player fade show" role="alert">
    <strong><em class="bi bi-play-btn-fill"></em> Now Playing...</strong>
    <p>{{ item.title }}</p>
    <AudioPlayer
        v-if="isAudio"
        :url="item['feed']"
        :player-id="`player-id-${item.id}`"
        :auto-play="autoPlay"
        :key="item.id"
    />
    <VideoPlayer
        v-if="isVideo"
        :video-id="item['feed']"
        :auto-play="autoPlay"
        :key="item.id"
        :height="180"
    />
    <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="handleEvent('close')"
    />
  </div>
</template>

<script>
import AudioPlayer from "@/components/AudioPlayer";
import VideoPlayer from "@/components/VideoPlayer";

export default {
  name: "BackgroundPlayer",
  components: {
    AudioPlayer,
    VideoPlayer
  },
  props: {
    item: {
      type: Object,
      default: () => ({
        "id": "",
        "title": "",
        "feed": ""
      })
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {}
  },
  computed: {
    isAudio() {
      return (this.item.id && this.item.category === 'audio');
    },
    isVideo() {
      return (this.item.id && this.item.category === 'video');
    }
  },
  methods: {
    handleEvent(event) {
      this.$emit(event);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
p {
  font-size: .875rem;
}

.player {
  position: fixed;
  bottom: 0;
  right: 0;
  width: auto;
  padding: 1.5rem;
  color: $orange;
  background: #000000;
  border-top: 5px solid $orange;
  z-index: 1;

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 1.5rem;
  }
}

</style>
