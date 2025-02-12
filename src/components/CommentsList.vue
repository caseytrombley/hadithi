<template>
  <div class="overflow-scroll h-75">
    <div v-for="comment in comments" :key="comment.id" class="bg-fuchsia">
      <div class="d-flex mt-3 align-items-center">
        <div>
          <img
            :src="comment.user.image"
            alt="commenter profile"
            class="rounded rounded-circle"
          />
        </div>
        <div class="d-flex flex-column m-3">
          <div class="d-flex align-items-center">
            <div>{{ comment.user.name }}</div>
            <div class="badge text-bold text-black">
              {{ getRelativeTime(comment.created) }}
            </div>
          </div>
          <div class="badge bg-secondary text-gray text-wrap text-start mt-2">
            <span class="text-wrap">{{ comment.text }}</span>
          </div>
        </div>
        <hr class="border-primary border-3 opacity-75" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CommentsService from "@/services/CommentsService";

export default {
  name: "CommentsList",
  props: {
    resourceId: {
      type: String
    },
    resourceCategory: {
      type: String
    }
  },
  async mounted() {
    await this.getComments();
  },
  data() {
    return {
      comments: []
    };
  },
  methods: {
    async getComments() {
      this.comments = await CommentsService.getComments(this.resourceCategory, this.resourceId);
    },
    getRelativeTime(epochTime) {
      let timeFormat = "dddd, MMMM Do, YYYY h:mm:ss A";
      let conversionFactor = 1000;
      let toDate = moment.unix(epochTime / conversionFactor).utc();
      return moment(toDate, timeFormat).fromNow();
    }
  }
};
</script>

<style scoped></style>
