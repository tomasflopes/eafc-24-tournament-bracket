export const formatDateDayMonthHourMin = (date: number): string => {
  const dateObj = new Date(date);
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const month = dateObj.toLocaleString("default", { month: "short" });

  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${dateObj.getDate()} ${month} ${formattedHour}:${formattedMinutes}`;
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
