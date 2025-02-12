<!--suppress ALL -->
<template>
  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-between">
        <div class="btn-left">
          <button
            class="btn btn-sm btn-outline-danger"
            @click="handleClick('cancel')"
          >
            <em class="bi bi-x-circle-fill"></em> Cancel
          </button>
          <button
            :disabled="isDisabled"
            v-if="permissions.CAN_WRITE"
            class="btn btn-sm btn-primary m-1"
            @click="handleClick('save')"
          >
            <em class="bi bi-save"></em> Save
          </button>
          <button
            v-if="isSaved && permissions.CAN_READ"
            class="btn btn-sm btn-outline-success m-1"
            @click="handleClick('view')"
          >
            <em class="bi bi-eye-fill"></em> View
          </button>
        </div>
        <div class="btn-right">
          <button
            v-if="isSaved && permissions.CAN_EDIT"
            class="btn btn-sm btn-outline-success m-1"
            @click="handleClick('edit')"
          >
            <em class="bi bi-pencil-square"></em> Edit
          </button>
          <button
            v-if="isSaved && unpublished && permissions.CAN_PUBLISH"
            class="btn btn-sm btn-primary m-1"
            @click="handleClick('publish')"
          >
            <em class="bi bi-eye"></em> Publish
          </button>
          <button
            v-if="isSaved && published & permissions.CAN_PUBLISH"
            class="btn btn-sm btn-primary m-1"
            @click="handleClick('unPublish')"
          >
            <em class="bi bi-eye-slash"></em> UnPublish
          </button>
          <button
            v-if="isSaved && unpublished & permissions.CAN_DELETE"
            class="btn btn-sm btn-danger m-1"
            @click="handleClick('delete')"
          >
            <em class="bi bi-trash"></em> Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ButtonMenu",
  props: {
    document: {
      type: Object,
    },
    permissions: {
      type: Object,
      default() {
        return {
          CAN_WRITE: false,
          CAN_READ: false,
          CAN_EDIT: false,
          CAN_PUBLISH: false,
          CAN_DELETE: false
        };
      },
    },
    isDisabled: {
      type: Boolean,
      default: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    published: function () {
      return this.document.published === true;
    },
    unpublished: function () {
      return this.document.published !== true;
    },
  },
  methods: {
    handleClick(eventName) {
      if (confirm(`Are you sure you want to ${eventName} the document?`)) {
        const eventsWithoutDocumentId = ["cancel", "save"];
        const hasEventWithoutDocumentId =
          eventsWithoutDocumentId.includes(eventName);
        const hasDocumentId = "id" in this.document;

        if (!hasDocumentId && !hasEventWithoutDocumentId) {
          this.$toast.error("No Document saved!");
        }
        if (hasDocumentId || hasEventWithoutDocumentId) {
          this.$emit(eventName);
        }
      }
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  max-width: none;
  padding-left: 0;
  padding-right: 0;
}
</style>
