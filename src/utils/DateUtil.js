function getFormattedDateString(dateTimestamp) {
  return new Date(dateTimestamp * 1000).toLocaleDateString();
}

function getCurrentDateAsUnixTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

function getCurrentDateMonthIntervalAsUnixTimestamp(monthInterval = 1) {
  return Math.floor(
    new Date(
      new Date().setMonth(new Date().getMonth() + monthInterval)
    ).getTime() / 1000
  );
}

export {
  getFormattedDateString,
  getCurrentDateAsUnixTimestamp,
  getCurrentDateMonthIntervalAsUnixTimestamp,
};
