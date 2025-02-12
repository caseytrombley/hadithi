import BooksApi from "@/api/hadithi/BooksApi";
import StorageService from "@/services/StorageService";

/**
 * @name BooksService
 * @description Service to manage Books
 * @class
 * @public
 */

class BookService {

  /**
   * Add Book.
   *
   * @param {object} book  book to add
   * @return {promise} added book
   */
  async addBook(book) {
    return BooksApi.addBook(book);
  }

  /**
   * Get book
   *
   * @param {string} bookId The bookId to fetch.
   * @return {promise} selected book.
   */
  async getBook(bookId) {
    return BooksApi.getBook(bookId);
  }

  /**
   * Get all books
   *
   * @return {promise} all books.
   */
  async getBooks() {
    const books = await BooksApi.getBooks();
    return Object.values(books);
  }

  /**
   * Update book
   *
   * @param {string} bookId The bookId to update.
   * @param {object} updates The book data to update.
   * @return {promise} updated book.
   */
  async updateBook(bookId, updates) {
    const book = await this.getBook(bookId);
    return BooksApi.updateBook(bookId, { ...book, ...updates });
  }

  /**
   * Delete book
   *
   * @param {string} bookId The book to delete.
   * @return {object} deleted book.
   */
  async deleteBook(bookId) {
    const book = await this.getBook(bookId);
    await StorageService.deleteFile(book["coverPath"]);
    await StorageService.deleteFile(book["locationPath"]);
    return BooksApi.deleteBook(bookId);
  }

  /**
   * Get all books by creator
   *
   * @param {string} creatorEmail The creatorEmail to filter by.
   * @return {promise} all books by creatorEmail.
   */
  async getBooksByCreator(creatorEmail) {
    const books = Object.values(await this.getBooks());
    return books.filter(book => book.creatorEmail === creatorEmail);
  }
}

export default new BookService();
