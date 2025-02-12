<template>
  <span class="tag-item badge rounded-pill bg-info m-1 p-2">{{ tagName }}</span>
</template>
<script>
export default {
  name: "TagItem",
  props: {
    tagName: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-item {
  font-size: .65rem;
  line-height: .5;
}
</style>
