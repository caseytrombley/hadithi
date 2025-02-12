import ResourceService from "@/services/ResourcesService";
import SubscriptionsService from "@/services/SubscriptionsService";

async function accessResource({to, next, store}) {
    const resourceId = to.params.resourceId;
    const resource = await ResourceService.getResource(resourceId);
    const hasAccess = store.getters.getSubscription && SubscriptionsService.getResourceAccessSubscriptions("resource").includes(store.getters.getSubscription.name);

    if (resource["isFree"] || hasAccess) {
        return next();
    }

    return next({name: "Pricing"});
}

function adminResource({to, next, store}) {
    const routeName = to.name;
    const routeToRole = {
        "AddResource": "CAN_WRITE_RESOURCE",
        "EditResource": "CAN_DELETE_RESOURCE"
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
    accessResource,
    adminResource
};
