<template>
  <div class="grid-images">
    <div v-if="images"
         :class="[mixedGrid ? 'grid-mixed' : 'grid']"
         class="my-5">

      <div
        @click="handleImageClick(image, index)"
        v-for="(image, index) in images"
        :key="`${image.id}-${index}`"
        class="grid-item card"
        :title="image.title">
        <img
          :src="getImageKitUrl(image.filePath)"
          :alt="image.title"
          class="img-fluid rounded mx-auto d-block placeholder-img"
        />
      </div>
    </div>
    <div>
      <b-card v-if="images.length === 0" class="text-center">
        <div class="text-danger d-flex justify-content-center align-items-center">
          <b-icon-image scale="3" class="m-5" />
          <h1>
            No images found
          </h1>
        </div>

      </b-card>
    </div>

    <b-modal
      v-model="showModal"
      ref="modal"
      @hide="closeModal"
      size="xl"
      body-class="modal-main"
      hide-header
      hide-footer
    >
      <button class="close-x" @click="closeModal">
        <b-icon-x-lg />
      </button>

      <div class="modal-actions">
        <div>
          <span
            tabindex="0"
            data-bs-toggle="tooltip"
            class="d-inline-block tooltip-wrapper disabled"
            title="You can only like once logged in!"
          >
            <base-button
              @click.native="addLike"
              is-action-icon
              icon="heart-fill"
              :disabled="isDisabled"
            >
              <template #count>
                {{ likes }}
              </template>
              <template #label>
                likes
              </template>
            </base-button>
          </span>
        </div>
        <div>
          <base-button
            @click.native="downloadImage(images[slide])"
            is-action
            icon="download"
          >
            Download
          </base-button>
        </div>
      </div>

      <b-carousel
        v-if="images && images.length"
        v-model="slide"
        ref="photoCarousel"
        :interval="interval"
        :controls="controls"
      >
        <b-carousel-slide
          v-for="(item, index) in images"
          :key="`${image.id}-${index}`"
          class="slide"
        >
          <div class="d-flex">
            <div class="slide-img col-12">
              <img
                :src="getImageKitUrl(item.filePath)"
                :alt="item.title"
              />
            </div>
          </div>
        </b-carousel-slide>
      </b-carousel>

      <div v-if="images" class="modal-actions responsive">
        <div>

        </div>
        <div class="button-group">
          <base-button
            @click.native="showInfoModal = !showInfoModal"
            is-action
            icon="info-circle-fill"
          >
            More info
          </base-button>

          <base-button
            @click.native="showShareModal = !showShareModal"
            is-action
            icon="share-fill"
          >
            Share
          </base-button>
        </div>
      </div>

    </b-modal>

    <b-modal
      v-if="images"
      v-model="showInfoModal"
      @hide="closeInfoModal"
      ref="modalInfo"
      body-class="modal-info"
      hide-header
      hide-footer
      centered
      no-fade
      size="sm"
    >
      <button class="close-x" @click="closeInfoModal">
        <b-icon-x-lg />
      </button>

      <h3 class="heading">{{ images[slide].title }}</h3>

      <div class="modal-image-header">
        <img
          :src="getImageKitUrl(images[slide].filePath)"
          :alt="images[slide].title"
          class="img-fluid rounded mx-auto d-block"
        />
      </div>

      <div class="modal-info-details">
        <div v-if="images[slide].description">
          <h5>
            Description:
          </h5>
          <p>{{ images[slide].description }}</p>
        </div>

        <div v-if="images[slide].collection">
          <h5>
            Collection:
          </h5>
          <p>{{ images[slide].collection }}</p>
        </div>

        <div v-if="images[slide].tags">
          <h5>
            Tags:
          </h5>
          <b-badge
            v-for="(tag, i) in images[slide].tags"
            :key="i"
            variant="dark"
            pill
            class="rounded-pill bg-dark"
          >
            {{ tag }}
          </b-badge>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-if="image"
      v-model="showShareModal"
      @hide="closeShareModal"
      ref="modalShare"
      body-class="modal-share"
      hide-header
      hide-footer
      centered
      no-fade
      size="sm"
    >
      <button class="close-x" @click="closeShareModal">
        <b-icon-x-lg />
      </button>
      <h3>Spread the word</h3>
      <p>Share this image on your social media account</p>

      <social-sharing :share-content="shareContent" :show-name="false" />

    </b-modal>
  </div>
