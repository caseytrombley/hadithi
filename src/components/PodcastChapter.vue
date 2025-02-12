<template xmlns="http://www.w3.org/1999/html">
  <div class="podcast-chapter card dark">
    <div class="row d-flex justify-content-between">
      <div class="podcast-chapter-control col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
        <button v-if="canPlay && validUrl && !isPlaying" class="btn btn-lg" @click="handleEvent('play')">
          <em class="bi bi-play-circle-fill display-3"></em>
        </button>
        <button v-if="canPlay && validUrl && isPlaying" class="btn btn-lg" @click="handleEvent('stop')">
          <em class="bi bi-stop-circle-fill display-3"></em>
        </button>
        <button v-if="!canPlay && validUrl" class="btn btn-lg" @click="handleEvent('pricing')">
          <em class="bi bi-play-circle-fill display-3"></em>
        </button>
        <div v-if="canPlay && !validUrl" class="mt-3 alert alert-warning" role="alert">
          <em class="bi bi-exclamation-triangle"></em> No Content!
        </div>
      </div>
      <div class="podcast-label col-lg-8 col-md-6 col-sm-12">
        <div class="podcast-media-type">
          {{ chapter.category }}
        </div>
        <h5 class="card-title">
          {{ chapter.title }}
          <label-tag v-if="chapter.isFree">Free</label-tag>
        </h5>
        <Ellipsis class="podcast-label-note" :content="chapter.note"/>
      </div>
    </div>
    <div class="podcast-footer card-footer row">
      <div class="col-lg-8 col-md-6 col-sm-12">
        <p class="footer-label">{{ getDateFormat(chapter["createdAt"]) }}</p>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <social-sharing class="mt-2 float-end" v-if="shareVisible" :share-content="shareContent" :show-name="false"/>
        <div class="float-end">
          <button
              data-bs-toggle="tooltip" data-bs-placement="top" title="Share"
              @click="toggleShare"
              class="btn btn-outline-secondary m-1">
            <em class="bi bi-share"></em>
          </button>
          <button data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"
                  @click="handleEvent('edit')"
                  class="btn btn-outline-warning m-1"
                  v-if="permissions['CAN_EDIT'] && !shareVisible">
            <em class="bi bi-pencil-square"></em>
          </button>
          <button
              data-bs-toggle="tooltip" data-bs-placement="top" title="Publish"
              @click="handleEvent('publish')"
              class="btn btn-outline-info m-1"
              v-if="unpublished && permissions['CAN_PUBLISH'] && !shareVisible">
            <em class="bi bi-eye-fill"></em>
          </button>
          <button
              data-bs-toggle="tooltip" data-bs-placement="top" title="UnPublish"
              @click="handleEvent('unPublish')"
              class="btn btn-outline-info m-1"
              v-if="published && permissions['CAN_PUBLISH'] && !shareVisible">
            <em class="bi bi-eye-slash-fill"></em>
          </button>
          <button
              data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
              @click="handleEvent('delete')"
              class="btn btn-outline-danger m-1"
              v-if="unpublished && permissions['CAN_DELETE'] && !shareVisible">
            <em class="bi bi-trash-fill"></em>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Ellipsis from "@/components/Ellipsis";
import LabelTag from "@/components/LabelTag";
import SocialSharing from "@/components/SocialSharing";
import SubscriptionsService from "@/services/SubscriptionsService";

export default {
  name: "PodcastChapter",
  components: {
    Ellipsis,
    LabelTag,
    SocialSharing
  },
  props: {
    chapter: {
      type: Object,
      default: () => ({
        id: "",
        title: "",
        note: "",
        published: false,
        feedPath: "",
        feed: "",
        createdAt: "",
        isFree: false
      })
    },
    permissions: {
      type: Object,
      default() {
        return {
          CAN_WRITE: false,
          CAN_EDIT: false,
          CAN_DELETE: false
        };
      },
    }
  },
  data() {
    return {
      validUrl: false,
      shareVisible: false,
      shareContent: {
        url: window.location.href,
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      }
    }
  },
  computed: {
    published() {
      return this.chapter.published === true;
    },
    unpublished() {
      return this.chapter.published !== true;
    },
    subscription() {
      return this.$store.state.subscription;
    },
    canPlay() {
      return this.chapter.isFree || this.checkSubscription();
    },
    isPlaying(){
      const playing = this.$store.state.playing;
      let isPlaying = false;
      if(playing !== null){
        isPlaying = (this.chapter.id === playing.id);
      }
      return isPlaying;
    }
  },
  async mounted() {
    this.validUrl = await this.checkUrl(this.chapter.feed);
    this.shareContent.title = this.chapter.title;
    this.shareContent.url = `${this.shareContent.url}/chapter/${this.chapter.id}`;
  },
  methods: {
    checkSubscription() {
      const hasSubscription = ("name" in this.subscription);
      return hasSubscription && SubscriptionsService.getResourceAccessSubscriptions("podcast").includes(this.subscription.name);
    },
    getDateFormat(date, formatOptions = {year: 'numeric', month: 'short', day: 'numeric'}) {
      return new Date(date).toLocaleDateString('en-us', formatOptions);
    },
    handleEvent(event) {
      this.$emit(event, this.chapter);
    },
    async checkUrl(feedUrl) {
      if (feedUrl) {
        const response = await fetch(feedUrl);
        return response.status === 200;
      }
      return true;
    },
    toggleShare() {
      this.shareVisible = !this.shareVisible;
    },
  }
}
</script>
<style lang="scss" scoped>
.podcast-chapter {
  margin: 0 0 1rem;

  &:last-child {
    margin: 0;
  }

  .row {
    margin-left: 0;
    margin-right: 0;
  }

  .podcast-label-note {
    display: block;
    margin: 0 0 1rem;
    padding: 1rem;
    background: #f7f7f7;
    color: #6c757d;
    border-radius: 8px;
    font-size: .875rem;

    @media (max-width: 767px) {
      font-size: .75rem;
      padding: .5rem;
    }
  }


  &.light {
    background: radial-gradient( circle closest-corner at 163px 63px, #2b2821, #212121 270% ) no-repeat;

    color: #ffffff;

    .podcast-label-note {
      background: rgba(255,255,255,0.025);
      color: #6c757d;
    }

    .bi-play-circle-fill,
    .bi-stop-circle-fill {
      &::before {
        color: #ffffff;
      }
    }

    .card-footer {
      border-top-color: #1a1a1a;
    }
  }

  &.dark {
    background: rgba(255,255,255,0.075);

    color: #ffffff;

    .podcast-label-note {
      background: rgba(255,255,255,0.025);
      color: #6c757d;
    }

    .bi-play-circle-fill,
    .bi-stop-circle-fill {
      &::before {
        color: #ffffff;
      }
    }

    .card-footer {
      border-top-color: #1a1a1a;
    }
  }
}

.footer-label {
  color: #6c757d;
  font-family: "Poppins", sans-serif;
  font-size: .875rem;
}

.podcast-chapter-control {
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
}

.podcast-label {
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem 1.5rem 0;
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
    border-radius: 0;
    text-transform: capitalize;
  }
}

.podcast-footer {
  display: flex;
  justify-content: space-between;

  @media (max-width: 767px) {
    padding: .5rem .25rem !important;
  }
}
</style>
