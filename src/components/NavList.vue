<!--suppress ALL -->
<template>
  <ul class="nav">
    <li @click="navigateToPage('Stories')" class="nav-item">
      <a class="nav-link">
        Stories
      </a>
    </li>
    <li class="nav-item dropdown">
      <a id="navbarDropdown" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
         aria-expanded="false">
        <span>Journals</span> <em class="bi bi-chevron-down"></em>
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li v-for="journalType in journalTypes" :key="journalType">
          <a @click="navigateToPage('JournalsByType', { type: journalType })">
            {{ journalType }} Paper
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>
        <li class="bg-gray">
          <a @click="navigateToPage('Journals')">
            Show all
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a @click="navigateToPage('GalleryView')" class="nav-link">
        Gallery
      </a>
    </li>
    <li>
      <a @click="navigateToPage('Books')" class="nav-link">
        Books
      </a>
    </li>
    <li>
      <a @click="navigateToPage('Resources')" class="nav-link">
        Resources
      </a>
    </li>
    <li>
      <a @click="navigateToPage('Podcasts')" class="nav-link">
        Podcasts
      </a>
    </li>
    <li>
      <a @click="navigateToPage('Pricing')" class="nav-link">
        Pricing
      </a>
    </li>
    <li class="nav-item dropdown" v-if="loggedIn">
      <a id="adminDropdown" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
         aria-expanded="false">
        <span>Admin</span> <em class="bi bi-chevron-down"></em>
      </a>
      <ul class="dropdown-menu admin-dropdown" aria-labelledby="adminDropdown">
        <li>
          <a @click="navigateToPage('AddStory')" v-if="permissions.CAN_WRITE_STORY">
            Add story
          </a>
        </li>
        <li>
          <a @click="navigateToPage('AddJournal')">
            Add journal
          </a>
        </li>
        <li>
          <a @click="navigateToPage('AddGallery')">
            Add images
          </a>
        </li>
        <li>
          <a @click="navigateToPage('AddBook')">
            Add book
          </a>
        </li>
        <li>
          <a @click="navigateToPage('AddResource')">
            Add resource
          </a>
        </li>
        <li>
          <a @click="navigateToPage('AddPodcast')">
            Add podcast
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>
        <li>
          <a @click="navigateToPage('MyProfile')">
            My profile
          </a>
        </li>
        <li>
          <a @click="navigateToPage('MySubscription')">
            My subscription
          </a>
        </li>
        <li>
          <a @click="navigateToPage('MyStories')" v-if="permissions.CAN_PUBLISH_STORY">
            My stories
          </a>
        </li>
        <li>
          <a @click="navigateToPage('MyJournals')">
            My journals
          </a>
        </li>
        <li>
          <a @click="navigateToPage('MyGallery')">
            My images
          </a>
        </li>
        <li>
          <a @click="navigateToPage('MyBooks')">
            My books
          </a>
        </li>
        <li>
          <a @click="navigateToPage('MyResources')">
            My resources
          </a>
        </li>
        <li>
          <a @click="navigateToPage('MyPodcasts')">
            My podcasts
          </a>
        </li>
        <li>
          <hr v-if="permissions.CAN_ASSIGN_USER_ROLE || permissions.IS_EMPLOYEE" class="dropdown-divider"/>
        </li>
        <li>
          <a @click="navigateToPage('UserManagement')" v-if="permissions.CAN_ASSIGN_USER_ROLE">
            User Management
          </a>
        </li>
        <li>
          <a @click="navigateToPage('WorkManagement')" v-if="permissions.IS_EMPLOYEE">
            Work Management
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>
        <li>
          <a @click="signOut">
            Sign Out
          </a>
        </li>
      </ul>
    </li>
    <li v-if="!loggedIn">
      <a @click="navigateToPage('Members')" class="nav-link">
        Sign In
      </a>
    </li>
  </ul>
</template>

<script>
import {mapGetters} from "vuex";
import AccountsService from "@/services/AccountsService";
import JournalService from "@/services/JournalsService";

export default {
  name: "NavList",
  computed: {
    ...mapGetters({
      loggedIn: "loggedIn",
      currentUser: "getUserDetails",
      permissions: "getUserPermissions"
    }),
  },
  data() {
    return {
      journalTypes: []
    };
  },
  async mounted() {
    this.journalTypes = await JournalService.getJournalTypes();
  },
  methods: {
    navigateToPage(name, params = {}) {
      this.$router.push({name: name, params: params});
    },
    async signOut() {
      this.$store.commit("setLogged", false);
      this.$store.commit("setSubscribed", false);
      this.$store.commit("setSubscription", {});
      this.$store.commit("setUserPermissions", this.$store.state.defaultPermissions);

      localStorage.clear();
      this.$router.push({name: "Home"});
    },
  },
};
</script>
<style scoped lang="scss">

.dropdown ul {
  display: block;
  position: absolute;
  left: 5px;
  top: calc(100% + 30px);
  margin: 5px 0 0 0;
  padding: 10px 0;
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  background: $white;
  box-shadow: 0px 0px 30px rgb(127 137 161 / 25%);
  transition: 0.3s;
  border-radius: 15px;

  &.align-right {
    left: auto;
    right: 0;
  }
}

.dropdown:hover > ul {
  opacity: 1;
  top: 100%;
  visibility: visible;
}

.dropdown ul li {
  min-width: 200px;
}

.dropdown ul a {
  padding: 10px 20px;
  color: #2a2c39;
  margin: 0 5px;
  font-size: 14px;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown ul a:hover,
.dropdown ul .active:hover,
.dropdown ul li:hover > a {
  color: $white;
}

.dropdown, .dropdown-center, .dropend, .dropstart, .dropup, .dropup-center {
  position: relative;
}

.bi {
  margin-left: 3px;
}

.bi-list::before {
  content: "\f479";
}

.bi::before, [class^="bi-"]::before, [class*=" bi-"]::before {
  display: inline-block;
  font-family: bootstrap-icons !important;
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
