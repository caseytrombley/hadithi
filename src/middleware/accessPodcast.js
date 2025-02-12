function adminPodcast({to, next, store}) {
    const routeName = to.name;
    const routeToRole = {
        "AddPodcast": "CAN_WRITE_PODCAST",
        "EditPodcast": "CAN_DELETE_PODCAST",
        "AddPodcastChapter": "CAN_WRITE_PODCAST",
        "EditPodcastChapter": "CAN_DELETE_PODCAST"
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
    adminPodcast
};
