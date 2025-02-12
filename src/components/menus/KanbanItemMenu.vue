<template>
  <div>
    <b-button-group @click="selectItem(content)">
      <b-dropdown right split no-caret size="sm">
        <template #button-content>
          <b-icon icon="three-dots-vertical"></b-icon>
        </template>
        <b-dropdown-item @click="readContent(content)" v-if="permissions['CAN_READ']">Read</b-dropdown-item>
        <b-dropdown-item @click="editContent(content)"  v-if="kanbanGroup !== 'Complete' && permissions['CAN_EDIT']">Edit</b-dropdown-item>
        <b-dropdown-item @click="assignItem(content)" v-if="permissions['CAN_ASSIGN']">Assign</b-dropdown-item>
        <b-dropdown-item  @click="updateContent(content, {status: 'review'})"
                          v-if="kanbanGroup !== 'To do' && permissions['CAN_ASSIGN']">Submit to editor</b-dropdown-item>
        <b-dropdown-item @click="updateContent(content, {status: 'draft'})"
                         v-if="kanbanGroup !== 'To do' && permissions['CAN_ASSIGN']">Return to writer</b-dropdown-item>
        <b-dropdown-item @click="updateContent(content,{status: 'published', published: true })"
                         v-if="kanbanGroup === 'In Review' && permissions['CAN_PUBLISH']">Publish</b-dropdown-item>
        <b-dropdown-item class="text-danger" @click="updateContent(content, {status: 'review', published: false })"
                         v-if="kanbanGroup === 'Complete' && permissions['CAN_PUBLISH']">UnPublish</b-dropdown-item>
        <b-dropdown-divider v-if="kanbanGroup === 'To do'"></b-dropdown-divider>
        <b-dropdown-item class="text-danger" v-if="kanbanGroup === 'To do'" @click="deleteContent(content)">Delete</b-dropdown-item>
      </b-dropdown>
    </b-button-group>
  </div>
</template>

<script>
import TopicService from "@/services/TopicsService";
import JournalService from "@/services/JournalsService";
import StoryService from "@/services/StoriesService";

export default {
  name: "KanbanItemMenu",
  props: {
    permissions: {
      type: Object,
      default() {
        return {
          CAN_WRITE: false,
          CAN_READ: false,
          CAN_EDIT: false,
          CAN_PUBLISH: false,
          CAN_DELETE: false,
          CAN_ASSIGN: false
        };
      }
    },
    content: {
      type: Object
    },
    kanbanGroup: {
      type: String
    },
    displayLimit: {
      type: Number,
      default: 150
    }
  },
  computed: {},
  methods: {
    readContent(content) {
      if (content.category === "topic") {
        alert(content.note);
        return;
      }
      let routes = {
        journal: this.$router.push({
          name: "ReadJournal",
          params: { journalId: content.id }
        }),
        story: this.$router.push({
          name: "ReadStory",
          params: { storyId: content.id }
        })
      };
      return routes[content.category];
    },
    editContent(content) {
      if (content.category === "topic") {
        this.$emit("editTopic", content);
        return;
      }

      let routes = {
        journal: this.$router.push({
          name: "EditJournal",
          params: { journalId: content.id }
        }),
        story: this.$router.push({
          name: "EditStory",
          params: { storyId: content.id }
        })
      };
      return routes[content.category];
    },
    async deleteContent(content) {
      let confirmDelete = confirm(
        "Are you sure you want to delete " + content.title + "?"
      );
      if (confirmDelete) {
        await TopicService.deleteTopic(content.id);
        this.$store.commit("setUpdateWork", true);
      }
    },
    async updateContent(content, contentToUpdate) {
      const confirmUpdate = confirm("Are you sure you want to change " + content.title + "?");
      if (confirmUpdate) {
        const routes = {
          journal: await JournalService.updateJournal(content.id, contentToUpdate),
          story: await StoryService.updateStory(content.id, contentToUpdate)
        };

        await routes[content.category];
        await this.$store.commit("setUpdateWork", true);

        return true;
      }
      return false;
    },
    selectItem(content) {
      this.$store.commit("setCurrentItem", content);
    },
    assignItem(content) {
      this.$emit("assignItem", content);
    }
  }
};
</script>

<style scoped></style>
