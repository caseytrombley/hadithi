<template>
  <section id="pricing" class="section pricing">
    <div class="container">
      <div class="section-title aos-init aos-animate" data-aos="zoom-out">
        <h2>Choose Your Plan</h2>
        <p>Discover &amp Read Top-Rated Stories, Books and Journals</p>
      </div>
      <div class="heading pb-4">
        <b-tabs content-class="mt-3" nav-class="justify-content-center">
          <base-loader v-if="loading" block large />
          <b-tab title="Monthly" active>
            <div class="row">
              <pricing-item :package-item="pricingPackage" v-for="(pricingPackage, index) in pricingPackages.month"
                            :key="pricingPackage.billingCycle+index" />
            </div>
          </b-tab>
          <b-tab title="Yearly">
            <div class="row">
              <pricing-item :package-item="pricingPackage" v-for="(pricingPackage, index) in pricingPackages.year"
                            :key="pricingPackage.billingCycle+index" />
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import BaseLoader from "@/components/base/BaseLoader";
import PricingItem from "@/components/sections/PricingItem.vue";
import SubscriptionLink from "@/components/SubscriptionLink";
import SubscriptionsService from "@/services/SubscriptionsService";
import { getFormattedPrice } from "@/utils/NumberUtil";

export default {
  name: "SectionPricing",
  components: {
    BaseLoader,
    PricingItem,
    SubscriptionLink
  },
  data() {
    return {
      pricingPackages: [],
      loading: null
    };
  },
  async mounted() {
    this.loading = true;
    this.pricingPackages = await this.getPricingPackages();
    this.loading = false;
  },
  methods: {
    async getPricingPackages() {
      const subscriptionPackages = Object.values(await SubscriptionsService.getSubscriptionPackages());
      const pricing_packages = await Promise.all(
        subscriptionPackages.map(async (subscriptionPackageItem) => {
          const [subscriptionPackage] = await SubscriptionsService.getSubscriptionPackage(subscriptionPackageItem["id"]);
          return {
            name: subscriptionPackage["price"]["product"]["name"],
            description: subscriptionPackage["price"]["product"]["description"].split(",").map((item) => item.trim()),
            image: subscriptionPackage["price"]["product"]["images"][0],
            priceCents: subscriptionPackage["price"]["unit_amount"],
            price: getFormattedPrice(
              subscriptionPackage["price"]["currency"],
              subscriptionPackage["price"]["unit_amount"]
            ),
            billingCycle: subscriptionPackage["price"]["recurring"]["interval"],
            url: subscriptionPackageItem["url"]
          };
        })
      );
      return {
        month: pricing_packages.filter(pricing_package => pricing_package.billingCycle === "month"),
        year: pricing_packages.filter(pricing_package => pricing_package.billingCycle === "year")
      };
    }
  }
};
</script>
