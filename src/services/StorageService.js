import StorageApi from "@/api/hadithi/StorageApi";

/**
 * @name StorageService
 * @description Service to manage Storage
 * @class
 * @public
 */

class StorageService {

  /**
   * Upload file
   *
   * @param {string} filePath The filePath to upload to.
   * @param {Blob} file The file to upload.
   * @return {promise} uploaded filePath and fileUrl.
   */
  async uploadFile(filePath, file) {
    const uploadedImage = await StorageApi.uploadObject(filePath, file);
    return uploadedImage.url;
  }

  /**
   * Delete file
   *
   * @param {string} filePath The filePath to delete.
   * @return {promise} deleted file.
   */
  async deleteFile(filePath) {
    return StorageApi.deleteObject({ "path": filePath });
  }
}

export default new StorageService();
