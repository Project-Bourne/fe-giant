function useFormatDate(date) {
  const _date = new Date(date);

  const day = String(_date.getDate()).padStart(2, "0");
  const month = String(_date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(_date.getFullYear()).slice(-2);

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

export default useFormatDate;
