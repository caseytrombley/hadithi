<!--suppress ALL -->
<template>
  <div class="container">
    <loading :show="loader.show" :label="loader.label" />
    <div class="row m-5 d-flex justify-content-center text-start align-items-center">
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-8 col-xs-12">
        <div class="form mb-5">
          <div class="form-row" v-if="isSignUp">
            <label class="form-label">First name</label>
            <input type="text" class="form-control" placeholder="First name" v-model="account.firstname">
          </div>
          <div class="form-row" v-if="isSignUp">
            <label class="form-label">Last name</label>
            <input type="text" class="form-control" placeholder="Last name" v-model="account.lastname">
          </div>
          <div class="form-row" v-if="isSignIn || isSignUp || isResetPassword">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control" placeholder="Email address" v-model="account.email" />
          </div>
          <div class="form-row" v-if="isSignIn || isSignUp">
            <FormPassword data-key="rawPassword" :value="account.rawPassword" @handleInput="handleInput"
                          :key="refreshKey" />
            <PasswordGenerator v-if="isSignUp" data-key="rawPassword"
                               @handleGeneratedInput="handleGeneratedInput" />
          </div>
          <div class="form-row" v-if="isSignUp">
            <FormPassword label="Confirm Password" data-key="confirmPassword" :value="account.confirmPassword"
                          @handleInput="handleInput" />
          </div>
          <div class="form-row" v-if="isSignUp">
            <div class="col-12 mt-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="terms" required v-model="account.terms" />
                <label class="form-check-label" for="terms">
                  Yes, I understand and agree to the
                  <a href="/legal/terms-of-use.pdf" target="_blank">Terms of Use</a>,
                  <a href="/legal/privacy-policy.pdf" target="_blank">Privacy Policy</a>
                  and
                  <a href="/legal/content-provider-agreement.pdf" target="_blank">Content Provider Agreement</a>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div class="mt-3 d-flex flex-column" v-if="isSignIn">
              <button class="btn btn-primary rounded col-6" @click="signWithEmailAndPassword">
                Sign in
              </button>
              <button class="btn btn-outline-primary rounded mt-2 col-6" @click="changePageMode('sign-up')">
                Sign up
              </button>
              <button type="button" class="btn btn-light rounded mt-2 col-6" @click="changePageMode('resetPassword')">
                Reset password
              </button>
            </div>
            <div class="mt-3 d-flex flex-column" v-if="isSignUp">
              <button class="btn btn-primary rounded col-6" @click="createAccountEmailAndPassword">
                Sign up
              </button>
              <button class="btn btn-outline-primary rounded mt-2 col-6" @click="changePageMode('sign-in')">
                Sign in
              </button>
              <button type="button" class="btn btn-light rounded mt-2 col-6" @click="changePageMode('resetPassword')">
                Reset password
              </button>
            </div>
            <div class="mt-3 d-flex flex-column" v-if="isResetPassword">
              <button class="btn btn-primary rounded col-6" @click="resetPassword">
                Reset Password
              </button>
              <button class="btn btn-outline-primary rounded mt-2 col-6" @click="changePageMode('sign-in')">
                Sign in
              </button>
              <button class="btn btn-light rounded mt-2 col-6" @click="changePageMode('sign-up')">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormPassword from "@/components/FormPassword";
import PasswordGenerator from "@/components/PasswordGenerator";
import loading from "vue-full-loading";
import AccountsService from "@/services/AccountsService";
import { getCurrentDateAsUnixTimestamp, getCurrentDateMonthIntervalAsUnixTimestamp } from "@/utils/DateUtil";

