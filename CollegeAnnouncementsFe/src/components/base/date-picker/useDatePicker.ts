import { useCallback, useEffect, useRef, useState } from "react";
import moment, { Moment } from "moment";

export const useDatePicker = (defaultDate: Date | null, onChange?: (date: Date | null) => void) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [date, setDate] = useState<Moment | null>(defaultDate ? moment(defaultDate) : null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDate(defaultDate ? moment(defaultDate) : null);
  }, [defaultDate]);

  const handleInputChange = () => {
    setIsPickerOpen(true);
  };

  const handleChange = (newDate: Moment) => {
    setDate(newDate);
    if (onChange) {
      onChange(newDate.toDate());
    }
    setIsPickerOpen(false);
  };

  const clearDatesAndClosePicker = () => {
    setDate(null);
    setIsPickerOpen(false);
    onChange?.(null);
  };

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node) && isPickerOpen) {
        setIsPickerOpen(false);
      }
    },
    [isPickerOpen],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return {
    isPickerOpen,
    date,
    pickerRef,
    handleInputChange,
    handleChange,
    clearDatesAndClosePicker,
  };
};
