import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name UnauthenticatedApi
 * @description Api Wrapper to manage Unauthenticated
 * @class
 * @public
 */

class UnauthenticatedApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super("");
  }

  /**
   * SignUp
   *
   * @param {object} account  account object for new account
   * @return {object} newly registered account
   */
  signUp(account) {
    this.apiURL = this.getApiURL(`sign-up/v1`);
    return this.postData(account);
  }

  /**
   * SignIn
   *
   * @param {object} auth  auth object with email and password
   * @return {object} authenticated account
   */
  signIn(auth) {
    this.apiURL = this.getApiURL(`sign-in/v1`);
    return this.postData(auth);
  }

  /**
   * VerifyAccount
   *
   * @param {string} accountId The accountId to verify.
   * @return {object} verified account status by accountId.
   */
  verifyAccount(accountId) {
    this.apiURL = this.getApiURL(`verify-account/v1`, `/${accountId}`);
    return this.getData();
  }

  /**
   * ForgotPassword
   *
   * @param {object} auth  auth object with email
   * @return {object} forgot account status
   */
  forgotPassword(auth) {
    this.apiURL = this.getApiURL(`forgot-password/v1`);
    return this.postData(auth);
  }
}

export default new UnauthenticatedApi();
