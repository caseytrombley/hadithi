<template>
  <footer id="footer">
    <div class="container">
      <div class="row">
        <div class="left-column col-md-6">
          <nav-list class="nav flex-column" />
          <div class="credits">
            <ul class="nav flex-column">
              <li v-for="(document, index) in documents" :key="index">
                <a
                    class="nav-link"
                    :href="document.link"
                    target="_blank"
                >
                  {{ document.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="right-column col-md-6">
          <div>
            <div class="logo">
              <a href="/">
                <img src="../assets/logo.svg" alt="Hadithi">
              </a>
            </div>
            <p class="tagline">The story of Africa.</p>
          </div>
          <div class="social-links">
            <social-sharing :share-content="shareContent" :show-name="false" />
          </div>
        </div>
      </div>

    </div>
    <div class="copyright">
      <div class="container">
        &copy; Copyright {{ year }} <strong><span>{{ company.name }}</span></strong>. All Rights Reserved

      </div>
    </div>
  </footer>
</template>
<script>
import SocialSharing from "@/components/SocialSharing";
import NavList from "@/components/NavList";

export default {
  name: "MainFooter",
  components: {
    NavList,
    SocialSharing
  },
  data() {
    return {
      year: new Date().getFullYear(),
      company: {
        name: "Thome Legacy Technologies",
        website: "https://thometechnology.web.app/",
      },
      documents: [
        {
          name: "Terms of Use",
          link: "/legal/terms-of-use.pdf",
        },
        {
          name: "Privacy Policy",
          link: "/legal/privacy-policy.pdf",
        },
      ],
      shareContent: {
        url: 'https://hadithi.co/',
        title: 'Hadithi - The stories of Africa',
        description: 'Hadithi is a research project to collect data about the history of different tribes in Africa.',
        quote: 'The stories of Africa',
        hashtags: 'africa, tribes, storytelling'
      }
    };
  }
};
</script>
<style lang="scss" scoped>
//@import "@/scss/_variables.scss";
#footer {
  overflow: hidden;
  position: relative;
  margin-top: auto;
  padding: 2rem 0 0;
  background: #14151c;
  color: $white;
  font-size: 14px;
  text-align: center;

  h3 {
    font-size: 36px;
    font-weight: 700;
    color: $white;
    position: relative;
    padding: 0;
    margin: 0 0 15px 0;
  }

  p {
    font-size: 15px;
    font-style: italic;
    padding: 0;
    margin: 0 0 40px 0;
  }

  .left-column {
    padding-bottom: 2rem;

    @media (min-width: 768px) {
      padding-bottom: 0;
    }
  }

  .right-column {
    @media (min-width: 768px) {
      display: grid;
      text-align: right;
    }
  }

  .logo {
    img {
      display: inline-block;
      margin: 0 auto;
      height: 1rem;

      @media (min-width: 768px) {
        height: 1.8rem;
      }
    }
  }

  .tagline {
    margin-top: 5px;
  }

  .social-links {
    margin-top: auto;

    a {
      font-size: 18px;
      display: inline-block;
      background: $orange;
      color: $white;
      line-height: 1;
      padding: 8px 0;
      margin-right: 4px;
      border-radius: 50%;
      text-align: center;
      width: 36px;
      height: 36px;
      transition: 0.3s;

      &:hover {
        background: #bd5102;
        color: $white;
        text-decoration: none;
      }
    }
  }

  .copyright {
    margin: 2rem 0 0;
    padding: 1rem;
    color: rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.025);

    @media (min-width: 768px) {
      padding: 2rem;
    }
  }
}

.credits {
  li {
    position: relative;
    width: max-content;
  }
  a {
    color: $white;
  }
}

.nav,
.nav ::v-deep {

  @media (max-width: 767px) {
    li {
      margin: 0 auto .5rem;
      width: 100%;
    }

    a {
      background: rgba(255,255,255,0.025);
    }
  }
}

</style>
