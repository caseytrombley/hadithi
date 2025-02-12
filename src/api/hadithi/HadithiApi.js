import { getRequest, postRequest, deleteRequest, putRequest } from "@/utils/RequestUtil";

/**
 * @name HadithiApi
 * @description Hadithi Api Base Class Wrapper
 * @class
 * @public
 */

class HadithiApi {
  /**
   * urlPath is hadithi api url path endpoint
   * @type {string}
   * @public
   */
  constructor(urlPath) {
    this.baseURL = `${process.env.VUE_APP_API_URL}`;
    this.urlPath = `${urlPath}`;
    this.apiURL = this.getApiURL(this.urlPath);
    this.contentType = "application/json";
  }

  /**
   * Get apiURL
   *
   * @param urlPath urlPath
   * @param urlQuery urlQuery
   * @return {String} apiURL
   */
  getApiURL(urlPath, urlQuery = "") {
    return `${this.baseURL}/${urlPath}${urlQuery}`;
  }

  /**
   * Get apiSecretKey
   *
   * @return {String} apiSecretKey
   */
  getApiSecretKey() {
    return `${localStorage.getItem("access_token")}`;
  }

  /**
   * Get requested data
   *
   * @return {object} all data requested.
   */
  getData() {
    return getRequest(this.apiURL, this.contentType, this.getApiSecretKey());
  }

  /**
   * Post request data
   *
   * @param {object} data The data to create.
   * @param {string} contentType The request contentType.
   * @return {object} all data posted.
   */
  postData(data, contentType = "application/json") {
    if (contentType) {
      this.contentType = contentType;
    }
    return postRequest(this.apiURL, this.contentType, this.getApiSecretKey(), data);
  }

  /**
   * Delete request data
   *
   * @param {object} data The data to create.
   * @param {string} contentType The request contentType.
   * @return {object} all data deleted.
   */
  deleteData(data = {}, contentType = "") {
    if (contentType) {
      this.contentType = contentType;
    }
    return deleteRequest(this.apiURL, this.contentType, this.getApiSecretKey(), data);
  }

  /**
   * Put request data
   *
   * @param {object} data The data to update.
   * @param {string} contentType The request contentType.
   * @return {object} all data posted.
   */
  putData(data, contentType = "application/json") {
    if (contentType) {
      this.contentType = contentType;
    }
    return putRequest(this.apiURL, this.contentType, this.getApiSecretKey(), data);
  }
}

export default HadithiApi;
