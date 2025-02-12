<template>
  <section
      class="section page-hero"
      :class="{'page-view': pageView}"
      :style="{
        'background-image': `linear-gradient(0deg, rgba(0, 0, 0, .9) 0%, rgba(33, 33, 33, .9) 100%), url(${getBackgroundImage})`
      }"
  >
    <b-container>

      <div class="page-nav">
        <slot name="nav" />
      </div>

      <div class="row aos-init aos-animate" data-aos="zoom-out">

        <h2 class="page-title animate__animated animate__fadeInDown">
          <slot name="title" />
        </h2>

      </div>

      <div class="page-section animate__animated animate__fadeInLeft">
        <slot name="section" />
      </div>

      <p class="page-text animate__animated animate__fadeInLeft">
        <slot name="text" />
      </p>

      <div class="animate__animated animate__fadeInUp">
        <slot name="cta" />
      </div>

      <div class="col-12 ">

        <slot name="search" />

      </div>

    </b-container>
  </section>
</template>

<script>
import bgImage from '/public/img/lee-pigott-OJ4m4_yIgjY-unsplash.jpg';
import bgImage2 from '/public/img/david-clode-WLig6zy_lKw-unsplash.jpg';

export default {
  name: 'PageHero',
  props: {
    pageView: {
      type: Boolean,
      default: null
    },
    theme: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultBackground: bgImage,
      leopardBackground: bgImage2,
    }
  },
  computed: {
    getBackgroundImage() {
      if (this.theme === 'leopard') {
        return this.leopardBackground;
      } else {
        return this.defaultBackground;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-hero {
  padding: 110px 0 80px;
  color: #ffffff;
  background-color: #2a2c39;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  &.page-view {
    padding: 30px 0;
  }

  @media (min-width: 576px) {
    padding: 180px 0 150px;
  }
  @media (min-width: 768px) {
    padding: 200px 0 150px;
  }
}

.page-title {
  font-size: 26px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
}

.page-text {
  //font-family: "Raleway", Arial, sans-serif;
  font-size: .85rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
}

.page-nav {
  ::v-deep {
    button {
      border: 1px solid $orange;
      color: $orange;
    }
  }
}

@media (max-width: 1024px) {
  .page-hero {
    background-attachment: scroll;
  }
}

</style>