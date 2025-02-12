/**
 * @name CommentsService
 * @description Service to manage Comments
 * @class
 * @public
 */
import CommentsApi from "@/api/hadithi/CommentsApi";

class CommentsService {

  /**
   * Add Comment.
   *
   * @param {string} category The category to comment on.
   * @param {string} categoryId The categoryId to filter from category.
   * @param {object} comment  comment to add
   * @return {object} added comment
   */
  async addComment(category, categoryId, comment) {
    return CommentsApi.addComment(category, categoryId, comment);
  }

  /**
   * Get all comments
   *
   * @param {string} category The category to comment on.
   * @param {string} categoryId The categoryId to filter from category.
   * @return {object} all comments.
   */
  async getComments(category, categoryId) {
    return CommentsApi.getComments(category, categoryId);
  }
}

export default new CommentsService();
