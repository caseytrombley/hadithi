<template>
  <div class="my-2 p-4">
    <comment-input
      :resource-id="resourceId"
      :resource-category="resourceCategory"
      @comment-posted="reloadCommentList"
    ></comment-input>
    <comments-list
      :resource-id="resourceId"
      :resource-category="resourceCategory"
      :key="reloadKey"
      v-if="resourceId && resourceCategory"
    ></comments-list>
  </div>
</template>

<script>
import CommentsList from "@/components/CommentsList";
import CommentInput from "@/components/CommentInput";

export default {
  name: "CommentsBox",
  props: {
    resourceId: {
      type: String,
    },
    resourceCategory: {
      type: String,
    },
  },
  data() {
    return {
      reloadKey: 0,
    };
  },
  components: { CommentInput, CommentsList },
  methods: {
    reloadCommentList() {
      this.reloadKey = this.reloadKey + 1;
    },
  },
};
</script>

<style scoped></style>
