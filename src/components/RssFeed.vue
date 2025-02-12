<template>
  <div class="d-flex flex-column vh-100 overflow-hidden">
    <div class="row h-100 mb-3 mx-0 overflow-hidden">
      <div class="container-fluid h-50">
        <div class="row h-100">
          <div class="col-12 h-100 p-0 m-0 mt-3">
            <div class="card h-100 border rounded bg-white">
              <div class="card-header">{{ feedData.name }}</div>
              <div class="card-body p-0 m-0 overflow-hidden">
                <div class="list-group h-100 list-group-flush rounded-0">
                  <div class="h-100 scrollable overflow-auto">
                    <VueRssFeed :feedUrl="feedData.url" name=" " :limit="feedData.limit"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueRssFeed from "vue-rss-feed";

export default {
  name: "RssFeed",
  components: {
    VueRssFeed
  },
  props: {
    feedData: {
      type: Object,
      default: () => ({
        url: "https://rss.app/feeds/hmsyAr3PyniBpmOd.xml",
        name: "",
        limit: 5
      }),
    }
  }
};
</script>
<style scoped></style>
