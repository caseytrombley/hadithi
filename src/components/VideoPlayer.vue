<template>
  <vue-vimeo-player
      ref="player"
      :autoplay="autoPlay"
      :video-id="videoId"
      @ready="onReady"
      :player-height="height"
      :player-width="width"
  />
</template>

<script>
import { vueVimeoPlayer } from "vue-vimeo-player";

export default {
  name: "VideoPlayer",
  components: {
    vueVimeoPlayer
  },
  props: {
    autoPlay:{
      type: Boolean,
      default: false
    },
    videoId: {
      type: String,
      default: 'default'
    },
    width: {
      type: Number,
      default: 320
    },
    height: {
      type: Number,
      default: 180
    }
  },
  data() {
    return {
      options: {
        muted: true,
        autoplay: true,
      },
      playerReady: false
    }
  },
  methods: {
    onReady() {
      this.playerReady = true;
    },
    play () {
      this.$refs.player.play();
    },
    pause () {
      this.$refs.player.pause();
    }
  }
}
</script>

<style scoped>

</style>
