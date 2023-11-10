/**
 * Parses a date string with timezone offset into a Date object.
 * @param {string} dateString - The date string in the format of "YYYY-MM-DD+HHMM".
 * @returns {Date} - The parsed Date object.
 */
function parseDate(dateString) {
  // Split the date string into date and timezone offset.
  let [date, timezone] = dateString.split("+");

  // Split the date into year, month, and day, and parse them as integers.
  let [year, month, day] = date.split("-").map((x) => parseInt(x, 10));

  // Parse the timezone offset as an integer.
  let offset = parseInt(timezone, 10);

  // Calculate the offset hours and minutes from the offset integer.
  let offsetHours = Math.floor(offset / 100);
  let offsetMinutes = offset % 100;

  // Create a new Date object with the parsed date and timezone offset.
  let dateObj = new Date(
    Date.UTC(year, month - 1, day, offsetHours, offsetMinutes)
  );

  // Return the parsed Date object.
  return dateObj;
}

// Export the parseDate function as a module.
module.exports = parseDate;
