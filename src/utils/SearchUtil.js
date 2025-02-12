function filterByValue(array, string) {
  return array.filter(o =>
    Object.keys(o).some(k => (o[k] != null && typeof o[k] === "string" ? o[k].toLowerCase().includes(string.toLowerCase()) : null)));
}

export {
  filterByValue
};
