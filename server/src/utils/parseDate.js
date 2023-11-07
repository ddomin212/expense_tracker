function parseDate(dateString) {
  let [date, timezone] = dateString.split("+");
  let [year, month, day] = date.split("-").map((x) => parseInt(x, 10));
  let offset = parseInt(timezone, 10);
  let offsetHours = Math.floor(offset / 100);
  let offsetMinutes = offset % 100;

  let dateObj = new Date(
    Date.UTC(year, month - 1, day, offsetHours, offsetMinutes)
  );
  return dateObj;
}
module.exports = parseDate;
