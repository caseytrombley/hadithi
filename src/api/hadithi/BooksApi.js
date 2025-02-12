import HadithiApi from "@/api/hadithi/HadithiApi";

/**
 * @name BooksApi
 * @description Api Wrapper to manage Books
 * @class
 * @public
 */

class BooksApi extends HadithiApi {
  /**
   * uriSegment is api uri segment
   * @type {string}
   * @public
   */
  constructor() {
    super(`books/v1`);
  }

  /**
   * Add book
   *
   * @param {object} book  book to add
   * @return {object} added book
   */
  addBook(book) {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.postData(book);
  }

  /**
   * Get book
   *
   * @param {string} bookId The bookId to filter from books.
   * @return {object} filtered book by bookId.
   */
  async getBook(bookId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${bookId}`);
    return this.getData();
  }

  /**
   * Get all books
   *
   * @return {object} all books.
   */
  async getBooks() {
    this.apiURL = this.getApiURL(this.urlPath);
    return this.getData();
  }

  /**
   * Delete book
   *
   * @param {string} bookId The bookId to delete.
   * @return {object} deleted book
   */
  deleteBook(bookId) {
    this.apiURL = this.getApiURL(this.urlPath, `/${bookId}`);
    return this.deleteData();
  }

  /**
   * Update book
   *
   * @param {string} bookId The bookId to update.
   * @param {object} book The book data to update.
   * @return {object} updated book
   */
  updateBook(bookId, book) {
    this.apiURL = this.getApiURL(this.urlPath, `/${bookId}`);
    return this.putData(book);
  }
}

export default new BooksApi();
