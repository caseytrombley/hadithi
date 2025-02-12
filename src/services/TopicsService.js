import TopicsApi from "@/api/hadithi/TopicsApi";

/**
 * @name TopicsService
 * @description Service to manage Topics
 * @class
 * @public
 */

class TopicsService {

  /**
   * Add Topic.
   *
   * @param {object} topic topic to add
   * @return {promise} added topic
   */
  async addTopic(topic) {
    return TopicsApi.addTopic(topic);
  }

  /**
   * Get topic
   *
   * @param {string} topicId The topicId to fetch.
   * @return {promise} selected topic.
   */
  async getTopic(topicId) {
    return TopicsApi.getTopic(topicId);
  }

  /**
   * Get all topics
   *
   * @return {promise} all topics.
   */
  async getTopics() {
    const topics = await TopicsApi.getTopics();
    return Object.values(topics);
  }

  /**
   * Update topic
   *
   * @param {string} topicId The topicId to update.
   * @param {object} updates The topic data to update.
   * @return {promise} updated book.
   */
  async updateTopic(topicId, updates) {
    const topic = await this.getTopic(topicId);
    return TopicsApi.updateTopic(topicId, { ...topic, ...updates });
  }

  /**
   * Delete topic
   *
   * @param {string} topicId The topic to delete.
   * @return {object} deleted topic.
   */
  async deleteTopic(topicId) {
    return TopicsApi.deleteTopic(topicId);
  }
}

export default new TopicsService();
