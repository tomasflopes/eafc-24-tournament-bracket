export const formatDateDayMonthHourMin = (date: number): string => {
  const dateObj = new Date(date);
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const month = dateObj.toLocaleString("default", { month: "short" });
  return `${dateObj.getDate()} ${month} ${hour ? hour : "00"}:${
    minutes ? minutes : "00"
  }`;
};

export const parseDate = (date: string): Date => {
  const [datePart, timePart] = date.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const startDateTimeParsed = new Date(
    Date.UTC(year, month - 1, day, hours, minutes)
  );

  return startDateTimeParsed;
};
