import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import AccountsService from "@/services/AccountsService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    logged: false,
    noteID: "",
    recentNotes: [],
    readNote: {},
    ownNotes: [],
    galleryItems: [],
    subscribed: false,
    subscription: {},
    userDetails: {},
    userPermissions: {},
    defaultPermissions: {},
    currentItem: {},
    updateWork: 0,
    playing: null
  },
  plugins: [createPersistedState()],
  mutations: {
    setCurrentItem(state, currentItem) {
      this.state.currentItem = currentItem;
    },
    setUserDetails(state, userDetails) {
      this.state.userDetails = userDetails;
    },
    setUserPermissions(state, permissions) {
      this.state.userPermissions = permissions;
    },
    setDefaultPermissions(state, permissions) {
      this.state.defaultPermissions = permissions;
    },
    setGoogleToken(state, token) {
      this.state.token = token;
    },
    setLogged(state, logged) {
      this.state.logged = logged;
    },
    setCurrentNote(state, noteID) {
      this.state.noteID = noteID;
    },
    addOwnNote(state, note) {
      this.state.ownNotes.push(note);
    },
    addRecentNote(state, note) {
      this.state.recentNotes.push(note);
    },
    resetNotes(state, notes = []) {
      this.state.recentNotes = notes;
    },
    resetOwnNotes(state, notes = []) {
      this.state.ownNotes = notes;
    },
    setCurrentReadNote(state, note) {
      this.state.readNote = note;
    },
    setGalleryItems(state, galleryItems) {
      this.state.galleryItems = galleryItems;
    },
    setSubscribed(state, subscribed) {
      this.state.subscribed = subscribed;
    },
    setSubscription(state, subscription) {
      this.state.subscription = subscription;
    },
    setUpdateWork(state, updateNumber) {
      this.state.updateWork += updateNumber;
    },
    setPlaying(state, playing) {
      this.state.playing = playing;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getUpdateWork(state) {
      return state.updateWork;
    },
    getCurrentItem(state) {
      return state.currentItem;
    },
    loggedIn(state) {
      const isLogged = state.logged;
      const currentTime = new Date().toISOString();
      const accessToken = localStorage.getItem("access_token") || false;
      const accessTokenExpiryTime = localStorage.getItem("access_token_expiry_time") || currentTime;
      const isValidToken = (accessTokenExpiryTime > currentTime);
      const hasToken = (accessToken.length > 0);

      state.logged = (isLogged && hasToken && isValidToken);
      if(!state.logged){
        state.userPermissions = state.defaultPermissions;
        state.subscription = {};
      }
      return state.logged;
    },
    getOwnNotes(state) {
      return state.ownNotes || [];
    },
    getRecentNotes(state) {
      return state.recentNotes || [];
    },
    getReadNote(state) {
      return state.readNote || {};
    },
    getGalleryItems(state) {
      return state.galleryItems;
    },
    isSubscribed(state) {
      return state.subscribed;
    },
    getSubscription(state) {
      return state.subscription;
    },
    getUserPermissions(state) {
      return { ...state.defaultPermissions, ...state.userPermissions };
    },
    getDefaultPermissions() {
      return AccountsService.getDefaultAccountPermissions();
    },
    getUserDetails(state) {
      return state.userDetails;
    },
    getPlaying(state) {
      return state.playing;
    }
  }
});
