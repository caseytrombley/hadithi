<template>
  <section
      id="callout"
      class="section callout"
      :style="{
        'background-image': `linear-gradient(0deg, rgba(0, 0, 0, .9) 0%, rgba(33, 33, 33, .9) 100%), url(${heroBackground})`
      }"
  >
    <div class="container">

      <div class="row aos-init aos-animate" data-aos="zoom-out">
        <div class="col-lg-9 text-center text-lg-start">

          <p>
            The stories and rich history of tribal life paints a fascinating and previously unseen picture of Africa.
          </p>
        </div>
        <div class="col-lg-3 callout-btn-container text-center">

          <base-button
              @click.native="navigateToPage('Stories')"
              solid
          >
            Read Stories
          </base-button>

        </div>
      </div>

    </div>
  </section>
</template>

<script>
import bgImage from '/public/img/lee-pigott-OJ4m4_yIgjY-unsplash.jpg';
import BaseButton from "@/components/base/BaseButton";

export default {
  name: 'SectionCallout',
  components: {BaseButton},
  data() {
    return {
      heroBackground: bgImage,
    }
  },
  methods: {
    navigateToPage(name) {
      console.log('clicked')
      this.$router.push({ name: name});
    },
  }
}
</script>

<style lang="scss" scoped>
.callout {
  padding: 80px 0;
  background: #2a2c39 url('/public/img/lee-pigott-OJ4m4_yIgjY-unsplash.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  h3 {
    color: $white;
    font-size: 28px;
    font-weight: 700;
  }

  p {
    font-size: 1.25rem;
    color: $white;
  }

  .callout-btn-container {
    text-align: center;

    button {
      vertical-align: middle;
    }
  }
}

@media (max-width: 1024px) {
  .callout {
    background-attachment: scroll;
  }
}

@media (min-width: 768px) {
  .callout .callout-btn-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>