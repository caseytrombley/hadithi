import PodcastsApi from "@/api/hadithi/PodcastsApi";
import StorageService from "@/services/StorageService";

/**
 * @name PodcastsService
 * @description Service to manage Podcasts
 * @class
 * @public
 */

class PodcastsService {

  /**
   * Add Podcast
   *
   * @param {object} podcast The podcast to add
   * @return {promise} added podcast.
   */
  async addPodcast(podcast) {
    return PodcastsApi.addPodcast(podcast);
  }

  /**
   * Get Podcast
   *
   * @param {string} podcastId The podcast string
   * @return {promise} The podcast object
   */
  async getPodcast(podcastId) {
    return PodcastsApi.getPodcast(podcastId);
  }

  /**
   * Get Podcasts
   *
   * @return {promise} all podcasts.
   */
  async getPodcasts() {
    const podcasts = await PodcastsApi.getPodcasts();
    return Object.values(podcasts);
  }

  /**
   * Update Podcast
   *
   * @param {string} podcastId The podcastId to update
   * @param {object} updates The podcast to update
   * @return {promise} The updated podcast
   */
  async updatePodcast(podcastId, updates) {
    const podcast = await this.getPodcast(podcastId);
    return PodcastsApi.updatePodcast(podcastId, { ...podcast, ...updates });
  }

  /**
   * Delete Podcast
   *
   * @param {string} podcastId The podcast to delete
   * @return {promise} deleted podcast
   */
  async deletePodcast(podcastId) {
    const podcast = await this.getPodcast(podcastId);
    const chapters = await this.getPodcastChapters(podcastId);
    for (const chapter of chapters) {
      await this.deletePodcastChapter(podcastId, chapter["id"]);
    }
    await StorageService.deleteFile(podcast["coverPath"]);
    return PodcastsApi.deletePodcast(podcastId);
  }

  /**
   * Get Podcasts By Email
   *
   * @param {string} email The podcast creator email
   * @return {promise} all podcasts by email
   */
  async getPodcastsByEmail(email) {
    const podcasts = Object.values(await this.getPodcasts());
    return podcasts.filter(podcast => podcast.email === email);
  }

  /**
   * Get Published Podcasts and All Chapters
   *
   * @return {promise} all published podcasts and all chapters
   */
  async getPublishedPodcasts() {
    const podcasts = Object.values(await this.getPodcasts());
    return podcasts.filter(podcast => podcast.published === true);
  }

  /**
   * Add Podcast Chapter
   *
   * @param {string} podcastId The podcastId to add podcast chapter
   * @param {object} podcastChapter The podcast chapter to add
   * @return {promise} The updated podcast with added podcast chapter
   */
  async addPodcastChapter(podcastId, podcastChapter) {
    return PodcastsApi.addPodcastChapter(podcastId, podcastChapter);
  }

  /**
   * Get Podcast Chapter
   *
   * @param {string} podcastId The podcast string
   * @param {string} podcastChapterId The podcastChapterId to fetch
   * @return {promise} The podcast chapter object
   */
  async getPodcastChapter(podcastId, podcastChapterId) {
    return PodcastsApi.getPodcastChapter(podcastId, podcastChapterId);
  }

  /**
   * Get Podcast Chapters
   *
   * @param {string} podcastId The podcastId to fetch
   * @return {promise} all podcast chapters
   */
  async getPodcastChapters(podcastId) {
    return PodcastsApi.getPodcastChapters(podcastId);
  }

  /**
   * Update Podcast Chapter
   *
   * @param {string} podcastId The podcast to update chapter for
   * @param {string} podcastChapterId The podcast chapterId to update
   * @param {object} updates The podcast chapter data to update
   * @return {promise} The updated podcast chapter
   */
  async updatePodcastChapter(podcastId, podcastChapterId, updates) {
    const podcastChapter = await this.getPodcastChapter(podcastId, podcastChapterId);
    return PodcastsApi.updatePodcastChapter(podcastId, podcastChapterId, {...podcastChapter, ...updates})
  }

  /**
   * Delete Podcast Chapter
   *
   * @param {string} podcastId The podcastId to delete podcast chapter
   * @param {string} podcastChapterId The podcast chapterId to delete
   * @return {object} deleted podcast chapter
   */
  async deletePodcastChapter(podcastId, podcastChapterId) {
    const podcastChapter = await this.getPodcastChapter(podcastId, podcastChapterId);
    await StorageService.deleteFile(podcastChapter["feedPath"]);
    return PodcastsApi.deletePodcastChapter(podcastId, podcastChapterId);
  }

  /**
   * Get Podcast Published Chapters
   *
   * @param {string} podcastId The podcastId to fetch
   * @return {promise} all fetched podcast published chapters
   */
  async getPodcastPublishedChapters(podcastId) {
    const chapters = Object.values(await this.getPodcastChapters(podcastId));
    return chapters.filter(chapter => chapter.published === true);
  }
}

export default new PodcastsService();
