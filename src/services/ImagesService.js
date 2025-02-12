import ImagesApi from "@/api/hadithi/ImagesApi";
import StorageService from "@/services/StorageService";

/**
 * @name ImagesService
 * @description Service to manage Item
 * @class
 * @public
 */

class ImagesService {

  /**
   * Add Image.
   *
   * @param {object} image  image to add
   * @return {promise} added image
   */
  async addImage(image) {
    return ImagesApi.addImage(image);
  }

  /**
   * Get image
   *
   * @param {string} imageId The imageId to fetch.
   * @return {promise} selected image.
   */
  async getImage(imageId) {
    return ImagesApi.getImage(imageId);
  }

  /**
   * Get all images
   *
   * @return {promise} all images.
   */
  async getImages() {
    const images = await ImagesApi.getImages();
    return Object.values(images);
  }

  /**
   * Update image
   *
   * @param {string} imageId The imageId to update.
   * @param {object} updates The image data to update.
   * @return {object} updated image.
   */
  async updateImage(imageId, updates) {
    const image = await this.getImage(imageId);
    return ImagesApi.updateImage(imageId, { ...image, ...updates });
  }

  /**
   * Delete image
   *
   * @param {string} imageId The imageId to delete.
   * @return {promise} deleted image.
   */
  async deleteImage(imageId) {
    const image = await this.getImage(imageId);
    await StorageService.deleteFile(image["filePath"]);
    return ImagesApi.deleteImage(imageId);
  }

  /**
   * Get all images by creator
   *
   * @param {string} creatorEmail The creatorEmail to filter by.
   * @return {promise} all items by creatorEmail.
   */
  async getImagesByCreator(creatorEmail) {
    const images = Object.values(await this.getImages());
    return images.filter(image => image.creatorEmail === creatorEmail);
  }
}

export default new ImagesService();
