import UnauthenticatedApi from "@/api/hadithi/UnauthenticatedApi";
import AccountsApi from "@/api/hadithi/AccountsApi";

/**
 * @name AccountsService
 * @description Service to manage Accounts
 * @class
 * @public
 */

class AccountsService {

  /**
   * Add Account.
   *
   * @param {object} account  account to add
   * @return {object} added account
   */
  async addAccount(account) {
    const newAccount = await UnauthenticatedApi.signUp(account);
    const isCreated = newAccount && ("id" in newAccount);

    let response = {
      status: "error",
      message: "Account was not created successfully"
    };

    if (isCreated) {
      response = {
        status: "success",
        message: "Account created successfully",
        id: newAccount.id
      };
    }
    return response;
  }

  /**
   * authenticateAccount.
   *
   * @param {email} email  account email
   * @param {string} password  account password
   * @return {object} authenticated account
   */
  async authenticateAccount(email, password) {
    const auth = await UnauthenticatedApi.signIn({ "email": email, "password": password });
    const isAuthenticated = auth && ("access_token" in auth);

    let response = {
      status: "error",
      message: "Invalid Account credentials or Account not Verified"
    };

    if (isAuthenticated) {
      localStorage.setItem("access_token", auth["access_token"]);
      localStorage.setItem("access_token_expiry_time", auth["access_token_expiry_time"]);
      response = auth;
    }
    return response;
  }

  /**
   * Get profile
   *
   * @return {promise} profile.
   */
  async getProfile() {
    return AccountsApi.getProfile();
  }

  /**
   * Get accounts
   *
   * @return {promise} all accounts.
   */
  async getAccounts() {
    const accounts = await AccountsApi.getAccounts();
    return Object.values(accounts);
  }

  /**
   * Get account
   *
   * @param {string} accountId The accountId to fetch.
   * @return {promise} selected account.
   */
  async getAccount(accountId) {
    return AccountsApi.getAccount(accountId);
  }

  /**
   * Update account
   *
   * @param {string} accountId The accountId to update.
   * @param {object} updates The account data to update.
   * @return {object} updated account.
   */
  async updateAccount(accountId, updates) {
    const account = await this.getAccount(accountId);
    return AccountsApi.updateAccount(accountId, { ...account, ...updates });
  }

  /**
   * Change Password
   *
   * @param {string} accountId The accountId to change its password.
   * @param {object} newPassword The newPassword to change.
   * @return {object} changed password status
   */
  async changePassword(accountId, newPassword) {
    return AccountsApi.changePassword(accountId, newPassword);
  }

  /**
   * Verify Account
   *
   * @param {string} accountId The accountId to verify.
   * @return {object} verified account status
   */
  async verifyAccount(accountId) {
    return UnauthenticatedApi.verifyAccount(accountId);
  }

  /**
   * Forgot Password
   *
   * @param {object} auth The auth object with email of forgotten password.
   * @return {object} forgotten password account status
   */
  async forgotPassword(auth) {
    return UnauthenticatedApi.forgotPassword(auth);
  }

  /**
   * Get account permissions
   *
   * @param {string} accountId The accountId to fetch.
   * @return {promise} account permissions.
   */
  async getAccountPermissions(accountId) {
    return AccountsApi.getAccountPermissions(accountId);
  }

  /**
   * Update account permissions
   *
   * @param {string} accountId The accountId to fetch.
   * @param {object} permissions The permissions to update.
   * @return {promise} updated account permissions.
   */
  async updateAccountPermissions(accountId, permissions) {
    return AccountsApi.updateAccountPermissions(accountId, permissions);
  }

  /**
   * Get all account permissions
   *
   * @return {promise} all account permissions.
   */
  async getAllAccountPermissions() {
    return AccountsApi.getAllAccountPermissions();
  }

  /**
   * Get default account permissions
   *
   * @return {promise} default account permissions.
   */
  async getDefaultAccountPermissions() {
    return AccountsApi.getDefaultAccountPermissions();
  }

  /**
   * Get account subscription
   *
   * @param {string} accountId The accountId to fetch.
   * @return {promise} account subscriptions.
   */
  async getAccountSubscription(accountId) {
    return AccountsApi.getAccountSubscription(accountId);
  }
}

export default new AccountsService();
