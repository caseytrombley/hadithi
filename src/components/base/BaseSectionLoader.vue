<template>
  <div class="section-loader">
    <base-loader large block />
  </div>
</template>

<script>
import BaseLoader from "@/components/base/BaseLoader";
export default {
  name: 'BaseSectionLoader',
  components: {BaseLoader},
}
</script>

<style lang="scss" scoped>
.section-loader {
  padding: 7rem;
}
</style>