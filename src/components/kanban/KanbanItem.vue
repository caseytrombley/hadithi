<template>
  <div class="card my-2 col-12 shadow"
       :class="content['category'] === 'journal' ? 'border-success' : 'border-primary'">
    <div class="d-flex flex-row flex-row-reverse justify-content-between p-2">
      <kanban-item-menu
        :kanban-group="kanbanGroup"
        :permissions="permissions[content['category']]"
        :content="content"
        @editTopic="editTopic"
        @assignItem="assignItem(content, kanbanGroup)"
      />
      <h6>
      <span class="badge" :class="content['category'] === 'journal' ? 'text-bg-primary' : 'text-bg-secondary'">
        {{ content["category"] }}
      </span>
      </h6>
    </div>
    <div class="card-body">
      <div class="d-flex">
        <h6 class="card-title text-uppercase">{{ content["title"] }}</h6>
      </div>
      <span class="card-text text-wrap"
            v-html="(content['note'] ? content['note'].substring(0, displayLimit) + '....' : '')"></span>
    </div>
  </div>
</template>

<script>
import KanbanItemMenu from "@/components/menus/KanbanItemMenu";

export default {
  name: "KanbanItem",
  components: { KanbanItemMenu },
  props: {
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
  computed: {
    permissions: function() {
      let currentPermissions = this.$store.state.userPermissions;
      return {
        journal: {
          CAN_ASSIGN: currentPermissions["CAN_ASSIGN_JOURNAL"],
          CAN_PUBLISH: currentPermissions["CAN_PUBLISH_JOURNAL"],
          CAN_EDIT: currentPermissions["CAN_EDIT_JOURNAL"],
          CAN_READ: currentPermissions["CAN_READ_JOURNAL"]
        },
        story: {
          CAN_ASSIGN: currentPermissions["CAN_ASSIGN_STORY"],
          CAN_PUBLISH: currentPermissions["CAN_PUBLISH_STORY"],
          CAN_EDIT: currentPermissions["CAN_EDIT_STORY"],
          CAN_READ: currentPermissions["CAN_READ_STORY"]
        },
        topic: {
          CAN_ASSIGN: currentPermissions["CAN_ASSIGN_TOPIC"],
          CAN_PUBLISH: currentPermissions["CAN_PUBLISH_TOPIC"],
          CAN_EDIT: currentPermissions["CAN_EDIT_TOPIC"],
          CAN_READ: currentPermissions["CAN_CREATE_TOPIC"],
          CAN_DELETE: currentPermissions["CAN_DELETE_TOPIC"]
        }
      };
    }
  },
  methods: {
    editTopic(content) {
      this.$emit("editTopic", content);
    },

    assignItem(content, group) {
      this.$emit("assignItem", content, group);
    }
  }
};
</script>

<style scoped></style>
