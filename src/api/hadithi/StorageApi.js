import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name StorageApi
 * @description Api Wrapper to manage Storage
 * @class
 * @public
 */

class StorageApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`storage/v1`);
  }

  /**
   * Upload object
   *
   * @param {string} imagePath The imagePath to upload to.
   * @param {Blob} imageFile The imageFile to upload.
   * @return {object} uploaded storage object
   */
  uploadObject(imagePath, imageFile) {
    const form = new FormData();
    form.append("upload_folder", imagePath);
    form.append("upload_file", imageFile);

    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(form, "none");
  }

  /**
   * Delete storage
   *
   * @param {object} storage The storage object to delete.
   * @return {object} deleted storage object
   */
  deleteObject(storage) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.deleteData(storage, "application/json");
  }
}

export default new StorageApi();
