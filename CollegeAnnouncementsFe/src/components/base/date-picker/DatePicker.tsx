import { useEffect, useRef } from "react";

import { useDatePicker } from "./useDatePicker";
import { DatePickerCalendar } from "./DatePickerCalendar";
import { DatePickerProps } from "./DatePicker.types";
import "./DatePicker.scss";

export const DatePicker = ({
  size = "md",
  defaultDate = null,
  placeholder,
  format,
  onChange,
}: DatePickerProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const {
    isPickerOpen,
    date,
    pickerRef,
    handleInputChange,
    handleChange,
    clearDatesAndClosePicker,
  } = useDatePicker(defaultDate, onChange);

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
    <div className="date-picker" ref={pickerRef}>
      <div className="input-container">
        <input
          type="text"
          placeholder={placeholder ?? "Select Date"}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          value={date ? date.format(format ?? "MM/DD/YYYY") : ""}
          onFocus={handleInputChange}
          readOnly
        />
        <button type="button" className="clear-icon" onClick={clearDatesAndClosePicker}>
          x
        </button>
      </div>
      {isPickerOpen && (
        <div ref={calendarRef} className="date-picker-container">
          <DatePickerCalendar onChange={handleChange} defaultDate={date} size={size} />
        </div>
      )}
    </div>
  );
};
