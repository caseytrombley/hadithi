<template>
  <div>
    <ShareNetwork
        class="btn btn-sm mx-1"
        v-for="network in networks"
        :network="network.network"
        :key="network.network"
        :style="{ backgroundColor: network.color }"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
    >
      <span class="text-white">
        <em :class="network.icon"></em> <strong v-show="showName">{{ network.name }}</strong>
      </span>
    </ShareNetwork>
  </div>
</template>
<script>
export default {
  name: "SocialSharing",
  props: {
    shareContent: {
      type: Object,
      default: () => ({
        url: "",
        title: "",
        description: "",
        quote: "",
        hashtags: ""
      })
    },
    showName: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sharing: this.shareContent,
      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "bi bi-facebook",
          color: "#1877f2",
        },
        {
          network: "pinterest",
          name: "Pinterest",
          icon: "bi bi-pinterest",
          color: "#bd081c",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "bi bi-twitter",
          color: "#1da1f2",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "bi bi-whatsapp",
          color: "#25d366",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped></style>
