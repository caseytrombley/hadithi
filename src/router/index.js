import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import store from "../store";

import Home from "@/views/Home";
import Stories from "@/views/stories/Stories";
import ReadStory from "@/views/stories/ReadStory";
import AddStory from "@/views/stories/AddStory";
import EditStory from "@/views/stories/EditStory";
import MyStories from "@/views/stories/MyStories";

import Journals from "@/views/journals/Journals";
import ReadJournal from "@/views/journals/ReadJournal";
import AddJournal from "@/views/journals/AddJournal";
import EditJournal from "@/views/journals/EditJournal";
import MyJournals from "@/views/journals/MyJournals";

import GalleryView from "@/views/gallery/GalleryView";
import GallerySlider from "@/views/gallery/GallerySlider";
import AddGallery from "@/views/gallery/AddGallery";
import EditGallery from "@/views/gallery/EditGallery";
import MyGallery from "@/views/gallery/MyGallery";
import PhotoView from "@/views/gallery/PhotoView.vue";

import Books from "@/views/books/Books";
import ReadBook from "@/views/books/ReadBook";
import AddBook from "@/views/books/AddBook";
import EditBook from "@/views/books/EditBook";
import MyBooks from "@/views/books/MyBooks";

import Resources from "@/views/resources/Resources";
import ReadResource from "@/views/resources/ReadResource";
import AddResource from "@/views/resources/AddResource";
import EditResource from "@/views/resources/EditResource";
import MyResources from "@/views/resources/MyResources";

import Podcasts from "@/views/podcasts/Podcasts";
import AddPodcast from "@/views/podcasts/AddPodcast";
import EditPodcast from "@/views/podcasts/EditPodcast";
import ViewPodcast from "@/views/podcasts/ViewPodcast";
import MyPodcasts from "@/views/podcasts/MyPodcasts";
import AddPodcastChapter from "@/views/podcasts/AddPodcastChapter";
import EditPodcastChapter from "@/views/podcasts/EditPodcastChapter";

import Paywall from "@/views/Paywall";
import Pricing from "@/views/Pricing";

import Members from "@/views/Members";

import MySubscription from "@/views/MySubscription";

import MyProfile from "@/views/MyProfile";

import UserManagement from "@/views/UserManagement";
import WorkManagement from "@/views/WorkManagement";

import PageNotFound from "@/views/404";

