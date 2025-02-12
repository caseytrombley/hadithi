<template>
  <div>
    <base-button
      is-link
      :href="linkOptions.linkClickUrl"
      data-abc="true"
    >
      <i :class="linkOptions.linkIcon"></i>{{ linkOptions.linkText }}
    </base-button>
  </div>
</template>
<script>
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "SubscriptionLink",
  components: {BaseButton},
  props: {
    linkOptions: {
      type: Object,
      default: () => ({
        linkText: "",
        linkClickUrl: "",
        linkIcon: "",
      }),
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

