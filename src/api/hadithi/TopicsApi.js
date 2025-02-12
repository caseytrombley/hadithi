import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name TopicsApi
 * @description Api Wrapper to manage Topics
 * @class
 * @public
 */

class TopicsApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`topics/v1`);
  }

  /**
   * Add topic
   *
   * @param {object} topic  topic to add
   * @return {object} added topic
   */
  addTopic(topic) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(topic);
  }

  /**
   * Get topic
   *
   * @param {string} topicId The topicId to filter from topics.
   * @return {object} filtered topic by topicId.
   */
  async getTopic(topicId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${topicId}`);
    return this.getData();
  }

  /**
   * Get all topics
   *
   * @return {object} all topics.
   */
  async getTopics() {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.getData();
  }

  /**
   * Delete topic
   *
   * @param {string} topicId The topicId to delete.
   * @return {object} deleted topic
   */
  deleteTopic(topicId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${topicId}`);
    return this.deleteData();
  }

  /**
   * Update topic
   *
   * @param {string} topicId The topicId to update.
   * @param {object} topic The topic data to update.
   * @return {object} updated topic
   */
  updateTopic(topicId, topic) {
    this.apiURL = this.getApiURL(this.urlPath, `/${topicId}`);
    return this.putData(topic);
  }
}

export default new TopicsApi();
