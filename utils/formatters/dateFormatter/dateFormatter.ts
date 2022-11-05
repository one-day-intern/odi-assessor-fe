interface DateFormatterOptions {
  isConditional?: boolean;
  returnsComplete?: boolean;
  showsTime?: boolean;
  nowDate?: Date,
}

const dateFormatter = (
  date: Date,
  options?: DateFormatterOptions
): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatsConditionally = options?.isConditional ?? true;

  if (formatsConditionally) {
    const now = options?.nowDate ?? new Date(Date.now());
    const diffrenceInMilliseconds = now.getTime() - date.getTime();
    const differenceInDays = Math.ceil(
      diffrenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    const differenceInYears = now.getFullYear() - date.getFullYear();

    if (differenceInDays <= 1 && now.getDate() === date.getDate()) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const hourString = (hours % 12).toString().padStart(2, "0");
      const minuteString = minutes.toString().padStart(2, "0");

      return `${hourString}:${minuteString} ${hours <= 12 ? "AM" : "PM"}`;
    }

    if (differenceInYears === 0) {
      return `${months[date.getMonth()]} ${date.getDate()}`;
    }

    const monthString = (date.getMonth() + 1).toString().padStart(2, "0");
    const yearString = date.getFullYear().toString().slice(2);

    return `${date.getDate()}/${monthString}/${yearString}`;
  }

  const month = date.getMonth();
  const year = date.getFullYear();

  const dateString = date.getDate().toString().padStart(2, "0");
  const monthString = (month + 1).toString().padStart(2, "0");

  if (options?.returnsComplete) {
    return `${date.getDate()} ${months[month]} ${year}`;
  }

  return `${dateString}/${monthString}/${year}`;
  


};

export { dateFormatter };