</template>

<script>
import GalleryService from "@/services/ImagesService";
import SocialSharing from "@/components/SocialSharing.vue";
import BaseButton from "@/components/base/BaseButton";
import { mapGetters } from "vuex";
import { getImageKitUrl } from "@/utils/ImageKitUtil";
import GalleryItem from "@/components/GalleryItem.vue";

export default {
  name: "GridImages",
  components: {
    GalleryItem,
    BaseButton,
    SocialSharing
  },
  props: {
    propImages: {
      type: Array,
      required: true
    },
    propMixedGrid: {
      type: Boolean,
      default: false
    },
    propGridTitle: {
      type: String,
      default: "Images"
    }
  },
  data() {
    return {
      showModal: false,
      showInfoModal: false,
      showShareModal: false,
      mixedGrid: this.propMixedGrid,
      searchTerm: "",
      title: this.propGridTitle,
      slide: 0,
      sliding: null,
      interval: 3000,
      controls: true,
      isDisabled: false,
      currentImage: {},
      currentIndex: "",
      originalPath: "",
      index: 0,
      item: {
        id: null,
        title: "",
        description: "",
        url: "",
        tags: [],
        asset_id: "",
        public_id: "",
        created_at: "",
        updated_at: "",
        user: {
          id: null,
          name: "",
          email: "",
          avatar: "",
          created_at: "",
          updated_at: ""
        }
      },
      imageId: null,
      image: {
        title: "",
        description: "",
        secure_url: "",
        likes: []
      },
      hasSharing: false,
      shareUrl: null,
      renderKey: {
        sharing: 0,
        related: 0
      },
      licenses: [],
      cartItem: {
        "image": {
          "id": "",
          "url": ""
        },
        "license": {
          "name": "",
          "price": 0
        }
      },
      shareContent: {
        url: "",
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      }
    };
  },
  watch: {
    slide: async function(val) {
      let image = this.images[val];
      window.history.pushState("", `Photo - ${image.title}`, `/photo/${image.id}`);
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "getUserDetails"
    }),
    images: {
      get() {
        return this.propImages;
      },
      set(newValue) {
        return newValue;
      }
    },
    likes() {
      if (this.image.likes) {
        return this.image.likes.length;
      }
      return 0;
    }
  },
  methods: {
    getImageKitUrl,
    downloadImage(image) {
      let link = document.createElement("a");
      link.href = getImageKitUrl(image.filePath);
      link.download = image.title;
      link.click();
      link.remove();
    },
    handleImageClick(image, idx) {
      this.currentImage = image;
      this.currentIndex = idx;
      this.slide = idx;
      this.showModal = true;
      this.originalPath = this.$route.path;
      window.history.pushState("", `Photo - ${image.title}`, `/photo/${image.id}`);
      this.shareContent.title = image.title;
      this.shareContent.url = `${window.location.protocol}//${window.location.host}/photo/${image.id}`;
    },
    closeModal() {
      this.showModal = false;
      history.pushState(
        {},
        null,
        this.originalPath
      );
    },
    closeInfoModal() {
      this.showInfoModal = false;
    },
    closeShareModal() {
      this.showShareModal = false;
    },
    async getImage(imageId) {
      return GalleryService.getImage(imageId);
    },

    async addLike() {
      const userEmail = this.currentUser.email;
      const image = this.images[this.slide];
      const imageId = image.asset_id;
      const isNotImageLikes = (image.likes === undefined || typeof image.likes === "number");

      image.likes = (isNotImageLikes ? [] : image.likes);

      if (userEmail === undefined) {
        return this.$toast.error("You must be logged in to like an image!");
      }

      if (image.likes.includes(userEmail)) {
        return this.$toast.success("You already liked this image!");
      }

      image.likes.push(userEmail);
      await GalleryService.updateImage(imageId, image);
      this.image = await this.getImage(imageId);

      return this.$toast.success("Image liked!");
    }
  },
  mounted() {
    this.interval = 0;
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

$timing: 300ms;

::v-deep {
  .carousel-caption {
    position: relative;
    right: auto;
    bottom: auto;
    left: auto;
    padding: 10px;
    color: inherit;
    text-align: left;
  }

  .carousel-control-prev,
  .carousel-control-next {
    height: 2rem;
    top: 300px;
  }

  .carousel-control-prev {
    left: -140px;
  }

  .carousel-control-next {
    right: -140px;
  }

  @media (max-width: 767px) {
    .carousel-caption {
      padding: .5rem 0 1rem;
    }

    .carousel-control-prev,
    .carousel-control-next {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: unset;
      top: 0;
      bottom: 0;
      z-index: 4;
      width: 2rem;
      height: 2rem;
      opacity: 1;
      background: $orange;
      border-radius: 100%;
    }

    .carousel-control-prev {
      left: 0;
    }

    .carousel-control-next {
      right: 0;
      float: right;
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0 auto;
    }
  }
}

.slide {
  .slide-img {
    text-align: center;

    img {
      margin: 0 auto;
      width: 100%;
      border-radius: 0;

      @media (min-width: 1200px) {
        width: auto;
        height: 650px;
      }
    }
  }
}

.placeholder-img {
  height: 100%;
  cursor: pointer;
  background-position: 50% 50%;
  border-radius: 0;
  background-repeat: no-repeat;
  background-size: contain;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-auto-rows: minmax(160px, auto);
  grid-gap: 1px;
  grid-auto-flow: row dense;

  @media (min-width: 576px) {
    grid-template-columns: repeat(4, auto);
    grid-auto-rows: minmax(180px, auto);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, auto);
    grid-auto-rows: minmax(240px, auto);
  }
}

