import JournalService from "@/services/JournalsService";
import SubscriptionsService from "@/services/SubscriptionsService";

async function accessJournal({to, next, store}) {
  const journalId = to.params.journalId;
  const journal = await JournalService.getJournal(journalId);
  const hasAccess = store.getters.getSubscription && SubscriptionsService.getResourceAccessSubscriptions("journal").includes(store.getters.getSubscription.name);

  if (journal["isFree"] || hasAccess) {
    return next();
  }

  return next({name: "Pricing"});
}

function adminJournal({to, next, store}) {
  const routeName = to.name;
  const routeToRole = {
    "AddJournal": "CAN_WRITE_JOURNAL",
    "EditJournal": "CAN_DELETE_JOURNAL"
  };
  const userPermissions = store.getters.getUserPermissions;
  const hasRole = (routeName in routeToRole);
  const hasPermission = userPermissions[routeToRole[routeName]];

  if(!hasRole || !hasPermission){
    alert('You are not allowed to access this route!');
    return;
  }
  return next();
}

export {
  accessJournal,
  adminJournal
};
