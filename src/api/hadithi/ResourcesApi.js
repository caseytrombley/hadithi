import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name ResourcesApi
 * @description Api Wrapper to manage Resources
 * @class
 * @public
 */

class ResourcesApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`resources/v1`);
  }

  /**
   * Add resource
   *
   * @param {object} resource  resource to add
   * @return {object} added resource
   */
  addResource(resource) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(resource);
  }

  /**
   * Get resource
   *
   * @param {string} resourceId The resourceId to filter from resources.
   * @return {object} filtered resource by resourceId.
   */
  async getResource(resourceId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${resourceId}`);
    return this.getData();
  }

  /**
   * Get all resources
   *
   * @return {object} all resources.
   */
  async getResources() {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.getData();
  }

  /**
   * Delete resource
   *
   * @param {string} resourceId The resourceId to delete.
   * @return {object} deleted resource
   */
  deleteResource(resourceId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${resourceId}`);
    return this.deleteData();
  }

  /**
   * Update resource
   *
   * @param {string} resourceId The resourceId to update.
   * @param {object} resource The resource data to update.
   * @return {object} updated resource
   */
  updateResource(resourceId, resource) {
    this.apiURL = this.getApiURL(this.urlPath, `/${resourceId}`);
    return this.putData(resource);
  }
}

export default new ResourcesApi();
