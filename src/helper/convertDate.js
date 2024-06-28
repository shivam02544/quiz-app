export function convertToDateAndFormat(dateString) {
  // Create a new Date object from the timestamp
  // Convert date string to Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }

  // Format options
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // This will format the time in 12-hour format with AM/PM
  };

  // Format date to locale date and time string
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
}
