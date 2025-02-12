<template>
  <div class="page container" v-cloak>
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
              @click="printHtmlToPdf('print-content')"
              class="bi bi-printer"
          />
        </button>
      </div>
    </div>

    <div id="print-content">
      <div class="story-summary">
        <h1 v-if="story.title">{{ story.title }}</h1>

        <tag-item v-for="tag in story.tags" :key="tag" :tag-name="tag"/>
        <hr/>
      </div>
      <div class="story-content">
        <span class="text-justify" v-html="story.note"></span>
      </div>
    </div>

    <div v-show="isFullscreen" class="fullscreen" ref="fullscreen">
      <div class="content">
        <div class="story-summary">
          <h1 v-if="story.title">{{ story.title }}</h1>
          <br/>
          <tag-item v-for="tag in story.tags" :key="tag" :tag-name="tag"/>
          <hr/>
        </div>
        <div class="story-content">
          <span class="text-justify" v-html="story.note"></span>
        </div>
      </div>
    </div>

    <div id="comments">
      <comments-box :resource-id="story.id" :resource-category="resourceCategory" v-if="('id' in story)"/>
    </div>

    <div class="story-sharing">
      <social-sharing :share-content="shareContent" :show-name="false"/>
    </div>

  </div>
</template>
<script>
import CommentsBox from "@/components/CommentsBox";
import SocialSharing from "@/components/SocialSharing";
import TagItem from "@/components/TagItem";
import StoryService from "@/services/StoriesService";
import {printHtmlToPdf} from "@/utils/PdfUtil";

export default {
  name: "ReadStory",
  components: {
    CommentsBox,
    SocialSharing,
    TagItem,
  },
  data() {
    return {
      story: {
        title: "",
      },
      resourceCategory: "stories",
      shareContent: {
        url: window.location.href,
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      },
      printHtmlToPdf: printHtmlToPdf,
      isFullscreen: false,
      isMobile: false,
    };
  },
  async created() {
    window.scrollTo(0, 0);
    this.story = await this.getStory();
    this.shareContent.title = this.story.title;
  },
  mounted() {
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
    async getStory() {
      const storyId = this.$route.params.storyId;
      return StoryService.getStory(storyId);
    },
    enterFullscreen() {
      this.isFullscreen = true;
      this.$refs.fullscreen.requestFullscreen();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/_variables.scss";
[v-cloak] {
  display: none
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
}

.text-justify {
  text-align: justify;
}
</style>
