<template>
  <div
      id="app"
      class="d-flex flex-column min-vh-100"
      :class="[{scrolled: scrollPosition > 0}, routeName]"
  >
    <main-navigation />
    <router-view class="main-content" />
    <background-player
        v-if="playing"
        :item="playing"
        @close="handleClose"
    />
    <main-footer />
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import MainNavigation from "./components/MainNavigation";
import MainFooter from "./components/MainFooter";
import BackgroundPlayer from "@/components/BackgroundPlayer";

export default {
  data() {
    return {
      scrollPosition: null
    }
  },
  components: {
    MainNavigation,
    MainFooter,
    BackgroundPlayer
  },
  watch: {
    $route() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    ...mapGetters({
      playing: 'getPlaying'
    }),
    routeName() {
      return this.$route.name.toLowerCase();
    }
  },
  methods: {
    handleClose(){
      this.$store.commit('setPlaying', null);
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  },
  mounted(){
    window.addEventListener('scroll', this.updateScroll);
  }
};
</script>
<style lang="scss">
@import "@/scss/_variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap');

html, body {
  font-family: 'Noto Serif', serif;
  scroll-behavior: smooth;
}

*, ::after, ::before {
  box-sizing: border-box;
}

body {
  &.modal-open {
    overflow: hidden;
  }
}

#app {
  font-family: 'Noto Serif', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}

button {
  font-family: Arial, sans-serif;
}

.nav {
  position: relative;

  li {
    position: relative;
    width: max-content;
  }

  a {
    color: $white;
    text-decoration: none;

    &:hover {
      color: $white;
    }
  }

  a, a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 5px;
    font-size: 14px;
    color: $white;
    white-space: nowrap;
    transition: 0.3s;
    border-radius: 50px;
    cursor: pointer;
  }

  a i, a:focus i {
    font-size: 12px;
    line-height: 0;
    margin-left: 5px;
  }

  a:hover,
  .active,
  .active:focus,
  li:hover > a {
    background: $orange;
  }

  .nav-link {
    display: block;
    padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
    text-decoration: none;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
  }
}

.nav-tabs {
  .nav-link {
    color: $text-primary;
    font-size: 1rem !important;
    border-radius: 0 !important;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;

    &.active {
      font-size: 1rem !important;
    }
  }
}

.main-content {
  padding-top: 70px;
}

.home,
.podcasts {
  .main-content {
    padding-top: 0;
  }
  #header {
    background: transparent;
  }
  &.scrolled {
    #header {
      background: rgba(0, 0, 0, 0.9);
    }
  }
}


.section {
  padding: 60px 0;
  overflow: hidden;
}

.section-title {
  padding-bottom: 40px;
}

.section-title h2 {
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  line-height: 1px;
  margin: 0 0 5px 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: left;
  color: #aaaaaa;
  font-family: "Poppins", sans-serif;
}

.section-title h2::after {
  content: "";
  width: 120px;
  height: 1px;
  display: inline-block;
  background: #fd9042;
  margin: 4px 10px;
}

.section-title p {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  color: #2a2c39;

  @include breakpoint-md {
    font-size: 36px;
  }
}

.section-dark {
  padding: 2rem 0;
  background: $tan;
  color: rgba(255,255,255,.85);

  h3 {
    display: grid;
    grid-template-columns: minmax(50px, 1fr) auto minmax(50px, 1fr);
    align-items: center;
    text-align: center;
    gap: 30px;

    &::before, &::after {
      content: '';
      border-top: 10px double;
      border-color: rgba(255,255,255,0.1);
    }

  }
}

.theme-dark {
  .section-title p {
    color: #ffffff;
  }
}

.page {
  margin: 2rem 0 0;
}

//modals
.modal-backdrop {
  opacity: 0.7 !important;
}

.modal-content {
  background: transparent !important;
}

.close-x {
  position: absolute;
  background: none;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #050404;
}

.modal-main {
  padding: 1.5rem 1.5rem 3.5rem !important;
  background: #ffffff;

  @media (max-width: 767px) {
    padding: 1rem 1rem 3rem !important;
  }

  .close-x {
    right: 20px;
    bottom: 20px;

    @media (min-width: 768px) {
      color: #ffffff;
      left: -50px;
      right: auto;
      bottom: auto;
    }
  }
}

.modal-info {
  padding: 1.5rem 1.5rem 3.5rem !important;
  background: #ffffff;
  color: $tan;
  border-radius: 0;

  .close-x {
    color: #000000;
    right: 20px;
    bottom: 20px;
  }

  h3 {
    margin: 0 auto 1rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5 {
    font-size: 1rem;
    font-weight: 400;
  }

  p {
    font-size: .75rem;
    font-weight: 300;
  }
}

.modal-image-header {
  display: block;
  min-height: 200px;
  margin: .5rem -1.5rem 0 -1.5rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.modal-info-details {
  background: #f3f3f3;
  margin: 0 -1.5rem 0 -1.5rem;
  padding: 1.5rem;

  > div {
    margin: 0 0 1.5rem;

    &:last-child {
      margin: 0;
    }
  }
}

.modal-share {
  padding: 1.5rem 1.5rem 3.5rem !important;
  background: #000000;
  color: #ffffff;
  border-radius: 0;
  text-align: center;

  .close-x {
    color: #ffffff;
    right: 20px;
    bottom: 20px;
  }

  h3 {
    margin-top: 0;
    color: #ffffff;
    font-size: 1.25rem;

    @media (min-width: 768px) {
      font-size: 1.375rem;
    }
  }

  h5 {
    font-size: .875rem;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  p {
    font-size: 0.875rem;
    color: #aca2a2;
    background: rgba(255,255,255,.075);
    padding: 1rem;
    border-radius: 5px;
    margin: 1rem auto;
  }
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 0;

  > div {
    position: relative;
  }

  @media (min-width: 768px) {
    padding: 1.5rem 0;
  }

  &.responsive {
    display: block;

    > div {
      margin: 0 0 .5rem;
    }

    @media (min-width: 768px) {
      display: flex;
      justify-content: space-between;

      > div {
        margin: 0;
      }
    }
  }

  p {
    position: relative;
    color: #a3a0a0;
    font-size: .875rem;

    @media (min-width: 768px) {
      font-size: 1rem;
      background: #ddf2fc;
      color: #2466a9;
      padding: 0.5rem;
      border-radius: 8px;
      margin: 0;
      font-weight: 500;

      &::before {
        position: absolute;
        content: 'name:';
        top: -1.25rem;
        font-size: .75em;
        font-weight: 300;
      }
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;

    [variant] {
      margin: 0 .5rem 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }

}

.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}

.sr-only-focusable:focus,
.sr-only-focusable:active {
  clip: auto !important;
  -webkit-clip-path: none !important;
  clip-path: none !important;
  height: auto !important;
  margin: auto !important;
  overflow: visible !important;
  width: auto !important;
  white-space: normal !important;
}


</style>
