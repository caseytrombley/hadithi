export default function isSubscribed({ next, store }) {
  if (!store.getters.loggedIn && !store.getters.isSubscribed) {
    return next({
      name: "Paywall",
    });
  }
  if (store.getters.loggedIn && !store.getters.isSubscribed) {
    return next({
      name: "Pricing",
    });
  }
  return next();
}
