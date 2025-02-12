<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <div>
        <img
          src="https://picsum.photos/60"
          class="rounded rounded-circle float-start border"
          alt="profile picture"
        />
      </div>
    </div>
    <div class="m-2 col-8">
      <textarea
        v-model="comment.text"
        class="col-12"
        placeholder="Leave your comment"
        rows="3"
      />
    </div>
    <div class="m-2">
      <button class="btn btn-info" @click="saveComment" :class="(!loggedIn ? 'disabled': '')">
        <i :class="(loggedIn ? 'bi bi-send': 'bi bi-lock')"></i>
      </button>
    </div>
  </div>
</template>

<script>
import CommentsService from "@/services/CommentsService";
import { mapGetters } from "vuex";

export default {
  name: "CommentInput",
  props: {
    resourceId: {
      type: String
    },
    resourceCategory: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: "loggedIn",
      currentUser: "getUserDetails"
    })
  },
  data() {
    return {
      comment: {
        user: {
          id: "",
          name: "",
          image: "https://picsum.photos/60"
        },
        text: "",
        created: Date.now()
      }
    };
  },
  methods: {
    validateComment() {
      if (this.comment.text.length >= 5) {
        return true;
      } else {
        this.$toast.warning("You need more than 5 characters to post");
        return false;
      }
    },
    updateComment() {
      this.comment.user.id = this.currentUser.id;
      this.comment.user.name = `${this.currentUser.firstname} ${this.currentUser.lastname}`;
      return this.comment;
    },
    resetComment() {
      this.comment.text = "";
    },
    async saveComment() {
      if (this.validateComment()) {
        let updatedComment = this.updateComment();
        await CommentsService.addComment(
          this.resourceCategory,
          this.resourceId,
          updatedComment
        );
        this.resetComment();
        this.$toast.success("You have commented");
        this.$emit("comment-posted");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
textarea {
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 8px;
}
</style>
