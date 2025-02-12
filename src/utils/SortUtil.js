function booleanFieldSort(dataset, datasetField) {
    return dataset.sort((a, b) => Number(b[datasetField]) - Number(a[datasetField]));
}

function timestampFieldSort(dataset, datasetField) {
    return dataset.sort((a,b) =>  new Date(b[datasetField]) - new Date(a[datasetField]));
}

function randomSort(items) {
    //Uses Modern Fisher-Yates Shuffle; Complexity: Time O(n), Space O(1)
    let tmp, current, top = items.length;

    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = items[current];
        items[current] = items[top];
        items[top] = tmp;
    }

    return items;
}

export {
    booleanFieldSort,
    timestampFieldSort,
    randomSort
};
