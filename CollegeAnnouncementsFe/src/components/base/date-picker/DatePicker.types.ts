import { Moment } from "moment";
import { DateFormat } from "@entities";

export type DatePickerSize = "sm" | "md" | "lg" | "xl" | "auto";
export type DatePickerMode = "single" | "range";

export interface DatePickerCalendarProps {
  size?: DatePickerSize;
  mode?: DatePickerMode;
  defaultDate?: Moment | null;
  startDate?: Moment | null;
  endDate?: Moment | null;
  isSelectingStartDate?: boolean;
  isSelectingEndDate?: boolean;
  onChange?: (date: Moment) => void;
  pastConstraint?: boolean;
  afterConstraint?: Moment | null;
  beforeConstraint?: Moment | null;
}

export interface DateRangePickerProps {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  size?: DatePickerSize;
  disabled?: boolean;
  placeholder?: string;
  format?: DateFormat;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
  pastConstraint?: boolean;
  differenceConstraint?: { num: number; units: "years" | "months" | "weeks" | "days" };
}

export interface DatePickerProps {
  size?: DatePickerSize;
  defaultDate?: Date | null;
  placeholder?: string;
  format?: DateFormat;
  onChange?: (date: Date | null) => void;
}
