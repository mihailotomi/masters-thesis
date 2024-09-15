import moment from "moment";

import { Button } from "../buttons";
import { useDatePickerCalendar } from "./useDatePickerCalendar";
import { DatePickerCalendarProps } from "./DatePicker.types";
import "./DatePickerCalendar.scss";

export const DatePickerCalendar = ({
  size = "md",
  mode = "single",
  defaultDate,
  startDate,
  endDate,
  isSelectingStartDate,
  isSelectingEndDate,
  onChange,
  pastConstraint = false,
  afterConstraint = null,
  beforeConstraint = null,
}: DatePickerCalendarProps) => {
  const {
    currentMonth,
    selectedDate,
    weekDays,
    navigateMonth,
    selectDate,
    handleKeyDown,
    isDateInRange,
    daysRef,
  } = useDatePickerCalendar({
    mode,
    defaultDate,
    startDate,
    endDate,
    onChange,
  });

  const renderWeekDays = () => {
    return weekDays.map((day) => (
      <div key={day} className="day-name">
        {size === "sm" ? day[0] : day}
      </div>
    ));
  };

  const renderCalendarDays = () => {
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.clone().startOf("month").day();
    const calendarDays = [];

    // Fill in the blanks for the first week if the month doesn't start on Sunday
    if (firstDayOfMonth !== 0) {
      for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="day empty" />);
      }
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = currentMonth.clone().date(i);
      const isSelected = selectedDate && day.isSame(selectedDate, "day");
      const dayKey = day.format("DD-MM-YYYY");
      const isInRange = isDateInRange(day);
      let isDisabled = false;
      if (isSelectingStartDate && endDate) {
        isDisabled = day.isAfter(endDate, "day") || day.isSame(endDate, "day");
      }
      if (isSelectingEndDate && startDate) {
        isDisabled = day.isBefore(startDate, "day") || day.isSame(startDate, "day");
      }
      if (pastConstraint) {
        isDisabled = isDisabled || day.isAfter(moment(), "day");
      }
      if (afterConstraint) {
        isDisabled = isDisabled || day.isBefore(afterConstraint, "day");
      }
      if (beforeConstraint) {
        isDisabled = isDisabled || day.isAfter(beforeConstraint, "day");
      }

      calendarDays.push(
        <div
          ref={(el) => el && daysRef.current.set(dayKey, el)}
          key={dayKey}
          className={`day ${isSelected ? "selected" : ""} ${isInRange ? "in-range" : ""} ${isDisabled && !isSelected ? "disabled" : ""}`}
          tabIndex={0} // Make the day focusable
          onKeyDown={(e) => handleKeyDown(e, day)}
          onClick={() => !isDisabled && selectDate(day)}
          role="gridcell"
          aria-label={day.format("dddd, MMMM Do YYYY")}
        >
          {day.date()}
        </div>,
      );
    }

    return calendarDays;
  };

  const renderCalendarHeader = () => {
    return (
      <>
        <Button type="button" onClick={() => navigateMonth("prev")}>
          {"<"}
        </Button>
        <span>{currentMonth.format("MMMM YYYY")}</span>
        <Button type="button" onClick={() => navigateMonth("next")}>
          {">"}
        </Button>
      </>
    );
  };

  return (
    <div className={`date-picker-calendar size-${size}`}>
      <div className="calendar-header">{renderCalendarHeader()}</div>
      <div className="week-days">{renderWeekDays()}</div>
      <div className="calendar-grid">{renderCalendarDays()}</div>
    </div>
  );
};
