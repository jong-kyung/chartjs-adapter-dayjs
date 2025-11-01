import { _adapters } from "chart.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";

// Day.js 플러그인 활성화
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(quarterOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export interface AdapterOptions {
  datetime: string;
  millisecond: string;
  second: string;
  minute: string;
  hour: string;
  day: string;
  week: string;
  month: string;
  quarter: string;
  year: string;
}

export const initialize = (options: Partial<AdapterOptions> = {}) => {
  const FORMATS = {
    datetime: "MMM D, YYYY, h:mm:ss A",
    millisecond: "h:mm:ss.SSS A",
    second: "h:mm:ss A",
    minute: "h:mm A",
    hour: "hA",
    day: "MMM D",
    week: "l",
    month: "MMM YYYY",
    quarter: "[Q]Q - YYYY",
    year: "YYYY",
    ...options,
  } satisfies AdapterOptions;

  _adapters._date.override({
    formats: function () {
      return FORMATS;
    },

    parse: function (value, fmt) {
      if (value === null || typeof value === "undefined") {
        return null;
      }
      const type = typeof value;
      let dayjsValue;
      if (type === "number" || value instanceof Date) {
        dayjsValue = dayjs(value as string | number | Date);
      } else if (type === "string") {
        if (typeof fmt === "string") {
          dayjsValue = dayjs(value as string, fmt);
        } else {
          dayjsValue = dayjs(value as string);
        }
      }
      return dayjsValue?.isValid() ? dayjsValue.valueOf() : null;
    },

    format: function (time, fmt) {
      const dayjsTime = dayjs(time);

      return dayjsTime.isValid() ? dayjsTime.format(fmt) : "";
    },

    add: function (time, amount, unit) {
      switch (unit) {
        case "millisecond":
          return dayjs(time).add(amount, "millisecond").valueOf();
        case "second":
          return dayjs(time).add(amount, "second").valueOf();
        case "minute":
          return dayjs(time).add(amount, "minute").valueOf();
        case "hour":
          return dayjs(time).add(amount, "hour").valueOf();
        case "day":
          return dayjs(time).add(amount, "day").valueOf();
        case "week":
          return dayjs(time).add(amount, "week").valueOf();
        case "month":
          return dayjs(time).add(amount, "month").valueOf();
        case "quarter":
          return dayjs(time).add(amount, "quarter").valueOf();
        case "year":
          return dayjs(time).add(amount, "year").valueOf();
        default:
          return time;
      }
    },

    diff: function (max, min, unit) {
      const maxDay = dayjs(max);
      const minDay = dayjs(min);
      switch (unit) {
        case "millisecond":
          return maxDay.diff(minDay, "millisecond");
        case "second":
          return maxDay.diff(minDay, "second");
        case "minute":
          return maxDay.diff(minDay, "minute");
        case "hour":
          return maxDay.diff(minDay, "hour");
        case "day":
          return maxDay.diff(minDay, "day");
        case "week":
          return maxDay.diff(minDay, "week");
        case "month":
          return maxDay.diff(minDay, "month");
        case "quarter":
          return maxDay.diff(minDay, "quarter");
        case "year":
          return maxDay.diff(minDay, "year");
        default:
          return 0;
      }
    },

    startOf: function (time, unit) {
      const dayjsTime = dayjs(time);
      switch (unit) {
        case "second":
          return dayjsTime.startOf("second").valueOf();
        case "minute":
          return dayjsTime.startOf("minute").valueOf();
        case "hour":
          return dayjsTime.startOf("hour").valueOf();
        case "day":
          return dayjsTime.startOf("day").valueOf();
        case "week":
          return dayjsTime.startOf("week").valueOf();
        case "isoWeek":
          return dayjsTime.startOf("isoWeek").valueOf();
        case "month":
          return dayjsTime.startOf("month").valueOf();
        case "quarter":
          return dayjsTime.startOf("quarter").valueOf();
        case "year":
          return dayjsTime.startOf("year").valueOf();
        default:
          return time;
      }
    },

    endOf: function (time, unit) {
      const dayjsTime = dayjs(time);
      switch (unit) {
        case "second":
          return dayjsTime.endOf("second").valueOf();
        case "minute":
          return dayjsTime.endOf("minute").valueOf();
        case "hour":
          return dayjsTime.endOf("hour").valueOf();
        case "day":
          return dayjsTime.endOf("day").valueOf();
        case "week":
          return dayjsTime.endOf("week").valueOf();
        case "month":
          return dayjsTime.endOf("month").valueOf();
        case "quarter":
          return dayjsTime.endOf("quarter").valueOf();
        case "year":
          return dayjsTime.endOf("year").valueOf();
        default:
          return time;
      }
    },
  });
};
