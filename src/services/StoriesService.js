import StoriesApi from "@/api/hadithi/StoriesApi";

/**
 * @name StoriesService
 * @description Service to manage Stories
 * @class
 * @public
 */

class StoriesService {

    /**
     * Add Story.
     *
     * @param {object} story  story to add
     * @return {object} added story
     */
    async addStory(story) {
        story.status = "draft";
        return StoriesApi.addStory(story);
    }

    /**
     * Get story
     *
     * @param {string} storyId The storyId to fetch.
     * @return {promise} selected story.
     */
    async getStory(storyId) {
        return StoriesApi.getStory(storyId);
    }

    /**
     * Get stories
     *
     * @return {object} all stories.
     */
    async getStories() {
        const stories = await StoriesApi.getStories();
        return Object.values(stories);
    }

    /**
     * Update story
     *
     * @param {string} storyId The storyId to update.
     * @param {object} updates The story data to update.
     * @return {object} updated story.
     */
    async updateStory(storyId, updates) {
        const story = await this.getStory(storyId);
        return StoriesApi.updateStory(storyId, {...story, ...updates});
    }

    /**
     * Delete story
     *
     * @param {string} storyId The storyId to delete.
     * @return {object} deleted story
     */
    async deleteStory(storyId) {
        return StoriesApi.deleteStory(storyId);
    }

    /**
     * Get stories by email
     *
     * @param {string} email The email to fetch.
     * @return {promise} stories by email.
     */
    async getStoriesByEmail(email) {
        const stories = await this.getStories();
        return stories.filter(story => story.email === email);
    }

    /**
     * Get published stories
     *
     * @return {promise} published stories.
     */
    async getPublishedStories() {
        const stories = await this.getStories();
        return stories.filter(story => story.published === true);
    }
}

export default new StoriesService();
