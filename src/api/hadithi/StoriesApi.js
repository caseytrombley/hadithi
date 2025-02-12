import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name StoriesApi
 * @description Api Wrapper to manage Stories
 * @class
 * @public
 */

class StoriesApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`stories/v1`);
  }

  /**
   * Add story
   *
   * @param {object} story  story to add
   * @return {object} added story
   */
  addStory(story) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(story);
  }

  /**
   * Get story
   *
   * @param {string} storyId The storyId to filter from stories.
   * @return {object} filtered story by storyId.
   */
  async getStory(storyId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${storyId}`);
    return this.getData();
  }

  /**
   * Get all stories
   *
   * @return {object} all stories.
   */
  async getStories() {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.getData();
  }

  /**
   * Delete story
   *
   * @param {string} storyId The storyId to delete.
   * @return {object} deleted story
   */
  deleteStory(storyId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${storyId}`);
    return this.deleteData();
  }

  /**
   * Update story
   *
   * @param {string} storyId The storyId to update.
   * @param {object} story The story data to update.
   * @return {object} updated story
   */
  updateStory(storyId, story) {
    this.apiURL = this.getApiURL(this.urlPath, `/${storyId}`);
    return this.putData(story);
  }
}

export default new StoriesApi();
