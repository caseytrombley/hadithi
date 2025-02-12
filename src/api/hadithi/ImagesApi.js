import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name ImagesApi
 * @description Api Wrapper to manage Images
 * @class
 * @public
 */

class ImagesApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`images/v1`);
  }

  /**
   * Add image
   *
   * @param {object} image  image to add
   * @return {object} added image
   */
  addImage(image) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(image);
  }

  /**
   * Get image
   *
   * @param {string} imageId The imageId to filter from images.
   * @return {object} filtered image by imageId.
   */
  async getImage(imageId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${imageId}`);
    return this.getData();
  }

  /**
   * Get all images
   *
   * @return {object} all images.
   */
  async getImages() {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.getData();
  }

  /**
   * Delete image
   *
   * @param {string} imageId The imageId to delete.
   * @return {object} deleted image
   */
  deleteImage(imageId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${imageId}`);
    return this.deleteData();
  }

  /**
   * Update image
   *
   * @param {string} imageId The imageId to update.
   * @param {object} image The image data to update.
   * @return {object} updated image
   */
  updateImage(imageId, image) {
    this.apiURL = this.getApiURL(this.urlPath, `/${imageId}`);
    return this.putData(image);
  }
}

export default new ImagesApi();
