<template>
  <section
      id="hero"
      class="section d-flex flex-column justify-content-end align-items-center"
      :style="{
        'background-image': `linear-gradient(0deg, rgba(0, 0, 0, .9) 0%, rgba(33, 33, 33, .9) 100%), url(${heroBackground})`
      }"
  >
    <div
        id="heroCarousel"
        class="container carousel carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
    >

      <div class="carousel-inner">
        <!-- Slide 1 -->
        <div class="carousel-item active">
          <div class="carousel-container">
            <h2 class="animate__animated animate__fadeInDown">Welcome to <span>Hadithi</span></h2>
            <p class="animate__animated animate__fadeInUp">
              Hadithi is a research project to collect data about the history of different tribes in Africa.
              Starting in Kenya, we are tracing the unwritten stories and tribal teachings from the roots of our ancestral past.
            </p>

            <base-button
                is-link
                href="#about"
                class="animate__animated animate__fadeInUp scrollto"
            >
              Read More
            </base-button>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel-item">
          <div class="carousel-container">
            <h2 class="animate__animated animate__fadeInDown">Africa has over 2,000 languages</h2>
            <p class="animate__animated animate__fadeInUp">
              Before the 19th century, Africa was split up into 10,000 different groups or states, each adapting their own unique language.
              Today there are 100's of language spoken across each major region of Africa.

            </p>
            <base-button
                is-link
                href="#about"
                class="animate__animated animate__fadeInUp scrollto"
            >
              Read More
            </base-button>
          </div>
        </div>


        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
        </a>

        <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
        </a>
      </div>

    </div>

    <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
      <defs>
        <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
        </path></defs>
      <g class="wave1">
        <use xlink:href="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)">
        </use></g>
      <g class="wave2">
        <use xlink:href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)">
        </use></g>
      <g class="wave3">
        <use xlink:href="#wave-path" x="50" y="9" fill="#fff">
        </use></g>
    </svg>

  </section>
</template>

<script>
import bgImage from '/public/img/caleb-toranzo-xD8DPNDYG6E-unsplash.jpg';
import BaseButton from "@/components/base/BaseButton";

export default {
  name: 'Hero',
  components: {BaseButton},
  data() {
    return {
      heroBackground: bgImage,
    }
  }
}
</script>

<style lang="scss" scoped>
#hero {
  position: relative;
  padding: 0;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(33, 33, 33, .5) 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

#hero .carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  height: 70vh;
  padding-top: 60px;
}

#hero h2 {
  color: $white;
  margin-bottom: 30px;
  font-size: 48px;
  font-weight: 700;
}

#hero p {
  width: 80%;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
  margin: 0 auto 30px auto;
  color: $white;
}

#hero .carousel-control-prev,
#hero .carousel-control-next {
  width: 10%;
}

#hero .carousel-control-next-icon,
#hero .carousel-control-prev-icon {
  background: none;
  font-size: 48px;
  line-height: 1;
  width: auto;
  height: auto;
}

#hero .btn-get-started {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 32px;
  border-radius: 50px;
  transition: 0.5s;
  line-height: 1;
  margin: 10px;
  color: $white;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
  border: 2px solid $orange;
  text-decoration: none;
}

#hero .btn-get-started:hover {
  background: $orange;
  color: $white;
  text-decoration: none;
}

@media (min-width: 1024px) {
  #hero p {
    width: 60%;
  }

  #hero .carousel-control-prev,
  #hero .carousel-control-next {
    width: 5%;
  }
}

@media (max-width: 768px) {
  #hero .carousel-container {
    height: 90vh;
  }

  #hero h2 {
    font-size: 28px;
  }
}

.hero-waves {
  display: block;
  width: 100%;
  height: 60px;
  position: relative;
}

.wave1 use {
  -webkit-animation: move-forever1 10s linear infinite;
  animation: move-forever1 10s linear infinite;
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
}

.wave2 use {
  -webkit-animation: move-forever2 8s linear infinite;
  animation: move-forever2 8s linear infinite;
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
}

.wave3 use {
  -webkit-animation: move-forever3 6s linear infinite;
  animation: move-forever3 6s linear infinite;
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
}

@-webkit-keyframes move-forever1 {
  0% {
    transform: translate(85px, 0%);
  }

  100% {
    transform: translate(-90px, 0%);
  }
}

@keyframes move-forever1 {
  0% {
    transform: translate(85px, 0%);
  }

  100% {
    transform: translate(-90px, 0%);
  }
}

@-webkit-keyframes move-forever2 {
  0% {
    transform: translate(-90px, 0%);
  }

  100% {
    transform: translate(85px, 0%);
  }
}

@keyframes move-forever2 {
  0% {
    transform: translate(-90px, 0%);
  }

  100% {
    transform: translate(85px, 0%);
  }
}

@-webkit-keyframes move-forever3 {
  0% {
    transform: translate(-90px, 0%);
  }

  100% {
    transform: translate(85px, 0%);
  }
}

@keyframes move-forever3 {
  0% {
    transform: translate(-90px, 0%);
  }

  100% {
    transform: translate(85px, 0%);
  }
}

</style>