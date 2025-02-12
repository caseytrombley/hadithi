<template>
  <div class="container-fluid">
    <loading :show="loader.show" :label="loader.label" />
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Subscription</li>
          <li class="breadcrumb-item active" aria-current="page">
            My Subscription
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <div
            class="text-start col-lg-6 col-md-8 col-sm-12 m-auto border rounded p-4"
          >
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <div class="p-2 border bg-light">{{ subscription.name }}</div>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <div class="p-2 border bg-light">
                {{ subscription.description }}
              </div>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <div class="p-2 border bg-light">
                {{ subscription.formattedPrice }}/{{ subscription.interval }}
              </div>
            </div>
            <div class="mb-3">
              <label for="periodStart" class="form-label">PeriodStart</label>
              <div class="p-2 border bg-light">
                {{ subscription.formattedPeriodStart }}
              </div>
            </div>
            <div class="mb-3">
              <label for="periodEnd" class="form-label">PeriodEnd</label>
              <div class="p-2 border bg-light">
                {{ subscription.formattedPeriodEnd }}
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button class="mb-3 btn btn-primary" @click="changeSubscription">
                <em class="bi bi-arrow-down-up"></em>
                Change Subscription
              </button>
              <button class="mb-3 btn btn-danger" @click="cancelSubscription">
                <em class="bi bi-x-circle"></em>
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loading from "vue-full-loading";
import { getFormattedPrice } from "@/utils/NumberUtil";
import { getFormattedDateString } from "@/utils/DateUtil";
import SubscriptionsService from "@/services/SubscriptionsService";

export default {
  name: "MySubscription",
  components: {
    loading,
  },
  data() {
    return {
      subscription: {
        name: "",
        description: "",
        currency: "",
        price: 0,
        interval: "",
        periodStart: new Date(),
        periodEnd: new Date(),
      },
      loader: {
        show: false,
        label: "Loading...",
      },
    };
  },
  async mounted() {
    const activeSubscription = this.$store.getters.getSubscription;
    const isActiveSubscription = Object.keys(activeSubscription).length > 0;
    if (isActiveSubscription) {
      this.subscription = activeSubscription;
    }
    this.subscription["formattedPrice"] = getFormattedPrice(
      this.subscription.currency,
      this.subscription.price
    );
    this.subscription["formattedPeriodStart"] = getFormattedDateString(
      this.subscription.periodStart
    );
    this.subscription["formattedPeriodEnd"] = getFormattedDateString(
      this.subscription.periodEnd
    );
  },
  methods: {
    async changeSubscription() {
      this.loader.show = true;
      await this.$router.push({ name: "Pricing" });
      this.loader.show = false;
    },
    async cancelSubscription() {
      if (confirm("Are you sure you want to cancel your subscription?")) {
        await SubscriptionsService.cancelSubscription(this.subscription.id);
        this.$toast.warning("Subscription has been cancelled successfully!");
        await this.changeSubscription();
      }
    },
  },
};
</script>
<style scoped></style>
