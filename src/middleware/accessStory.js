import StoryService from "@/services/StoriesService";
import SubscriptionsService from "@/services/SubscriptionsService";

async function accessStory({to, next, store}) {
    const storyId = to.params.storyId;
    const story = await StoryService.getStory(storyId);
    const hasAccess = store.getters.getSubscription && SubscriptionsService.getResourceAccessSubscriptions("story").includes(store.getters.getSubscription.name);

    if (story["isFree"] || hasAccess) {
        return next();
    }
    return next({name: "Pricing"});
}

function adminStory({to, next, store}) {
    const routeName = to.name;
    const routeToRole = {
        "AddStory": "CAN_WRITE_STORY",
        "EditStory": "CAN_DELETE_STORY"
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
    accessStory,
    adminStory
};
