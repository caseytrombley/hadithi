<template>
  <b-modal :id="modalId" ref="assign-item-modal" title="Assign Work" hide-footer body-bg-variant="light"
           header-bg-variant="info">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ modalLabel }}</h5>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Assignee</label>
            <dropdown-multiselect
              :options="assigneeOptions" @selected="updateAssigneeOptions" component-label="Assign to" />
          </div>
          <div class="mb-3 d-flex flex-column justify-content-start">
            <label class="form-label">Work to be done</label>
            <select v-model="selectedWork" class="form-select border border-secondary">
              <option value="write">Write</option>
              <option value="review">Review</option>
              <option value="edit">Edit</option>
              <option value="publish">Publish</option>
            </select>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-center p-3">
          <label class="form-label">Additional Message</label>
          <textarea placeholder="Message" rows="5" class="col-10 form-control" v-model="additionalMessage"></textarea>
        </div>
        <div class="modal-footer d-flex justify-content-between p-3">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            <em class="bi bi-x-square"></em>
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="assignItem">
            <em class="bi bi-save"></em>
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import DropdownMultiselect from "@/components/DropdownMultiselect";
import NotificationsService from "@/services/NotificationsService";

export default {
  name: "ModalKanbanAssignItem",
  components: {
    DropdownMultiselect
  },
  props: {
    modalLabel: {
      type: String
    },
    group: {
      type: String
    },
    assigneeOptions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      selectedWork: "write",
      selectedAssigneeOptions: {},
      selectedWorkItem: {},
      additionalMessage: "",
      modalId: `assign-${this.group.toLowerCase().replace(/\s/g, "-")}-item-modal`
    };
  },
  methods: {
    updateAssigneeOptions(data) {
      this.selectedAssigneeOptions = data;
      this.selectedWorkItem = this.$store.getters.getCurrentItem;
    },
    async assignItem() {
      if (this.selectedAssigneeOptions.selected) {
        const assignees = Object.keys(this.selectedAssigneeOptions.selected);
        for (const assigneesKey in assignees) {
          const email = assignees[assigneesKey];
          const emailNotification = this.getEmailNotification(email, this.selectedWorkItem);
          await NotificationsService.sendNotification(emailNotification);
        }
        this.$bvModal.hide(this.modalId);
      }
    },
    getEmailNotification(recipientEmail, kanbanItem) {
      const baseUrl = window.location.origin;
      const category = kanbanItem.category;
      const resources = {
        "story": "stories",
        "journal": "journals",
        "podcast": "podcasts",
        "resource": "resources",
        "topic": "topics"
      };
      const itemUrl = `${baseUrl}/${resources[category]}/read/${kanbanItem.id}`;
      const isTopic = category === "topic";
      const messageBody = (isTopic
          ? `Title: ${kanbanItem.title} <br/> Summary: ${kanbanItem.note} <br/> to ${this.selectedWork} on Hadithi`
          : `Click here to view: <a href="${itemUrl}">${itemUrl}</a>`
      );
      return {
        "subject": `You have been assigned a ${category}`,
        "recipients": [{ "name": recipientEmail, "email": recipientEmail }],
        "template_id": "pr9084zk51v4w63d",
        "variables": [{
          "email": recipientEmail,
          "substitutions": [
            {
              "var": "message",
              "value": `Hello, <br/>You have been assigned a ${category} to ${this.selectedWork} on Hadithi. <br/><br/> ${messageBody} <br/><br/> ${this.additionalMessage}`
            },
            { "var": "link", "value": "" }
          ]
        }]
      };
    }
  }
};
</script>

<style scoped></style>
