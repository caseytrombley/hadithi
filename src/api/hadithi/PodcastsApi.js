import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name PodcastsApi
 * @description Api Wrapper to manage Podcasts
 * @class
 * @public
 */

class PodcastsApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`podcasts/v1`);
  }

  /**
   * Add podcast
   *
   * @param {object} podcast  podcast to add
   * @return {object} added podcast
   */
  addPodcast(podcast) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(podcast);
  }

  /**
   * Get podcast
   *
   * @param {string} podcastId The podcastId to filter from podcasts.
   * @return {object} filtered podcast by podcastId.
   */
  async getPodcast(podcastId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${podcastId}`);
    return this.getData();
  }

  /**
   * Get all podcasts
   *
   * @return {object} all podcasts.
   */
  async getPodcasts() {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.getData();
  }

  /**
   * Delete podcast
   *
   * @param {string} podcastId The podcastId to delete.
   * @return {object} deleted podcast
   */
  deletePodcast(podcastId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${podcastId}`);
    return this.deleteData();
  }

  /**
   * Update podcast
   *
   * @param {string} podcastId The podcastId to update.
   * @param {object} podcast The podcast data to update.
   * @return {object} updated podcast
   */
  updatePodcast(podcastId, podcast) {
    this.apiURL = this.getApiURL(this.urlPath, `/${podcastId}`);
    return this.putData(podcast);
  }

  /**
   * Get podcast chapters
   *
   * @param {string} podcastId The podcastId to get chapters.
   * @return {object} podcast chapters by podcastId.
   */
  async getPodcastChapters(podcastId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${podcastId}/chapters`);
    return this.getData();
  }

  /**
   * Add podcast chapter
   *
   * @param {string} podcastId The podcastId to add chapter to.
   * @param {object} chapter  chapter to add
   * @return {object} added chapter
   */
  addPodcastChapter(podcastId, chapter) {
    this.apiURL = this.getApiURL(this.urlPath, `/${podcastId}/chapters`);
    return this.postData(chapter);
  }

  /**
   * Get podcast chapter
   *
   * @param {string} podcastId The podcastId to get chapter from.
   * @param {string} chapterId The chapterId to filter from podcast chapters.
   * @return {object} filtered chapter by podcastId and chapterId.
   */
  async getPodcastChapter(podcastId, chapterId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${podcastId}/chapters/${chapterId}`);
    return this.getData();
  }

  /**
   * Update podcast chapter
   *
   * @param {string} podcastId The podcastId to get chapter from.
   * @param {string} chapterId The chapterId to filter from podcast chapter.
   * @param {object} chapter  chapter to update.
   * @return {object} filtered chapter by podcastId and chapterId.
   */
  async updatePodcastChapter(podcastId, chapterId, chapter) {
    this.apiURL = this.getApiURL(this.urlPath, `/${podcastId}/chapters/${chapterId}`);
    return this.putData(chapter);
  }

  /**
   * Delete podcast chapter
   *
   * @param {string} podcastId The podcastId to delete chapter from.
   * @param {string} chapterId The chapterId to filter from podcast chapters.
   * @return {object} deleted chapter by podcastId and chapterId.
   */
  async deletePodcastChapter(podcastId, chapterId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${podcastId}/chapters/${chapterId}`);
    return this.deleteData();
  }
}

export default new PodcastsApi();
