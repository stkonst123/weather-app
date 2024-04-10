const addDays = (date: Date, days: number): Date => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getTwoWeeksDate = (date: Date): string => {
  const twoWeeksDate = addDays(new Date(), 14);
  const year = twoWeeksDate.getFullYear();
  const month = (twoWeeksDate.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 });
  const day = twoWeeksDate.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2 });

  return `${year}/${month}/${day}`;
};