import guest from "@/middleware/guest";
import auth from "@/middleware/auth";
import isSubscribed from "@/middleware/isSubscribed";
import accessBook from "@/middleware/accessBook";
import { accessStory, adminStory } from "@/middleware/accessStory";
import { accessJournal, adminJournal } from "@/middleware/accessJournal";
import { accessResource, adminResource } from "@/middleware/accessResource";
import { adminPodcast } from "@/middleware/accessPodcast";
import middlewarePipeline from "./middlewarePipeline";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/stories",
    name: "Stories",
    component: Stories
  },
  {
    path: "/stories/read/:storyId",
    name: "ReadStory",
    component: ReadStory,
    props: true,
    meta: {
      middleware: [isSubscribed, accessStory]
    }
  },
  {
    path: "/stories/read/:storyId",
    name: "ReadFreeStory",
    component: ReadStory,
    props: true,
    meta: {
      middleware: [accessStory]
    }
  },
  {
    path: "/stories/add",
    name: "AddStory",
    component: AddStory,
    meta: {
      middleware: [auth, adminStory]
    }
  },
  {
    path: "/stories/edit/:storyId",
    name: "EditStory",
    component: EditStory,
    props: true,
    meta: {
      middleware: [auth, adminStory]
    }
  },
  {
    path: "/stories/my",
    name: "MyStories",
    component: MyStories,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/journals",
    name: "Journals",
    component: Journals
  },
  {
    path: "/journals/type/:type",
    name: "JournalsByType",
    component: Journals,
    props: true,
  },
  {
    path: "/journals/read/:journalId",
    name: "ReadJournal",
    component: ReadJournal,
    props: true,
    meta: {
      middleware: [isSubscribed, accessJournal]
    }
  },
  {
    path: "/journals/read/:journalId",
    name: "ReadFreeJournal",
    component: ReadJournal,
    props: true,
    meta: {
      middleware: [accessJournal]
    }
  },
  {
    path: "/journals/add",
    name: "AddJournal",
    component: AddJournal,
    meta: {
      middleware: [auth, adminJournal]
    }
  },
  {
    path: "/journals/edit/:journalId",
    name: "EditJournal",
    component: EditJournal,
    props: true,
    meta: {
      middleware: [auth, adminJournal]
    }
  },
  {
    path: "/journals/my",
    name: "MyJournals",
    component: MyJournals,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/gallery",
    name: "GalleryView",
    component: GalleryView
  },
  {
    path: "/gallery/image/:galleryItemIndex?",
    name: "GallerySlider",
    props: true,
    component: GallerySlider
  },
  {
    path: "/gallery/add",
    name: "AddGallery",
    component: AddGallery,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/gallery/edit",
    name: "EditGallery",
    component: EditGallery,
    props: true,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/gallery/my",
    name: "MyGallery",
    component: MyGallery,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/photo/:id",
    name: "PhotoView",
    props: true,
    component: PhotoView
  },
  {
    path: "/books",
    name: "Books",
    component: Books
  },
  {
    path: "/books/read/:bookId",
    name: "ReadBook",
    component: ReadBook,
    props: true,
    meta: {
      middleware: [isSubscribed, accessBook]
    }
  },
  {
    path: "/books/read/:bookId",
    name: "ReadFreeBook",
    component: ReadBook,
    props: true,
    meta: {
      middleware: [accessBook]
    }
  },
  {
    path: "/books/add",
    name: "AddBook",
    component: AddBook,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/books/edit/:bookId",
    name: "EditBook",
    component: EditBook,
    props: true,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/books/my",
    name: "MyBooks",
    component: MyBooks,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources
  },
  {
    path: "/resources/read/:resourceId",
    name: "ReadResource",
    component: ReadResource,
    props: true,
    meta: {
      middleware: [isSubscribed, accessResource]
    }
  },
  {
    path: "/resource/read/:resourceId",
    name: "ReadFreeResource",
    component: ReadResource,
    props: true,
    meta: {
      middleware: [accessResource]
    }
  },
  {
    path: "/resources/add",
    name: "AddResource",
    component: AddResource,
    meta: {
      middleware: [auth, adminResource]
    }
  },
  {
    path: "/resources/edit/:resourceId",
    name: "EditResource",
    component: EditResource,
    props: true,
    meta: {
      middleware: [auth, adminResource]
    }
  },
  {
    path: "/resources/my",
    name: "MyResources",
    component: MyResources,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/podcasts",
    name: "Podcasts",
    component: Podcasts
  },
  {
    path: "/podcasts/view/:podcastId",
    name: "ViewPodcast",
    component: ViewPodcast,
    props: true
  },
  {
    path: "/podcasts/view/:podcastId/chapter/:chapterId",
    name: "ViewPodcastChapter",
    component: ViewPodcast,
    props: true
  },
  {
    path: "/podcasts/add",
    name: "AddPodcast",
    component: AddPodcast,
    meta: {
      middleware: [auth, adminPodcast]
    }
  },
  {
    path: "/podcasts/edit/:podcastId",
    name: "EditPodcast",
    component: EditPodcast,
    props: true,
    meta: {
      middleware: [auth, adminPodcast]
    }
  },
  {
    path: "/podcasts/my",
    name: "MyPodcasts",
    component: MyPodcasts,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/podcasts/:podcastId/chapter/add",
    name: "AddPodcastChapter",
    component: AddPodcastChapter,
    meta: {
      middleware: [auth, adminPodcast]
    }
  },
  {
    path: "/podcasts/:podcastId/chapter/edit/:chapterId",
    name: "EditPodcastChapter",
    component: EditPodcastChapter,
    props: true,
    meta: {
      middleware: [auth, adminPodcast]
    }
  },
  {
    path: "/paywall",
    name: "Paywall",
    component: Paywall
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: Pricing
  },
  {
    path: "/users/management",
    name: "UserManagement",
    component: UserManagement,
    props: true,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/work/management",
    name: "WorkManagement",
    component: WorkManagement,
    props: true,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/members/:formMode?",
    name: "Members",
    component: Members,
    props: true,
    meta: {
      middleware: [guest]
    }
  },
  {
    path: "/subscription/my",
    name: "MySubscription",
    component: MySubscription,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/profile",
    name: "MyProfile",
    component: MyProfile,
    meta: {
      middleware: [auth]
    }
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!to["meta"]["middleware"]) {
    return next();
  }
  const middleware = to["meta"]["middleware"];
  const context = {
    to,
    from,
    next,
    store
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
