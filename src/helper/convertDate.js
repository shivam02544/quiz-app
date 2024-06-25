export function convertToDateAndFormat(dateString) {
  const date = new Date(dateString);

  // Get individual components
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDate = `${day}/${month}/${year}  ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}
