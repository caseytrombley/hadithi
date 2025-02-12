function getImageKitUrl(path, dimensions = null) {
    const imageKitBaseUrl = `https://ik.imagekit.io/picha/hadithi/`;
    const filename = path;

    if (dimensions !== null) {
        return `${imageKitBaseUrl}${filename}?tr=w-${dimensions.width},h-${dimensions.height},c-force,fo-auto`;
    }
    return `${imageKitBaseUrl}${filename}`;
}

export {
    getImageKitUrl
};
