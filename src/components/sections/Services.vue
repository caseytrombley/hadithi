<template>
  <section id="services" class="section services">
    <div class="container">

      <div class="section-title aos-init aos-animate" data-aos="zoom-out">
        <h2>Services</h2>
        <p>What we offer</p>
      </div>

      <div class="row">
        <div class="col-lg-4 col-md-12">
          <div class="icon-box aos-init aos-animate" data-aos="zoom-in-left">
            <h4 class="title"><a href="">Stories</a></h4>
            <p class="description">
              Translated from ritualistic narratives, our stories are alive with the rich history of tribalism in Africa.
            </p>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="icon-box aos-init aos-animate" data-aos="zoom-in-left" data-aos-delay="100">
            <h4 class="title"><a href="">Journals</a></h4>
            <p class="description">
              Peer reviewed research publications written by experts.
              Our journals are among the top for academic or technical study in African antiquity.
            </p>
          </div>
        </div>

        <div class="col-lg-4 col-md-12">
          <div class="icon-box aos-init aos-animate" data-aos="zoom-in-left" data-aos-delay="200">
            <h4 class="title"><a href="">Books</a></h4>
            <p class="description">
              Digital transcribed versions of African books, including many unique and hard-to-find books that are out of print.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionServices',
}
</script>

<style lang="scss" scoped>
.services {
  [class^='col-'] {
    margin-top: 1rem;

    @media (min-width: 992px) {
      margin-top: 0;
    }
  }

  .icon-box {
    padding: 30px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    background: $white;
    box-shadow: 0 2px 29px 0 rgba(68, 88, 144, 0.12);
    transition: all 0.4s ease-in-out;
    width: 100%;
    height: 100%;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 2px 35px 0 rgba(68, 88, 144, 0.2);
    }
  }

  .icon {
    position: absolute;
    left: -20px;
    top: calc(50% - 30px);

    i {
      font-size: 64px;
      line-height: 1;
      transition: 0.5s;
    }
  }

  .title {
    font-weight: 700;
    margin-bottom: 15px;
    font-size: 1.25rem;

    a {
      color: #2a2c39;
      text-decoration: none;
      transition: ease-in-out 0.3s;

      &:hover {
        color: $orange;
      }
    }
  }

  .description {
    font-size: 1rem;
    line-height: 24px;
    margin-bottom: 0;
  }
}

</style>