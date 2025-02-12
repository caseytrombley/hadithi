import SubscriptionApi from "@/api/hadithi/SubscriptionApi";

/**
 * @name SubscriptionsService
 * @description Service to manage Subscriptions
 * @class
 * @public
 */

class SubscriptionsService {

  /**
   * Get subscription package
   *
   * @param {string} subscriptionId The subscriptionId to fetch.
   * @return {promise} selected payment_link.
   */
  async getSubscriptionPackage(subscriptionId) {
    return SubscriptionApi.getSubscriptionPackage(subscriptionId);
  }

  /**
   * Get all subscription packages
   *
   * @return {promise} all payment_links
   */
  async getSubscriptionPackages() {
    return SubscriptionApi.getSubscriptionPackages();
  }

  /**
   * Cancel subscription
   *
   * @param {string} subscriptionId The subscriptionId to cancel.
   * @return {promise} cancelled subscription.
   */
  async cancelSubscription(subscriptionId) {
    return SubscriptionApi.cancelSubscription(subscriptionId);
  }

  /**
   * Get resource access subscriptions
   *
   * @param {string} resource The resource access subscriptions to fetch.
   * @return {array<string>} selected resource access subscriptions.
   */
  getResourceAccessSubscriptions(resource) {
    const subscriptions = {
      "Bronze": "Bronze Membership",
      "Silver": "Silver Membership",
      "Gold": "Gold Membership"
    };
    const accessSubscriptions = {
      "story": [subscriptions.Bronze, subscriptions.Silver, subscriptions.Gold],
      "resource": [subscriptions.Bronze, subscriptions.Silver, subscriptions.Gold],
      "book": [subscriptions.Silver, subscriptions.Gold],
      "journal": [subscriptions.Gold],
      "podcast": [subscriptions.Gold]
    };
    return accessSubscriptions[resource] || [];
  }
}

export default new SubscriptionsService();
