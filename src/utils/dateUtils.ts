export const formatDateDayMonthHourMin = (date: number): string => {
  const dateObj = new Date(date);
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const month = dateObj.toLocaleString('default', { month: 'short' });
  return `${dateObj.getDate()} ${month} ${hour ? hour : '00'}:${minutes ? minutes : '00'}`;
};