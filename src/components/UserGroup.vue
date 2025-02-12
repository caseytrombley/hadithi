<template>
  <div class="d-flex flex-column col-8">
    <div class="d-flex align mt-2">
      <input placeholder="Create a new group" type="text" />
      <dropdown-multiselect
        options="defaultPermissions"
        component-label="Select Permissions"
      ></dropdown-multiselect>
      <button type="button" class="btn btn-primary">Add group</button>
    </div>
    <div class="mt-2">
      <div v-for="group in groups">
        {{ group }}
      </div>
    </div>
  </div>
</template>

<script>
import DropdownMultiselect from "@/components/DropdownMultiselect";
import AccountsService from "@/services/AccountsService";

export default {
  name: "UserGroup",
  components: { DropdownMultiselect },
  data() {
    return {
      groups: [],
      defaultPermissions: AccountsService.getDefaultAccountPermissions(),
    };
  },
};
</script>

<style scoped></style>