export default {
  name: "Members",
  components: {
    FormPassword,
    loading,
    PasswordGenerator
  },
  props: {
    formMode: {
      type: String,
      default: "sign-in"
    }
  },
  data() {
    return {
      pageMode: this.formMode,
      account: {
        firstname: "",
        lastname: "",
        email: "",
        rawPassword: "",
        confirmPassword: "",
        terms: false,
        verified: false
      },
      token: this.$route.query.token || null,
      refreshKey: 0,
      loader: {
        show: false,
        label: "Loading...",
      },
    };
  },
  computed: {
    isSignUp() {
      return (this.pageMode === "sign-up");
    },
    isSignIn() {
      return (this.pageMode === "sign-in");
    },
    isResetPassword() {
      return (this.pageMode === "resetPassword");
    }
  },
  methods: {
    changePageMode(mode) {
      this.pageMode = mode;
    },
    handleInput(input) {
      this["account"][input.key] = input.value;
    },
    handleGeneratedInput(input) {
      this.refreshKey++;
      this.handleInput(input);
    },
    confirmRequiredFields() {
      if (!this.account.firstname && !this.account.lastname) {
        this.$toast.error("You must fill-in all required fields!");
        return false;
      }
      return true;
    },
    confirmPasswordViability() {
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (this.account.rawPassword.match(passwordRegex) == null || this.account.rawPassword !== this.account.confirmPassword) {
        this.$toast.error("The password must be more than 8 characters, contain at least 1 number, 1 symbol, 1 upper case and same as the confirm password");
        return false;
      }
      return true;
    },
    confirmAcceptedTermsAndConditions() {
      if (this.account.terms === false) {
        this.$toast.error("You must agree before submitting!");
        return false;
      }
      return true;
    },
    async createAccountEmailAndPassword() {
      if (this.confirmRequiredFields() && this.confirmPasswordViability() && this.confirmAcceptedTermsAndConditions()) {
        this.loader.show = true;
        this.account["password"] = this.account.rawPassword;
        delete this.account.rawPassword;
        delete this.account.confirmPassword;
        const newAccount = await AccountsService.addAccount(this.account);
        if (newAccount.status !== "success") {
          this.loader.show = false;
          return this.$toast.error(newAccount.message);
        }
        const userSubscription = await this.getDefaultSubscription();
        this.$toast.success(newAccount.message);
        this.loader.show = false;
        this.setUserSubscriptionAndGoToNextPage(userSubscription);
      }
    },
    async getUserSubscription(accountId) {
      const activeSubscription = await AccountsService.getAccountSubscription(accountId);
      if (activeSubscription) {
        return {
          isSubscribed: true,
          subscription: {
            id: activeSubscription.id,
            name: activeSubscription.plan.product.name,
            description: activeSubscription.plan.product.description,
            image: activeSubscription.plan.product.images[0],
            currency: activeSubscription.plan.currency,
            price: activeSubscription.plan.amount,
            interval: activeSubscription.plan.interval,
            periodStart: activeSubscription.current_period_start,
            periodEnd: activeSubscription.current_period_end
          },
          message: "Login in successful",
          nextPage: "Home"
        };
      }
      return this.getDefaultSubscription();
    },
    setUserSubscriptionAndGoToNextPage(userSubscription) {
      this.$store.commit("setSubscribed", userSubscription.isSubscribed);
      this.$store.commit("setSubscription", userSubscription.subscription);
      this.$toast.info(userSubscription.message);
      this.$router.push({ name: userSubscription.nextPage });
    },
    async signWithEmailAndPassword() {
      this.loader.show = true;
      const auth = await AccountsService.authenticateAccount(this.account.email, this.account.rawPassword);
      if ("status" in auth) {
        this.loader.show = false;
        return this.$toast.info(auth.message);
      }
      const account = await AccountsService.getAccount(auth.account_id);
      const defaultPermissions = await AccountsService.getDefaultAccountPermissions();
      const accountPermissions = await AccountsService.getAccountPermissions(auth.account_id);
      const userPerms = accountPermissions.permissions.perms;
      const isEmployee = userPerms.IS_EMPLOYEE;
      let userSubscription = null;

      if (isEmployee) {
        userSubscription = await this.getDefaultEmployeeSubscription();
      }
      if (!isEmployee) {
        userSubscription = await this.getUserSubscription(auth.account_id);
      }
      localStorage.setItem("email", this.account.email);
      localStorage.setItem("displayName", `${this.account.firstname} ${this.account.lastname}`);
      this.$store.commit("setLogged", true);
      this.$store.commit("setUserDetails", account);
      this.$store.commit("setUserPermissions", userPerms);
      this.$store.commit("setDefaultPermissions", defaultPermissions);
      this.loader.show = false;
      this.setUserSubscriptionAndGoToNextPage(userSubscription);
    },
    getDefaultSubscription() {
      return {
        isSubscribed: false,
        subscription: {},
        message: "User does not have an active subscription!",
        nextPage: "Pricing"
      };
    },
    getDefaultEmployeeSubscription() {
      return {
        isSubscribed: true,
        subscription: {
          id: 1,
          name: "Gold Membership",
          description: "Employee Subscription",
          image: "No Image",
          currency: "usd",
          price: 0,
          interval: "month;",
          periodStart: getCurrentDateAsUnixTimestamp(),
          periodEnd: getCurrentDateMonthIntervalAsUnixTimestamp()
        },
        message: "Login in successful",
        nextPage: "Home"
      };
    },
    async resetPassword() {
      this.loader.show = true;
      const resetStatus = await AccountsService.forgotPassword({ "email": this.account.email });
      this.loader.show = false;
      if (!resetStatus) {
        return this.$toast.error("Please enter a valid email");
      }
      return this.$toast.success("An reset email has been sent. Click on it to set new password");
    }
  }
};
</script>
