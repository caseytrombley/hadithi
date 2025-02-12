import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name SubscriptionsApi
 * @description Api Wrapper to manage Subscriptions
 * @class
 * @public
 */

class SubscriptionsApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`subscriptions/v1`);
  }

  /**
   * Get subscription packages
   *
   * @return {object} filtered subscription packages.
   */
  async getSubscriptionPackages() {
    this.apiURL = this.getApiURL(this.urlPath, `/packages`);
    return this.getData();
  }

  /**
   * Get subscription package
   *
   * @param {string} packageId The packageId to filter from subscription packages.
   * @return {object} filtered subscription package by packageId.
   */
  async getSubscriptionPackage(packageId) {
    this.apiURL = this.getApiURL(this.urlPath, `/packages/${packageId}`);
    return this.getData();
  }

  /**
   * Cancel subscription
   *
   * @param {string} subscriptionId The subscriptionId to cancel.
   * @return {object} cancelled subscription by subscriptionId.
   */
  async cancelSubscription(subscriptionId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${subscriptionId}`);
    return this.deleteData();
  }
}

export default new SubscriptionsApi();
