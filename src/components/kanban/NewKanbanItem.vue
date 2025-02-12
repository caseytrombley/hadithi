<template>
  <b-modal id="add-topic" ref="add-topic" title="Add Topic" hide-footer body-bg-variant="light"
           header-bg-variant="info">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-label">{{ modalLabel }}</h5>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="kanban-title" class="form-label">Title</label>
            <input type="text" class="form-control" id="kanban-title" placeholder="Title" v-model="topic.title" />
          </div>
          <div class="mb-3">
            <label for="kanban-summary" class="form-label">Summary</label>
            <textarea class="form-control" id="kanban-summary" rows="3" v-model="topic.note"></textarea>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between p-3">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            <em class="bi bi-x-square"></em>
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveTopic">
            <em class="bi bi-save"></em>
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { v4 as uuidV4 } from "uuid";
import TopicService from "@/services/TopicsService";

export default {
  name: "NewKanbanItem",
  props: {
    modalLabel: {
      type: String,
      default() {
        return "Add a topic";
      }
    },
    editTopic: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      editMode: false,
      topic: {
        title: "",
        note: "",
        category: "topic",
        assignedTo: []
      }
    };
  },
  watch: {
    editTopic: {
      handler(newValue) {
        this.topic = newValue;
        this.editMode = true;
      },
      deep: true
    }
  },
  methods: {
    clearTopic() {
      this.topic = {
        category: "topic",
        assignedTo: []
      };
      this.reloadContent();
    },
    saveTopic() {
      if (this.editMode) {
        this.updateTopic();
      } else {
        this.addTopic();
      }
    },
    validateTopic() {
      if (!this.topic.title || !this.topic.note) {
        alert("Title and summary are required");
        return false;
      }
      return true;
    },
    addTopic() {
      this.topic.id = uuidV4();
      if (this.validateTopic()) {
        TopicService.addTopic(this.topic);
        this.clearTopic();
      }
    },
    updateTopic() {
      if (this.validateTopic()) {
        TopicService.updateTopic(this.topic.id, this.topic);
        this.clearTopic();
        this.editMode = false;
      }
    },
    reloadContent() {
      this.$store.commit("setUpdateWork", true);
    }
  }
};
</script>
