<!--suppress ALL -->
<template>
  <header id="header" class="fixed-top d-flex align-items-center header-transparent">
    <div class="container-xl d-flex align-items-center justify-content-between">
      <div class="logo">
        <a href="/">
          <img src="../assets/logo.svg" alt="Hadithi">
        </a>
      </div>
      <nav id="navbar" class="navbar" :class="{'navbar-mobile': isActive}">
        <nav-list  />
        <em class="bi mobile-nav-toggle" :class="[isActive ? 'bi-x' : 'bi-list']" @click="toggleMobileNav"></em>
      </nav>
    </div>
  </header>
</template>

<script>
import NavList from "@/components/NavList";
import ImagesService from "../services/ImagesService";

export default {
  name: "Header",
  components: {
    NavList,
  },
  data() {
    return {
      isActive: false,
      displayName:
          this.getAvatarLetters(localStorage.getItem("displayName")) || "OO",
    };
  },
  watch: {
    $route(to, from) {
      this.isActive = false;
    }
  },
  async mounted() {
    await this.getGalleryItems();
  },
  methods: {
    toggleMobileNav() {
      this.isActive = !this.isActive;
    },
    getAvatarLetters() {
      try {
        let names = localStorage.getItem("displayName").split(" ");
        names[0].substring(0, 1).toUpperCase();
        return (
            names[0].substring(0, 1).toUpperCase() +
            names[1].substring(0, 1).toUpperCase()
        );
      } catch (e) {
        return "OO";
      }
    },
    async getGalleryItems() {
      const images = await ImagesService.getImages();
      this.$store.commit("setGalleryItems", images);
    },
  },
};
</script>
<style scoped lang="scss">
#header {
  height: 70px;
  transition: all 0.5s;
  z-index: 997;
  background: rgba(0, 0, 0, 0.9);

  .logo {
    img {
      height: 23px;

      @media (min-width: 768px) {
        height: 26px;
      }
    }
  }
}

.d-flex {
  display: flex !important;
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

.align-items-center {
  align-items: center !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.navbar:not(.navbar-mobile) {
  padding: 0;

  ::v-deep {
    a i, a:focus i {
      font-size: 12px;
      line-height: 0;
      margin-left: 5px;
    }

    .admin-dropdown {
      left: auto;
      right: 0;
    }
  }
}

.navbar-mobile {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(20, 21, 28, 0.9);
  transition: 0.3s;
  z-index: 999;

  ::v-deep {
    a:hover,
    .active,
    li:hover > a {
      color: $white;
    }

    a,
    a:focus {
      padding: 10px 20px;
      margin: 5px;
      font-size: 15px;
      color: #2a2c39;
    }
  }
}

.mobile-nav-toggle {
  color: $white;
  font-size: 28px;
  cursor: pointer;
  display: none;
  line-height: 0;
  transition: 0.5s;
}

@media (max-width: 991px) {
  .navbar ul {
    display: none;
  }
}

.navbar-mobile ul {
  display: block;
  position: absolute;
  top: 55px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  padding: 10px 0;
  border-radius: 10px;
  background-color: $white;
  overflow-y: auto;
  transition: 0.3s;
}

@media (max-width: 991px) {
  .mobile-nav-toggle {
    display: block;
  }
}

.navbar-mobile .mobile-nav-toggle {
  position: absolute;
  top: 15px;
  right: 15px;
}

.bi-list::before {
  content: "\f479";
}

.bi::before, [class^="bi-"]::before, [class*=" bi-"]::before {
  display: inline-block;
  font-family: bootstrap-icons, sans-serif !important;
  font-style: normal;
  font-weight: normal !important;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: -0.125em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
