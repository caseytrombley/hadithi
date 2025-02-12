<template>
  <div>
    <div class="">
      <div class="d-flex justify-content-between">
        <base-button
          class="btn btn-sm btn-outline-primary m-1"
          @click.native="handleEvent('read')"
        >
          <em class="bi bi-book-half"></em> Read
        </base-button>
        <div class="d-flex" v-if="permissions">
          <base-button
            class="btn btn-sm btn-outline-success m-1"
            @click.native="handleEvent('edit')"
            v-if="permissions['CAN_EDIT']"
          >
            <em class="bi bi-pencil-square"></em> Edit
          </base-button>
          <base-button
            class="btn btn-sm btn-outline-primary m-1"
            @click.native="handleEvent('publish')"
            v-if="unpublished & permissions['CAN_PUBLISH']"
          >
            <em class="bi bi-eye"></em> Publish
          </base-button>
          <base-button
            class="btn btn-sm btn-danger m-1"
            @click.native="handleEvent('unPublish')"
            v-if="published & permissions['CAN_PUBLISH']"
          >
            <em class="bi bi-eye-slash"></em> UnPublish
          </base-button>
          <base-button
            class="btn btn-sm btn-danger m-1"
            @click.native="handleEvent('delete')"
            v-if="unpublished & permissions['CAN_DELETE']"
          >
            <em class="bi bi-trash"></em> Delete
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "DocumentMenu",
  components: {BaseButton},
  props: {
    document: {
      type: Object,
    },
    permissions: {
      type: Object,
      default() {
        return {};
      },
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
    handleEvent(eventName) {
      this.$emit("handleEvent", eventName, this.document);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
