import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name CommentsApi
 * @description Api Wrapper to manage Comments
 * @class
 * @public
 */

class CommentsApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`comments/v1`);
  }

  /**
   * Add comment
   *
   * @param {string} category The category to comment on.
   * @param {string} categoryId The categoryId to filter from category.
   * @param {object} comment  comment to add
   * @return {object} added comment
   */
  addComment(category, categoryId, comment) {
    this.apiURL = this.getApiURL(this.urlPath, `/${category}/${categoryId}`);
    return this.postData(comment);
  }

  /**
   * Get all comments
   *
   * @param {string} category The category to comment on.
   * @param {string} categoryId The categoryId to filter from category.
   * @return {object} all comments.
   */
  async getComments(category, categoryId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${category}/${categoryId}`);
    return this.getData();
  }
}

export default new CommentsApi();
