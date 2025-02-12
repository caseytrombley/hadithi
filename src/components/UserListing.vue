<template>
  <div class="d-flex col-8">
    <table
      class="table table-bordered border-primary"
      aria-describedby="Permissions Listing"
    >
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Email</th>
        <th scope="col">Permissions</th>
        <th scope="col">Options</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in userList" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ user.permissions.email }}</td>
        <td @click="setCurrentUser(user.permissions.email)">
          <dropdown-multiselect
            component-label="View Permissions"
            :meta="user"
            :component-index="index"
            :options="generatePermissionsList(user['permissions']['perms'])"
            :key="reload"
            @selected="showSelected"
          />
        </td>
        <td>
          <div>
            <button
              class="btn btn-outline-primary"
              @click="updateUserPermissions(user['permissions']['email'], user['permissions']['perms'])">
              Update
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import DropdownMultiselect from "@/components/DropdownMultiselect";
import AccountsService from "@/services/AccountsService";

export default {
  name: "UserListing",
  components: { DropdownMultiselect },
  props: {
    userList: Array,
    trackBy: String,
    labelName: String
  },
  data() {
    return {
      permissionsList: [],
      userEmail: "",
      selected: [],
      update: {},
      user: {},
      reload: 0,
      allPermissions: [],
      currentUser: localStorage.getItem("email"),
      accounts: []
    };
  },
  async mounted() {
    this.allPermissions = await AccountsService.getDefaultAccountPermissions();
    this.accounts = await AccountsService.getAccounts();
  },
  methods: {
    setCurrentUser(userEmail) {
      this.userEmail = userEmail;
    },
    async updateUserPermissions(userEmail, currentPermissions) {
      const userSelected = Object.keys(this.user).length !== 0;
      const userPermissions = { ...currentPermissions, ...this.user.selected };
      const accountId = this.getAccountId(userEmail);
      const accountPermissions = {
        permissions: {
          email: userEmail,
          id: "permissions",
          perms: userPermissions
        }
      };
      if (!userSelected) {
        return this.$toast("No permissions changed");
      }
      if (!accountId) {
        return this.$toast("No account found for this user");
      }
      await AccountsService.updateAccountPermissions(accountId, accountPermissions);
      this.$toast("Permissions have been updated successfully!");
      if (this.currentUser === userEmail) {
        this.$store.commit("setUserPermissions", userPermissions);
      }
      this.reload++;
      this.$emit("permissionsUpdated");
    },
    generatePermissionsList(permsObj) {
      const mergedPermsObj = { ...this.allPermissions, ...permsObj };
      let permissionsObject = [];
      let permsList = Object.keys(mergedPermsObj);
      for (const perms of permsList) {
        permissionsObject.push({
          name: perms,
          value: mergedPermsObj[perms]
        });
      }
      return permissionsObject;
    },
    showSelected(selectedOptions) {
      this.user = selectedOptions;
    },
    getAccountId(email) {
      const account = this.accounts.find(account => account.email === email);
      return (account ? account.id : null);
    }
  }
};
</script>
<style scoped></style>
