<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label" />
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Accounts</li>
          <li class="breadcrumb-item active" aria-current="page">
            My Profile
          </li>
        </ol>
      </nav>
      <div class="row">

        <b-tabs content-class="my-3" nav-class="justify-content-center">
          <b-tab title="Details" active>
            <div class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4">
              <div class="mb-3">
                <label for="name" class="form-label">FirstName</label>
                <input type="text" class="form-control" v-model="account.firstname" />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">LastName</label>
                <input type="text" class="form-control" v-model="account.lastname" />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Email</label>
                <div class="p-2 border bg-light">
                  {{ account.email }}
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <button class="mb-3 btn btn-primary" @click="updateProfile">
                  <em class="bi bi-arrow-clockwise"></em>
                  Update Profile
                </button>
              </div>
            </div>
          </b-tab>
          <b-tab title="Password">
            <div class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4">
              <div class="mb-3">
                <FormPassword label="Current Password" data-key="old" :value="password.old"
                              @handleInput="handleInput" />
              </div>
              <div class="mb-3">
                <FormPassword label="New Password" data-key="new" :value="password.new" @handleInput="handleInput" />
              </div>
              <div class="mb-3">
                <FormPassword label="Confirm Password" data-key="confirm" :value="password.confirm"
                              @handleInput="handleInput" />
              </div>
              <div class="d-flex justify-content-between">
                <button class="mb-3 btn btn-primary" @click="changePassword">
                  <em class="bi bi-arrow-clockwise"></em>
                  Change Password
                </button>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import FormPassword from "@/components/FormPassword";
import loading from "vue-full-loading";
import AccountsService from "@/services/AccountsService";

export default {
  name: "MyProfile",
  components: {
    FormPassword,
    loading
  },
  data() {
    return {
      account: {},
      password: {
        old: "",
        new: "",
        confirm: ""
      },
      loader: {
        show: false,
        label: "Loading..."
      }
    };
  },
  async mounted() {
    this.account = await this.getAccountDetails();
  },
  methods: {
    async getAccountDetails() {
      return AccountsService.getProfile();
    },
    confirmRequiredFields() {
      if (!this.account.firstname && !this.account.lastname) {
        this.$toast.error("You must fill-in all required fields!");
        return false;
      }
      return true;
    },
    async updateProfile() {
      if (confirm("Are you sure you want to update your profile?")) {
        this.loader.show = true;
        if (this.confirmRequiredFields()) {
          await AccountsService.updateAccount(this.account.id, this.account);
          this.$toast.success("Profile has been updated successfully!");
        }
        this.loader.show = false;
      }
    },
    confirmPasswordViability() {
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (this.password.new.match(passwordRegex) == null || this.password.new !== this.password.confirm) {
        this.$toast.error("The password must be more than 8 characters, contain at least 1 number, 1 symbol, 1 upper case and same as the confirm password");
        return false;
      }
      return true;
    },
    async changePassword() {
      if (confirm("Are you sure you want to change your password?")) {
        this.loader.show = true;
        if (this.confirmPasswordViability()) {
          await AccountsService.changePassword(this.account.id, {
            "password": this.password.old, "new_password": this.password.new
          });
          this.$toast.info("Password has been updated successfully!");
        }
        this.loader.show = false;
      }
    },
    handleInput(input) {
      this["password"][input.key] = input.value;
    }
  }
};
</script>
