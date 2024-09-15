import moment, { Moment } from "moment";
import { useEffect, useRef, useState } from "react";
import { DatePickerMode } from "./DatePicker.types";

type Props = {
  mode?: DatePickerMode;
  defaultDate?: Moment | null;
  startDate?: Moment | null;
  endDate?: Moment | null;
  onChange?: (date: Moment) => void;
};

const determineWeekDays = () => {
  return window.innerWidth < 360
    ? [...moment.weekdaysMin(true).slice(1, 7), moment.weekdaysMin(true)[0]]
    : [...moment.weekdaysShort(true).slice(1, 7), moment.weekdaysShort(true)[0]];
};

export const useDatePickerCalendar = ({
  mode = "single",
  defaultDate,
  startDate,
  endDate,
  onChange,
}: Props) => {
  const [currentMonth, setCurrentMonth] = useState<Moment>(
    defaultDate ? defaultDate.clone().startOf("month") : moment().startOf("month"),
  );

  const [selectedDate, setSelectedDate] = useState<Moment | null>(defaultDate || null);
  const [focusedDate, setFocusedDate] = useState<Moment>(moment());
  const [weekDays, setWeekDays] = useState(determineWeekDays);

  const daysRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = currentMonth.clone().add(direction === "next" ? 1 : -1, "months");
    setCurrentMonth(newMonth);
  };

  const selectDate = (day: moment.Moment) => {
    setSelectedDate(day);
    if (onChange) {
      onChange(day);
    }
  };

  const focusDay = (day: moment.Moment) => {
    const dayKey = day.format("DD-MM-YYYY");
    const dayElement = daysRef.current.get(dayKey);
    dayElement?.focus();
  };
  const isDateInRange = (day: Moment) => {
    if (mode === "range" && startDate && endDate) {
      return day.isBetween(startDate, endDate, "day", "[]");
    }
    return false;
  };

  const handleDateSelection = (day: Moment) => {
    setSelectedDate(day);
    setFocusedDate(day);
    if (onChange) {
      onChange(day);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, day: Moment) => {
    e.preventDefault();
    const newDay = day.clone();
    if (e.key === "ArrowRight") {
      newDay.add(1, "days");
    } else if (e.key === "ArrowLeft") {
      newDay.subtract(1, "days");
    } else if (e.key === "ArrowUp") {
      newDay.subtract(7, "days");
    } else if (e.key === "ArrowDown") {
      newDay.add(7, "days");
    } else if (e.key === "Enter") {
      handleDateSelection(newDay);
      return;
    }
    setFocusedDate(newDay);
    focusDay(newDay);
  };

  useEffect(() => {
    const dayKey = focusedDate.format("DD-MM-YYYY");
    daysRef?.current.get(dayKey)?.focus();
  }, [focusedDate]);

  useEffect(() => {
    const handleResize = () => {
      setWeekDays(determineWeekDays());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (defaultDate) setSelectedDate(moment(defaultDate));
  }, [defaultDate]);

  return {
    currentMonth,
    selectedDate,
    focusedDate,
    weekDays,
    daysRef,
    navigateMonth,
    selectDate,
    focusDay,
    isDateInRange,
    handleDateSelection,
    handleKeyDown,
  };
};
