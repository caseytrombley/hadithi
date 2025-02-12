<template>
  <div class="d-flex flex-column">
    <div class="p-2 mt-2" v-if="implemented">
      <div class="mb-2 mt-2 p-2">
        <h3>User Groups</h3>
      </div>
      <user-group></user-group>
    </div>
    <div class="col-12 m-2">
      <div>
        <h3>User Permissions</h3>
      </div>
      <user-listing :userList="userList" :key="permissionsUpdatedReload" @permissionsUpdated="reloadNewPermissions"/>
    </div>
  </div>
</template>

<script>
import UserGroup from "@/components/UserGroup";
import UserListing from "@/components/UserListing";
import AccountsService from "@/services/AccountsService";

export default {
  name: "UserManagement",
  components: {UserListing, UserGroup},
  data() {
    return {
      userPermissions: {},
      userList: [],
      permissionsUpdatedReload: 0,
      implemented: false,
    };
  },
  mounted() {
    this.getUserPermissionList();
  },
  methods: {
    async getUserPermissionList() {
      this.userPermissions = await AccountsService.getAllAccountPermissions();
      this.extractUserListing();
    },
    extractUserListing() {
      this.userList = Object.values(this.userPermissions);
    },
    reloadNewPermissions() {
      this.getUserPermissionList();
      this.permissionsUpdatedReload++;
    },
  },
};
</script>

<style scoped></style>
