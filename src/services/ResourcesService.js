import ResourcesApi from "@/api/hadithi/ResourcesApi";
import StorageService from "@/services/StorageService";

/**
 * @name ResourcesService
 * @description Service to manage Resources
 * @class
 * @public
 */

class ResourcesService {

  /**
   * Add Resource.
   *
   * @param {object} resource  resource to add
   * @return {promise} added resource
   */
  async addResource(resource) {
    return ResourcesApi.addResource(resource);
  }

  /**
   * Get resource
   *
   * @param {string} resourceId The resourceId to fetch.
   * @return {promise} selected resource.
   */
  async getResource(resourceId) {
    return ResourcesApi.getResource(resourceId);
  }

  /**
   * Get all resources
   *
   * @return {promise} all resources.
   */
  async getResources() {
    const resources = await ResourcesApi.getResources();
    return Object.values(resources);
  }

  /**
   * Update resource
   *
   * @param {string} resourceId The resourceId to update.
   * @param {object} updates The resource data to update.
   * @return {promise} updated resource.
   */
  async updateResource(resourceId, updates) {
    const resource = await this.getResource(resourceId);
    return ResourcesApi.updateResource(resourceId, { ...resource, ...updates });
  }

  /**
   * Delete resource
   *
   * @param {string} resourceId The resourceId to delete.
   * @return {object} deleted resource.
   */
  async deleteResource(resourceId) {
    const resource = await this.getResource(resourceId);
    await StorageService.deleteFile(resource["locationPath"]);
    return ResourcesApi.deleteResource(resourceId);
  }

  /**
   * Get all resources by email
   *
   * @param {string} email The email to filter by.
   * @return {promise} all resources by email.
   */
  async getResourcesByEmail(email) {
    const resources = Object.values(await this.getResources());
    return resources.filter(resource => resource.email === email);
  }

  /**
   * Get all published resources
   *
   * @return {promise} all published resources.
   */
  async getPublishedResources() {
    const resources = Object.values(await this.getResources());
    return resources.filter(resource => resource.published === true);
  }
}

export default new ResourcesService();
