<template>
  <section id="about" class="section about">
    <div class="container">

      <div class="section-title aos-init aos-animate" data-aos="zoom-out">
        <h2>About</h2>
        <p>Who we are</p>
      </div>

      <div class="row content aos-init aos-animate" data-aos="fade-up">
        <div class="col-lg-6">
          <p class="text-justify">
            Hadithi is a research project started in 2022 with the goal to collect data about the history of the
            different tribes in Africa. Africa is home to different cultures and customs which are passed down through
            storytelling. Our Aim will be to capture these stories that have been told by our elders and compile them
            for easy access to the world.
          </p>
          <p class="text-justify">
            Starting in Kenya, on Africa's East coast, we are tracing the unwritten stories and tribal teachings from
            the roots of our ancestral past. African Stories are told by elders, boys were known to be taught by the
            older men while girls were taught by their mothers and grandmothers.
          </p>
          <p class="text-justify">
            As we proceed with this project., we are also opening the channels and creating platforms for people to
            share
            and educate us on their different cultures. We welcome you to share those stories, customs, and rites of
            passage that are observed or have been shared with you. Please feel free to write to us and we will share
            this
            with our readers.
          </p>
          <p class="text-justify">
            We compile these texts into three major categories:
          </p>
          <ul>
            <li><em class="bi-check2-circle"></em> Stories</li>
            <li><em class="bi-check2-circle"></em> Books</li>
            <li><em class="bi-check2-circle"></em> Journals</li>
          </ul>
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0">
          <map-composition />
<!--          <img src="../../assets/african-regions.svg" alt="Major groups in Africa by region">-->
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import MapComposition from "@/components/sections/MapComposition";
export default {
  name: 'SectionAbout',
  components: {MapComposition},
}
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.text-justify {
  text-align: justify;
}

.about {
  padding-top: 80px;
  margin-top: -1px;

  .content {
    h3 {
      font-weight: 600;
      font-size: 26px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding-left: 38px;
        position: relative;

        + li {
          margin-top: 10px;
        }
      }

      i {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 28px;
        color: $orange;
        line-height: 1;
      }
    }

    p:last-child {
      margin-bottom: 0;
    }
  }
}

</style>
