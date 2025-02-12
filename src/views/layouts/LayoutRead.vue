<template>
  <div class="page container">
    <div class="viewer-nav">
      <button @click="$router.go(-1)" class="btn btn-sm btn-outline-dark back">
        <em class="bi bi-arrow-left"></em>
        <span>Back</span>
      </button>
      <div v-if="!isMobile" class="viewer-controls">
        <button class="viewer-controls--btn">
          <em
              @click="enterFullscreen"
              class="bi bi-fullscreen"
          />
        </button>
        <button class="viewer-controls--btn">
          <em
              @click="handlePrintClick"
              class="bi bi-printer"
          />
        </button>
      </div>
    </div>

    <base-loader v-if="loading" block large />

    <div :class="{fullscreen: this.isFullscreen}" ref="fullscreen">
      <div class="content">
        <slot name="body"></slot>
      </div>
    </div>

    <slot name="comments"></slot>

    <div class="story-sharing my-3">
      <social-sharing :share-content="shareContent" :show-name="false"/>
    </div>

  </div>
</template>
<script>
import SocialSharing from "@/components/SocialSharing";
import BaseLoader from "@/components/base/BaseLoader";

export default {
  name: "LayoutRead",
  components: {
    BaseLoader,
    SocialSharing,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: null,
      shareContent: {
        url: window.location.href,
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      },
      isFullscreen: false,
      isMobile: false,
    }
  },
  created() {
    window.scrollTo(0, 0);
  },
  mounted() {
    this.loading = this.isLoading;
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement === null) {
        this.isFullscreen = false;
      }
    });
  },
  methods: {
    enterFullscreen() {
      this.isFullscreen = true;
      this.$refs.fullscreen.requestFullscreen();
    },
    handlePrintClick() {
      this.$emit('clickPrint');
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.document-body {
  padding-top: 80px;

   > *:first-of-type {
     margin-top: 0;
     padding-top: 0;
   }
}

.viewer-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: .5rem;
  background: #f7f7f7;
  border-radius: 8px;

  .back {
    height: min-content;
  }
}

.viewer-controls--btn {
  display: inline-block;
  padding: 0;
  margin-right: 1rem;
  background: none;
  border: 0;

  .bi {
    display: block;
    font-size: 1.5rem;
    transition: all 250ms ease;
  }

  &:hover {
    .bi {
      color: $orange;
      transform: scale(1.15);
    }
  }

  &:last-child {
    margin: 0;
  }
}

.fullscreen {
  overflow: auto;
  background: #ffffff;
  z-index: 7878;

  .content {
    position: relative;
    overflow: auto;
    margin: 3rem;
  }

  ::v-deep {
    .pdf-wrapper {
      padding: 0;
      border: 0;
      box-shadow: none;
    }
  }
}
</style>
