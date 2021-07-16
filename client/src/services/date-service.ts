import { differenceInBusinessDays, format, parseISO } from "date-fns";

const ensureDate = (date: Date | string) => {
  if (typeof date === "string") return parseISO(date);
  return date;
};

enum DateFormats {
  MonthDay = "MMMM d",
  MonthDayTime = "MMMM d hh:mm a",
  Time = "hh:mm a",
}

interface DateService {
  ticketDateDisplay: (date: Date | string) => string;
  ticketTimeDisplay: (date: Date | string) => string;
  ticketCommentDateDisplay: (date: Date | string) => string;
  ticketListDateDisplay: (date: Date | string) => string;
  differenceInDaysDisplay: (date: Date | string) => string;
}

const dateService: DateService = {
  ticketDateDisplay: (date) => {
    return format(ensureDate(date), DateFormats.MonthDay);
  },
  ticketTimeDisplay: (date) => {
    return format(ensureDate(date), DateFormats.Time);
  },
  ticketCommentDateDisplay: (date) => {
    return format(ensureDate(date), DateFormats.MonthDayTime);
  },
  ticketListDateDisplay: (date) => {
    return format(ensureDate(date), DateFormats.MonthDay);
  },
  differenceInDaysDisplay: (date) => {
    const diff = differenceInBusinessDays(ensureDate(date), Date.now());
    return diff === 0 ? `${diff} days ago` : "";
  },
};

export default dateService;
