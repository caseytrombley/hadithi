import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name JournalsApi
 * @description Api Wrapper to manage Journals
 * @class
 * @public
 */

class JournalsApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`journals/v1`);
  }

  /**
   * Add journal
   *
   * @param {object} journal  journal to add
   * @return {object} added journal
   */
  addJournal(journal) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(journal);
  }

  /**
   * Get journal
   *
   * @param {string} journalId The journalId to filter from journals.
   * @return {object} filtered journal by journalId.
   */
  async getJournal(journalId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${journalId}`);
    return this.getData();
  }

  /**
   * Get all journals
   *
   * @return {object} all journals.
   */
  async getJournals() {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.getData();
  }

  /**
   * Delete journal
   *
   * @param {string} journalId The journalId to delete.
   * @return {object} deleted journal
   */
  deleteJournal(journalId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${journalId}`);
    return this.deleteData();
  }

  /**
   * Update journal
   *
   * @param {string} journalId The journalId to update.
   * @param {object} journal The journal data to update.
   * @return {object} updated journal
   */
  updateJournal(journalId, journal) {
    this.apiURL = this.getApiURL(this.urlPath, `/${journalId}`);
    return this.putData(journal);
  }
}

export default new JournalsApi();
