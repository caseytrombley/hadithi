<template>
  <div>
    <slot name="header"></slot>
    <div class="container document-body">
      <slot name="body"></slot>
      <base-loader v-if="isLoading" block large />

      <slot name="navigation"></slot>
    </div>
  </div>
</template>
<script>
import BaseLoader from "@/components/base/BaseLoader";

export default {
  name: "LayoutDocument",
  components: {
    BaseLoader,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.document-body {
  padding-top: 80px;
  padding-bottom: 2rem;

   > *:first-of-type {
     margin-top: 0;
     padding-top: 0;
   }
}
</style>