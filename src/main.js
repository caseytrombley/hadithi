import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Toast, {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSocialSharing from "vue-social-sharing";
import VueHtmlToPaper from "vue-html-to-paper";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VueLazyload from "vue-lazyload";
import VueLazyBackgroundImage from 'vue-lazy-background-images/VueLazyBackgroundImage';
Vue.component('lazy-background', VueLazyBackgroundImage);

const quillToolBarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{list: "ordered"}, {list: "bullet"}],
    [{script: "sub"}, {script: "super"}],
    [{indent: "-1"}, {indent: "+1"}],
    [{color: []}, {background: []}],
    [{align: []}],
    ["link"],
    ["image"],
    ["clean"],
];
const quillOptions = {
    debug: "error",
    placeholder: "Start writing...",
    readOnly: false,
    theme: "snow",
    formats: {
        font: true,
    },
    modules: {
        toolbar: quillToolBarOptions,
    },
};
const toastOptions = {
    timeout: 2000,
    position: POSITION.TOP_CENTER,
};

Vue.filter('trimString', function (string, num) {
    const length = num || 140;
    return string.length > length ? string.substring(0, length) + "..." : string;
})

Vue.use(BootstrapVue, {});
Vue.use(IconsPlugin, {});
Vue.use(Toast, toastOptions);
Vue.use(VueQuillEditor, quillOptions);
Vue.use(VueSocialSharing);
Vue.use(VueHtmlToPaper);
Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: function (h) {
        return h(App);
    },
    mounted() {
        AOS.init()
    },
}).$mount("#app");
