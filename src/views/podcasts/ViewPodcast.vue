<template>
  <div class="view-podcast">
    <page-hero page-view theme="leopard">
      <template #nav>
        <div class="viewer-nav">
          <button @click="$router.push({ name: 'Podcasts'})" class="btn btn-sm btn-outline-dark back">
            <em class="bi bi-arrow-left"></em>
            <span>Back to Podcasts</span>
          </button>
        </div>
      </template>
      <template #section>
        <section class="section theme-dark">
          <div class="podcast-summary section-title section-title aos-init aos-animate" data-aos="zoom-out">
            <h2>Podcast</h2>
            <p v-if="podcast.title">{{ podcast.title }}</p>
          </div>

          <div class="podcast-wrapper aos-init aos-animate" data-aos="fade-up">
            <div class="podcast-hero">
              <div>

                <lazy-background
                    v-if="('coverPath' in podcast)"
                    :image-source="getImageKitUrl(podcast.coverPath, {'width': '100', 'height': '100'})"
                    loading-image="/img/loading.svg"
                    error-image="/img/error.svg"
                    image-class="placeholder-img podcast-icon"
                    background-size="cover"
                >
                </lazy-background>


<!--                <img-->
<!--                    v-if="('coverPath' in podcast)"-->
<!--                    class="podcast-icon"-->
<!--                    :src="getImageKitUrl(podcast.coverPath, {'width': '100', 'height': '100'})"-->
<!--                    alt="Podcast cover"-->
<!--                />-->
              </div>
              <div>

                <h6 v-if="podcast.anchor" class="hero-title">
                  <span>Hosted By:</span> <strong>{{ podcast.anchor }}</strong>
                </h6>
                <tag-item v-for="tag in podcast.tags" :key="tag" :tag-name="tag"/>
              </div>
            </div>
            <div class="podcast-content">
              <div class="podcast-note" v-html="podcast.note" />
              <div class="d-flex justify-content-end">
                <button
                    class="btn btn-sm btn-outline-primary my-3"
                    @click="handleNew"
                    v-if="permissions.CAN_WRITE"
                >
                  <em class="bi bi-plus-circle-fill" /> New Chapter
                </button>
              </div>

              <p class="label" v-if="podcast.chapters">
                <b-icon icon="tags" /> Available chapters/episodes:
              </p>
              <p class="label label-error" v-else>No chapters/episodes available!</p>

              <PodcastChapter
                  v-for="(chapter, index) in orderedChapters"
                  :chapter="chapter"
                  :key="(index+reloadKey)"
                  :permissions="permissions"
                  @edit="handleEdit"
                  @publish="handlePublish"
                  @unPublish="handleUnPublish"
                  @delete="handleDelete"
                  @pricing="handlePricing"
                  @play="handlePlay"
                  @stop="handleStop"
              />
            </div>
          </div>

        </section>
      </template>

    </page-hero>

    <div class="page-footer">
      <b-container>
        <div id="comments">
          <comments-box :resource-id="podcast.id" :resource-category="resourceCategory"/>
        </div>
        <social-sharing :share-content="shareContent" :show-name="false"/>
      </b-container>
    </div>
  </div>
</template>
<script>
import PageHero from "@/components/sections/PageHero";
import CommentsBox from "@/components/CommentsBox";
import PodcastChapter from "@/components/PodcastChapter";
import SocialSharing from "@/components/SocialSharing";
import TagItem from "@/components/TagItem";
import PodcastService from "@/services/PodcastsService";
import {printHtmlToPdf} from "@/utils/PdfUtil";
import {timestampFieldSort} from "@/utils/SortUtil";
import { getImageKitUrl } from "@/utils/ImageKitUtil";

import previewImage from '/public/img/africa/ben-mcleod-GF2GJGzOV5s-unsplash.jpg';

