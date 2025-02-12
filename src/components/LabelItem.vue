<template>
  <span class="badge" :class="labelContent.color"><em :class="labelContent.icon"></em> {{ labelContent.text }}</span>
</template>
<script>
export default {
  name: "LabelItem",
  props: {
    labelContent: {
      type: Object,
      default: () => ({
        icon: "",
        text: "",
        color: ""
      }),
    },
  }
};
</script>
<style scoped></style>
