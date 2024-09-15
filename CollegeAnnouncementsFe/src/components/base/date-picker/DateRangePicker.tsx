import { useEffect, useRef } from "react";
import moment from "moment";
import { DatePickerCalendar } from "./DatePickerCalendar";

import { DateRangePickerProps } from "./DatePicker.types";
import "./DateRangePicker.scss";
import { useDateRangePicker } from "./useDateRangePicker";

export const DateRangePicker = ({
  size = "md",
  defaultStartDate,
  defaultEndDate,
  disabled,
  placeholder,
  onChange,
  pastConstraint = false,
  differenceConstraint,
  format,
}: DateRangePickerProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const {
    startDate,
    endDate,
    isPickerOpen,
    pickerRef,
    handleInputChange,
    handleStartDateChange,
    handleEndDateChange,
    clearDatesAndClosePicker,
  } = useDateRangePicker({
    defaultStartDate,
    defaultEndDate,
    disabled,
    onChange,
  });

  useEffect(() => {
    if (isPickerOpen && calendarRef.current && pickerRef.current) {
      const pickerRect = pickerRef.current.getBoundingClientRect();
      const calendarElement = calendarRef.current;

      const overflow = pickerRect.left + calendarElement.offsetWidth > window.innerWidth;

      if (overflow) {
        calendarElement.style.left = `${window.innerWidth - (pickerRect.left + 40 + calendarElement.offsetWidth)}px`;
      } else {
        calendarElement.style.left = "0px";
      }
    }
  }, [isPickerOpen]);

  return (
    <div className="date-range-picker" ref={pickerRef}>
      <div className="input-container">
        <input
          type="text"
          placeholder={placeholder ?? "Select Date Range"}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          value={`${startDate ? startDate.format(format ?? "MM/DD/YYYY") : ""}${endDate ? ` - ${endDate.format(format ?? "MM/DD/YYYY")}` : ""}`}
          onFocus={handleInputChange}
          readOnly
        />
        <button type="button" className="clear-icon" onClick={clearDatesAndClosePicker}>
          x
        </button>
      </div>
      {isPickerOpen && (
        <div ref={calendarRef} className="date-picker-container">
          <DatePickerCalendar
            size={size}
            mode="range"
            onChange={(date) => handleStartDateChange(moment(date))}
            defaultDate={startDate || null}
            startDate={startDate || null}
            endDate={endDate || null}
            isSelectingStartDate
            pastConstraint={pastConstraint}
            afterConstraint={
              differenceConstraint && endDate
                ? moment(endDate).subtract(differenceConstraint.num, differenceConstraint.units)
                : null
            }
          />
          <DatePickerCalendar
            size={size}
            mode="range"
            onChange={(date) => handleEndDateChange(moment(date))}
            defaultDate={endDate || null}
            startDate={startDate || null}
            endDate={endDate || null}
            isSelectingEndDate
            pastConstraint={pastConstraint}
            beforeConstraint={
              differenceConstraint && startDate
                ? moment(startDate).add(differenceConstraint.num, differenceConstraint.units)
                : null
            }
          />
        </div>
      )}
    </div>
  );
};