.grid-mixed {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-auto-rows: minmax(160px, auto);
  grid-gap: 4px;
  grid-auto-flow: row dense;

  @media (min-width: 576px) {
    gap: 4px;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 300px 300px;

    .grid-item {
      background: transparent;
      display: block;


      &:nth-child(6n + 1) {
        grid-row: span 2;
      }

      &:nth-child(6n + 2) {
        grid-row: span 2;
        grid-column: span 2;
      }

      &:nth-child(6n + 4) {
        grid-column: 2 / 3;
      }
    }
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 300px 300px 300px 300px;

    .grid-item {
      &:nth-child(6n + 1) {
        grid-row: span 2;
      }

      &:nth-child(6n + 2) {
        grid-row: span 2;
        grid-column: span 2;
      }

      &:nth-child(6n + 4) {
        grid-column: 2 / 3;
      }
    }

  }
}

.card {
  min-height: 100px;
  background-size: cover;
  background-position: 50% 50%;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  transition: all $timing ease-in-out;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -13px;
    margin-left: -13px;
    opacity: 0;
    color: #fff;
    font-family: 'Bootstrap-icons', serif;
    font-size: 26px;
    content: '\F52A';
    pointer-events: none;
    z-index: 9000;
    transition: all $timing ease-in-out;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    cursor: pointer;
    pointer-events: none;
    transition: all $timing ease-in-out;
  }

  &:hover {
    z-index: 3;

    &::before {
      animation: fly-in $timing forwards;
    }

    &::after {
      opacity: 1;
    }
  }
}

@keyframes fly-in {
  from {
    opacity: 0;
    left: 100%;
    transform: scale(5) rotate(-360deg);
  }
  to {
    opacity: 1;
    left: 50%;
    transform: scale(1) rotate(0);
  }
}

.tooltip-wrapper {
  display: inline-block;
}

.tooltip-wrapper.disabled {
  cursor: not-allowed;
}

.btn {
  position: relative;
}
</style>
