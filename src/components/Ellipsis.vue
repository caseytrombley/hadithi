<template>
  <vue-show-more-text :text="content" :lines="lines"/>
</template>

<script>
import vueShowMoreText from 'vue-show-more-text';

export default {
  name: "Ellipsis",
  components: {
    vueShowMoreText,
  },
  props: {
    content: {
      type: String
    },
    lines: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep {
  .anchor {
    color: $orange !important;
  }
}
</style>

