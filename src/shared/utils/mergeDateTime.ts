export function mergeDatePart(currentValue: Date | undefined, selectedDate: Date) {
  const nextDate = currentValue ? new Date(currentValue) : new Date();

  nextDate.setFullYear(selectedDate.getFullYear());
  nextDate.setMonth(selectedDate.getMonth());
  nextDate.setDate(selectedDate.getDate());

  return nextDate;
}

export function mergeTimePart(currentValue: Date | undefined, selectedTime: Date) {
  const nextDate = currentValue ? new Date(currentValue) : new Date();

  nextDate.setHours(selectedTime.getHours());
  nextDate.setMinutes(selectedTime.getMinutes());
  nextDate.setSeconds(0);
  nextDate.setMilliseconds(0);

  return nextDate;
}
