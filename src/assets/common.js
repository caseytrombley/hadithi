function contextMenuListener() {
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
}

export {
    contextMenuListener
}
