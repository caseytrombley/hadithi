import JournalsApi from "@/api/hadithi/JournalsApi";

/**
 * @name JournalsService
 * @description Service to manage Journals
 * @class
 * @public
 */

class JournalsService {

  /**
   * Add Journal.
   *
   * @param {object} journal journal to add
   * @return {object} added journal
   */
  async addJournal(journal) {
    journal.status = "draft";
    return JournalsApi.addJournal(journal);
  }

  /**
   * Get Journal
   *
   * @param {string} journalId The journalId to fetch.
   * @return {promise} selected journal.
   */
  async getJournal(journalId) {
    return JournalsApi.getJournal(journalId);
  }

  /**
   * Get journals
   *
   * @return {object} all journals.
   */
  async getJournals() {
    const journals = await JournalsApi.getJournals();
    return Object.values(journals);
  }

  /**
   * Update journal
   *
   * @param {string} journalId The journalId to update.
   * @param {object} updates The journal data to update.
   * @return {object} updated journal.
   */
  async updateJournal(journalId, updates) {
    const journal = await this.getJournal(journalId);
    return JournalsApi.updateJournal(journalId, { ...journal, ...updates });
  }

  /**
   * Delete journal
   *
   * @param {string} journalId The journalId to delete.
   * @return {object} deleted journal
   */
  async deleteJournal(journalId) {
    return JournalsApi.deleteJournal(journalId);
  }

  /**
   * Get journals by email
   *
   * @param {string} email The email to fetch.
   * @return {promise} journals by email.
   */
  async getJournalsByEmail(email) {
    const journals = await this.getJournals();
    return journals.filter(journal => journal.email === email);
  }

  /**
   * Get published journals
   *
   * @return {promise} published journals.
   */
  async getPublishedJournals() {
    const journals = await this.getJournals();
    return journals.filter(journal => journal.published === true);
  }

  /**
   * Get journals types
   *
   * @return {array<string>} journal types.
   */
  getJournalTypes() {
    return ["Green", "White"];
  }

  /**
   * Get published journals by type
   *
   * @param {string} type The email to fetch.
   * @return {promise} journals by type.
   */
  async getPublishedJournalsByType(type) {
    const journals = Object.values(await this.getPublishedJournals());
    return journals.filter(journal => journal.type === type);
  }
}

export default new JournalsService();
