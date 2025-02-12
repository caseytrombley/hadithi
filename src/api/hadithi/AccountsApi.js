import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name AccountsApi
 * @description Api Wrapper to manage Accounts
 * @class
 * @public
 */

class AccountsApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`accounts/v1`);
  }

  /**
   * Get profile
   *
   * @return {object} filtered account by accountId.
   */
  async getProfile() {
    this.apiURL = this.getApiURL(this.urlPath, `/profile`);
    return this.getData();
  }

  /**
   * Get all accounts
   *
   * @return {object} all accounts.
   */
  async getAccounts() {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.getData();
  }

  /**
   * Get account
   *
   * @param {string} accountId The accountId to filter from accounts.
   * @return {object} filtered account by accountId.
   */
  async getAccount(accountId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${accountId}`);
    return this.getData();
  }

  /**
   * Update account
   *
   * @param {string} accountId The accountId to update.
   * @param {object} account The account data to update.
   * @return {object} updated account
   */
  updateAccount(accountId, account) {
    this.apiURL = this.getApiURL(this.urlPath, `/${accountId}`);
    return this.putData(account);
  }

  /**
   * Change Password
   *
   * @param {string} accountId The accountId to get vehicles.
   * @param {object} newPassword The accountId and password to change update.
   * @return {object} changed password status
   */
  changePassword(accountId, newPassword) {
    this.apiURL = this.getApiURL(this.urlPath, `/${accountId}/change-password`);
    return this.postData(newPassword);
  }

  /**
   * Get account permissions
   *
   * @param {string} accountId The accountId to get permissions.
   * @return {object} account permissions by accountId.
   */
  async getAccountPermissions(accountId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${accountId}/permissions`);
    return this.getData();
  }

  /**
   * Get account permissions
   *
   * @param {string} accountId The accountId to get permissions.
   * @param {object} permissions The permissions data to update.
   * @return {object} account permissions by accountId.
   */
  async updateAccountPermissions(accountId, permissions) {
    this.apiURL = this.getApiURL(this.urlPath, `/${accountId}/permissions`);
    return this.putData(permissions);
  }

  /**
   * Get all account permissions
   *
   * @return {object} all account permissions.
   */
  async getAllAccountPermissions() {
    this.apiURL = this.getApiURL(this.urlPath, `/permissions/accounts`);
    return this.getData();
  }

  /**
   * Get default account permissions
   *
   * @return {object} default permissions.
   */
  async getDefaultAccountPermissions() {
    this.apiURL = this.getApiURL(this.urlPath, `/permissions/default`);
    return this.getData();
  }

  /**
   * Get account subscriptions
   *
   * @param {string} accountId The accountId to get subscription.
   * @return {object} account subscription by accountId.
   */
  async getAccountSubscription(accountId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${accountId}/subscription`);
    return this.getData();
  }
}

export default new AccountsApi();