export default {
  name: "ViewPodcast",
  components: {
    PageHero,
    CommentsBox,
    PodcastChapter,
    SocialSharing,
    TagItem
  },
  data() {
    return {
      podcastPreviewImage: previewImage,
      podcast: {
        title: ""
      },
      resourceCategory: "podcasts",
      shareContent: {
        url: window.location.href,
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      },
      printHtmlToPdf: printHtmlToPdf,
      PodcastService: PodcastService,
      permissions: {},
      reloadKey: 0,
      orderedChapters: []
    };
  },
  computed: {
    userPermissions() {
      return this.$store.state.userPermissions;
    },
    hasAdminAccess() {
      return this.permissions.CAN_WRITE || this.permissions.CAN_EDIT || this.permissions.CAN_DELETE;
    }
  },
  async mounted() {
    window.scrollTo(0, 0);
    this.permissions = this.getUserPermissions(this.userPermissions);
    this.podcast = await this.getPodcast();
    this.shareContent.title = this.podcast.title;
    this.orderedChapters = await this.getOrderedPodcastChapters();
  },
  methods: {
    getImageKitUrl,
    getUserPermissions(userPermissions) {
      return {
        CAN_WRITE: userPermissions["CAN_WRITE_PODCAST"],
        CAN_EDIT: userPermissions["CAN_EDIT_PODCAST"],
        CAN_PUBLISH: userPermissions["CAN_PUBLISH_PODCAST"],
        CAN_DELETE: userPermissions["CAN_DELETE_PODCAST"]
      };
    },
    async getPodcast() {
      const podcastId = this.$route.params.podcastId;
      return PodcastService.getPodcast(podcastId);
    },
    async getOrderedPodcastChapters() {
      if (!this.hasAdminAccess) {
        this.podcast.chapters = await PodcastService.getPodcastPublishedChapters(this.podcast.id);
      }
      if (this.hasAdminAccess) {
        this.podcast.chapters = await PodcastService.getPodcastChapters(this.podcast.id);
      }

      this.podcast.chapters = this.getFilteredChapter(this.podcast.chapters, this.$route.params.chapterId);
      return this.getChaptersByLatestOrder(this.podcast.chapters);
    },
    handleNew() {
      this.$router.push({
        name: "AddPodcastChapter",
        params: {podcastId: this.podcast.id}
      });
    },
    handleEdit(chapter) {
      this.$router.push({
        name: "EditPodcastChapter",
        params: {podcastId: this.podcast.id, chapterId: chapter.id},
      });
    },
    async handlePublish(chapter) {
      const podcastId = this.podcast.id;
      const chapterId = chapter.id;
      if (window.confirm("Confirm! Do you want to publish this chapter?")) {
        await PodcastService.updatePodcastChapter(podcastId, chapterId, {published: true, updatedAt: new Date()});
        await this.reloadPodcast();
        this.$toast.success(`Chapter was published successfully!`);
      }
    },
    async handleUnPublish(chapter) {
      const podcastId = this.podcast.id;
      const chapterId = chapter.id;
      if (window.confirm("Confirm! Do you want to UnPublish this chapter?")) {
        await PodcastService.updatePodcastChapter(podcastId, chapterId, {published: false, updatedAt: new Date()});
        await this.reloadPodcast();
        this.$toast.info(`Chapter was unpublished successfully!`);
      }
    },
    async handleDelete(chapter) {
      const podcastId = this.podcast.id;
      const chapterId = chapter.id;
      if (window.confirm("Confirm! Do you want to delete this chapter?")) {
        await PodcastService.deletePodcastChapter(podcastId, chapterId);
        await this.reloadPodcast();
        this.$toast.error(`Chapter was deleted successfully!`);
      }
    },
    async reloadPodcast() {
      this.podcast = await this.getPodcast();
      this.orderedChapters = await this.getOrderedPodcastChapters();
      this.reloadKey++;
    },
    getChaptersByLatestOrder(chapters) {
      return timestampFieldSort(chapters, "createdAt");
    },
    handlePricing() {
      this.$router.push({name: "Pricing"});
    },
    getFilteredChapter(chapters, chapterId) {
      if (chapterId) {
        chapters = chapters.filter(chapter => chapter.id === chapterId);
      }
      return chapters;
    },
    handlePlay(chapter) {
      this.$store.commit("setPlaying", chapter);
    },
    handleStop() {
      this.$store.commit("setPlaying", null);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.viewer-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .back {
    height: min-content;
  }
}

.podcast-wrapper {

  .label {
    margin: 0 0 1rem;
    padding: 1rem;
    //background: #94bf5a;
    border-radius: 8px;
    color: white;
    font-size: .875rem;

    &.label-error {
      background: #bf5a5a;
    }
  }
}

.podcast-hero {
  display: flex;
  margin: 0 0 1rem;

  .placeholder-img {
    cursor: pointer;
    background-color: rgba(255,255,255,0.075);
    background-position: 50% 50%;
    border-radius: 0;
    background-repeat: no-repeat;
  }

  .podcast-icon {
    width: 100px;
    height: 100px;
  }

  > div {
    margin-right: 1rem;

    &:last-child {
      margin: 0;
    }
  }

  .hero-title {
    > span {
      display: block;
      font-weight: 700;
      text-transform: uppercase;
      font-family: "Poppins", sans-serif;
      font-size: .875rem;
      padding: 0;
      margin: 0 0 5px 0;
      color: #6c757d;
    }
  }

  @media (max-width: 767px) {
    .podcast-icon {
      width: 70px;
      height: 70px;
    }

    .hero-title {
      font-size: 1rem;
    }
  }
}

.podcast-note {
  display: block;
  margin: 0 0 1rem;
  color: #6c757d;
  font-size: .875rem;

  ::v-deep {
    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.page-footer {
  background: #efefef;
  padding: 2rem 0;
}

.text-justify {
  text-align: justify;
}
</style>
