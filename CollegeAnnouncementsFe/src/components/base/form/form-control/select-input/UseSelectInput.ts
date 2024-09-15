import { useEffect, useState } from "react";
import { SelectOption, SelectProps } from "../FormControl.types";

export type UseSelectInputProps = Pick<SelectProps, "options" | "onChange" | "value"> & {
  controlRef: React.RefObject<HTMLElement>;
};

export const useSelectInput = ({ options, onChange, controlRef, value }: UseSelectInputProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOptionsSelected, setIsOptionSelected] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Side effect to handle value being modified from outside the control
  useEffect(() => {
    if (
      (!value && value !== false) ||
      value === "" ||
      (!Number.isFinite(value) && value !== false)
    ) {
      setSearchTerm("");
      setIsOptionSelected(false);
    } else {
      const selectedOption = options.find((opt) => opt.value === value)?.label;
      setSearchTerm("");
      setIsOptionSelected(!!selectedOption);
    }
  }, [onChange]);

  // Filter options on search term change
  useEffect(() => {
    if (searchTerm) {
      const newOptions = options.filter((opt) =>
        opt.label?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (isDirty) setFilteredOptions(newOptions);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options]);

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDirty(false);
      setFilteredOptions(options);
    }
  }, [isDropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (controlRef.current && !controlRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [controlRef]);

  const onSearchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDirty(true);
  };

  const onSelectOptionClick = (option: SelectOption) => {
    onChange(option.value);
    setSearchTerm(option.label);
    setIsOptionSelected(true);
    setIsDropdownOpen(false);
  };

  const onRemoveClick = () => {
    setSearchTerm("");
    onChange("");
    setIsOptionSelected(false);
    setIsDirty(false);
  };

  const onSelectClick = () => {
    setIsDropdownOpen(true);
  };

  return {
    isDropdownOpen,
    onSelectClick,
    onSearchInputHandler,
    searchTerm,
    filteredOptions,
    onSelectOptionClick,
    onRemoveClick,
    isOptionsSelected,
  };
};
