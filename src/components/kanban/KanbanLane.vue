<template>
  <div class="h-100 col border border-secondary m-1 rounded">
    <div class="m-2 text-bold bg-light column-header d-flex justify-content-between">
      <h3>{{ group }}</h3>
      <div v-if="isTopic">
        <b-button v-b-modal.add-topic id="edit-topic" type="button" class="btn btn-primary">
          <em class="bi bi-plus-square" ref="edit-topic"></em>
        </b-button>
        <new-kanban-item :modal-label="newKanbanModalLabel" :edit-topic="editTopic" />
      </div>
    </div>
    <div>
      <b-button v-b-modal.assign-item-modal hidden id="assign-item-button" type="button" class="btn btn-primary">
        <em class="bi bi-plus-square"></em>
      </b-button>
      <modal-kanban-assign-item :modal-label="assignKanbanModalLabel" :assignee-options="assignees" :group="group" />
    </div>
    <div class="vh-100 overflow-scroll p-2 mt-2">
      <div v-for="content in contents">
        <kanban-item :content="content" :kanban-group="group" @editTopic="clickButton" @assignItem="assignItem" />
      </div>
    </div>
  </div>
</template>

<script>
import KanbanItem from "@/components/kanban/KanbanItem";
import ModalKanbanAssignItem from "@/components/kanban/ModalKanbanAssignItem";
import NewKanbanItem from "@/components/kanban/NewKanbanItem";
import AccountsService from "@/services/AccountsService";

export default {
  name: "KanbanLane",
  components: {
    KanbanItem,
    ModalKanbanAssignItem,
    NewKanbanItem
  },
  props: {
    contents: {
      type: Array
    },
    group: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      newKanbanModalLabel: "Add a topic",
      assignKanbanModalLabel: "Assign an item",
      editTopic: {},
      assignWorkItem: {},
      assignees: [],
      isTopic: (this.group === "To do")
    };
  },
  mounted() {
    this.getJobAssignees();
  },
  methods: {
    async getJobAssignees() {
      let jobAssignees = [];
      let users = await AccountsService.getAllAccountPermissions();
      let assignees = Object.values(users);
      for (const assignee of assignees) {
        if (assignee["permissions"]["perms"]["IS_EMPLOYEE"]) {
          let jobAssignee = {
            name: assignee.permissions.email,
            value: false
          };
          jobAssignees.push(jobAssignee);
        }
      }
      this.assignees = jobAssignees;
    },
    clickButton(data) {
      this.newKanbanModalLabel = "Edit a topic";
      this.$bvModal.show("add-topic");
      this.editTopic = data;
    },
    assignItem(data, group) {
      const group_label = group.toLowerCase().replace(/\s/g, "-");
      this.assignKanbanModalLabel = "Assign a " + data.category;
      this.$bvModal.show(`assign-${group_label}-item-modal`);
      this.assignWorkItem = data;
      this.getJobAssignees();
    }
  }
};
</script>

<style scoped></style>
