function useFormatTime(date) {
  const _date = new Date(date);

  const hours = _date.getUTCHours();
  const minutes = _date.getUTCMinutes();

  const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
  const period = hours < 12 ? "AM" : "PM";

  const formattedTime = `${formattedHours}:${String(minutes).padStart(
    2,
    "0",
  )} ${period}`;

  return formattedTime;
}

export default useFormatTime;
