import moment, { Moment } from "moment";
import { useCallback, useEffect, useRef, useState } from "react";

type PropTypes = {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  disabled?: boolean;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
};

export const useDateRangePicker = ({
  defaultStartDate,
  defaultEndDate,
  disabled,
  onChange,
}: PropTypes) => {
  const [startDate, setStartDate] = useState<Moment | null>(
    defaultStartDate ? moment(defaultStartDate) : null,
  );
  const [endDate, setEndDate] = useState<Moment | null>(
    defaultEndDate ? moment(defaultEndDate) : null,
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = () => {
    if (disabled) return;
    setIsPickerOpen(true);
  };

  const handleStartDateChange = (date: Moment) => {
    setStartDate(date);
    if (endDate && date.isAfter(endDate)) {
      setEndDate(null);
    } else if (endDate) {
      if (onChange) {
        onChange(date.toDate(), endDate?.toDate() || date.toDate());
      }
      setIsPickerOpen(false);
    }
  };

  const handleEndDateChange = (date: Moment) => {
    setEndDate(date);
    if (startDate) {
      if (onChange) {
        onChange(startDate?.toDate() || date.toDate(), date.toDate());
      }
      setIsPickerOpen(false);
    }
  };

  const clearDatesAndClosePicker = () => {
    setStartDate(null);
    setEndDate(null);
    setIsPickerOpen(false);
    if (onChange) {
      onChange(null, null);
    }
  };

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        isPickerOpen &&
        ((startDate && endDate) || (!startDate && !endDate))
      ) {
        setIsPickerOpen(false);
      }
    },
    [isPickerOpen, startDate, endDate],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    setEndDate(defaultEndDate ? moment(defaultEndDate) : null);
  }, [defaultEndDate]);

  useEffect(() => {
    setStartDate(defaultStartDate ? moment(defaultStartDate) : null);
  }, [defaultStartDate]);

  return {
    startDate,
    endDate,
    pickerRef,
    isPickerOpen,
    handleInputChange,
    handleStartDateChange,
    handleEndDateChange,
    clearDatesAndClosePicker,
  };
};
