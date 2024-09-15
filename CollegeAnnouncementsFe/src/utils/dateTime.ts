import config from "@config";
import moment from "moment";

type Year = "YYYY" | "YY";
type Month = "MM" | "M";
type Day = "DD" | "D";
type Hour = "HH" | "hh" | "h";
type Minute = "mm";
type Second = "ss";
type Meridiem = "A";

type DateSeparator = "/" | "-" | "." | " ";
type TimeSeparator = ":" | ".";
type DateTimeSeparator = " " | ", " | " @ ";

export type BasicDateFormat = `${Year}` | `${Year}${Month}` | `${Year}${Month}${Day}`;
export type ExtendedDateFormat =
  | `${Year}${DateSeparator}${Month}`
  | `${Year}${DateSeparator}${Month}${DateSeparator}${Day}`
  | `${Month}${DateSeparator}${Day}`
  | `${Month}${DateSeparator}${Day}${DateSeparator}${Year}`
  | `${Day}${DateSeparator}${Month}${DateSeparator}${Year}`;

export type BasicTimeFormat =
  | `${Hour}${TimeSeparator}${Minute}`
  | `${Hour}${TimeSeparator}${Minute}${TimeSeparator}${Second}`;
export type ExtendedTimeFormat = `${BasicTimeFormat}${Meridiem}`;

export type CombinedDateTimeFormat =
  | `${BasicDateFormat}${DateTimeSeparator}${BasicTimeFormat}`
  | `${ExtendedDateFormat}${DateTimeSeparator}${ExtendedTimeFormat}`;

export type DateFormat =
  | BasicDateFormat
  | ExtendedDateFormat
  | BasicTimeFormat
  | ExtendedTimeFormat
  | CombinedDateTimeFormat;


/**
 * This function is used to convert a date string to a date object.
 * @param {String} dateString - date string to be converted
 * @param {String} offset - format of the date string e.g. +02:00
 * @returns - ISO string
 */
export const toISOStringWithOffset = (dateString: string, offset: string): string => {
  // Parse the date string
  const date = new Date(dateString);

  // Convert the offset to milliseconds
  const offsetSign = offset[0] === "+" ? 1 : -1;
  const offsetHours = parseInt(offset.substring(1, 3), 10);
  const offsetMinutes = parseInt(offset.substring(4, 6), 10);
  const totalOffsetMs = offsetSign * ((offsetHours * 60 + offsetMinutes) * 60000);

  // Adjust the date by the offset
  const adjustedDate = new Date(date.getTime() + totalOffsetMs);

  return adjustedDate.toISOString();
};

/**
 * This function is used to convert a date object denoting a start of a date to an ISO string which denotes the start of the same date.
 * @param {Date} date timestamp denoting the start of a paticular date in local time
 * @returns ISO string denoting the start of the date in UTC time
 */
export const toISODateStart = (date: Date): string => {
  // a reverse offset - the number of minutes the UTC time is ahead of the local time
  const reverseOffset = date.getTimezoneOffset();
  const reverseOffsetMs = reverseOffset * 60000;

  const adjustedDate = new Date(date.getTime() - reverseOffsetMs);
  return adjustedDate.toISOString();
};

/**
 * This function is used to convert a date string from the API to a date string for the UI.
 * @param {String} date - date string to be converted
 * @param {String} offset - format of the date string e.g. +02:00
 * @param {String} format - format of the date string e.g. DD.MM.YYYY HH:mm, default is DD.MM.YYYY HH:mm
 * @returns - date string
 */
export const dateApiToUI = (date: string, offset?: string, format?: DateFormat): string => {
  return moment(toISOStringWithOffset(date, offset || "+00:00")).format(
    format || config.environment.bdmApi.dateTimeFormat,
  );
};

/**
 * This function is used to compare two dates and return a boolean value.
 * @param {String} date1 - first Date to compare
 * @param {String} date2 - second Date to compare
 * @returns - boolean
 */
export const areDatesEqualByDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * This function is used to check if a date belongs to a date ranged determined by start and end date.
 * @param {String} checkDate - the date to be checked
 * @param {String} startDate - date to reference start of the range
 * @param {String} endDate - date to reference end of the range
 * @returns - boolean
 */
export const isDateInBetween = (checkDate: Date, startDate: Date, endDate: Date): boolean => {
  return checkDate >= startDate && checkDate <= endDate;
};

/**
 * This function is used to create a new date that is specified amount of hours after the input date
 * @param {Date} date - input date
 * @param {number} hours - amount of hours to add
 * @returns new date
 */
export const addHoursToDate = (date: Date, hours: number) => {
  const totalMsToAdd = hours * 60 * 60000;

  return new Date(date.getTime() + totalMsToAdd);
};
