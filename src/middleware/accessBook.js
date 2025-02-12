import BooksService from "@/services/BooksService";
import SubscriptionsService from "@/services/SubscriptionsService";

export default async function accessBook({to, next, store}) {
  const bookId = to.params.bookId;
  const book = await BooksService.getBook(bookId);
  const hasAccess = store.getters.getSubscription && SubscriptionsService.getResourceAccessSubscriptions("book").includes(store.getters.getSubscription.name);

  if (book["isFree"] || hasAccess) {
    return next();
  }
  return next({name: "Pricing"});
}
