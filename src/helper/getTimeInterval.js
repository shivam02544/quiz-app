export function getTimeInterval(date1, date2) {
  // Parse the dates
  const start = new Date(date1);
  const end = new Date(date2);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = end - start;

  // Convert the difference to minutes and seconds
  const minutes = Math.floor(differenceInMilliseconds / 60000);
  const seconds = Math.floor((differenceInMilliseconds % 60000) / 1000);

  return `${minutes} minute(s) and ${seconds} second(s)`;
}
