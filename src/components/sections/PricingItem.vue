<template>
  <div class="price-item col-lg-4 col-md-12">
    <div class="box featured aos-init aos-animate" data-aos="zoom-in"
         data-aos-delay="0">
      <h3>{{ item.name }}</h3>
      <h4>
        <sup>$</sup>{{ item.price }}<span> / {{ item.billingCycle }}</span>
      </h4>
      <ul class="list">
        <li v-for="descriptionItem in item.description">
          {{ descriptionItem }}
        </li>
      </ul>
      <div class="btn-wrap">
        <SubscriptionLink :link-options="this.getSubscriptionLink(item)" />
      </div>
    </div>
  </div>
</template>
<script>
import SubscriptionLink from "@/components/SubscriptionLink.vue";
import { mapGetters } from "vuex";

export default {
  name: "PricingItem",
  components: {
    SubscriptionLink
  },
  props: {
    packageItem: {
      type: Object
    }
  },
  mounted() {
    this.item = this.packageItem;
  },
  computed: {
    ...mapGetters({
      loggedIn: "loggedIn",
      activeSubscription: "getSubscription"
    })
  },
  data() {
    return {
      item: {
        name: "",
        price: "",
        billingCycle: "",
        description: ""
      }
    };
  },
  methods:{
    getSubscriptionLink(subscription) {
      const isUpgrade = subscription.priceCents > this.activeSubscription.price;
      const isDowngrade = subscription.priceCents < this.activeSubscription.price;
      const isSubscription =
        subscription.name === this.activeSubscription.name &&
        subscription.priceCents === this.activeSubscription.price;

      const subscribeLink = {
        linkText: "Subscribe",
        linkIcon: "fa fa-shopping-cart",
        linkClickUrl: subscription.url
      };
      const mySubscriptionLink = {
        linkText: "Cancel",
        linkIcon: "fa fa-ban",
        linkClickUrl: "/subscription/my"
      };
      const upgradeLink = {
        linkText: "Upgrade",
        linkIcon: "fa fa-arrow-up",
        linkClickUrl: subscription.url
      };
      const downgradeLink = {
        linkText: "Downgrade",
        linkIcon: "fa fa-arrow-down",
        linkClickUrl: subscription.url
      };
      const signInLink = {
        linkText: "SignIn",
        linkIcon: "fa fa-sign-in",
        linkClickUrl: "/members"
      };

      const linkOptions = {
        true: {
          true: mySubscriptionLink,
          false: isUpgrade
            ? upgradeLink
            : isDowngrade ? downgradeLink : subscribeLink
        },
        false: {
          true: signInLink,
          false: subscribeLink
        }
      };
      return linkOptions[this.loggedIn][isSubscription];
    },
  }
};

</script>
<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.price-item {
  margin-top: 1rem;

  @media (min-width: 992px) {
    margin-top: 0;
  }
}

.box {
  padding: 20px;
  background: $white;
  text-align: center;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

h3 {
  margin: -20px -20px 25px -20px;
  padding: 30px 15px;
  font-size: 1.5rem;
  font-weight: 600;
  color: $gray3;
  background: #f8f8f8;
}

h4 {
  font-size: 36px;
  color: $orange;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin-bottom: 20px;

  sup {
    font-size: 20px;
    top: -15px;
    left: -3px;
  }

  span {
    color: $gray4;
    font-size: 16px;
    font-weight: 300;
  }
}

.list {
  padding: 0;
  list-style: none;
  color: $gray4;
  text-align: center;
  line-height: 20px;
  font-size: 14px;

  li {
    padding-bottom: 16px;
  }

  i {
    color: $orange;
    font-size: 18px;
    padding-right: 4px;
  }

  .na {
    color: $gray;
    text-decoration: line-through;
  }
}

.btn-wrap {
  margin: 20px -20px -20px -20px;
  padding: 20px 15px;
  background: #f8f8f8;
  text-align: center;
}

.btn-buy {
  background: $orange;
  display: inline-block;
  padding: 8px 35px 10px 35px;
  border-radius: 50px;
  color: $white;
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background: $orange-hover;
  }
}

.featured {
  border: 2px solid $orange;

  h3 {
    color: $white;
    background: $orange;
  }
}

</style>

