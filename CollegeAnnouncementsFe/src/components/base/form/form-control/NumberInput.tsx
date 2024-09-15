import React from "react";
import { NumberInputProps } from "./FormControl.types";

export const NumberInput = React.forwardRef(
  (
    { value, onChange, className, disabled = false }: Omit<NumberInputProps, "type">,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.split(" ").join("");

      if (inputValue === "" || /^\d+$/.test(inputValue)) {
        onChange(inputValue);
      }
    };

    const formatedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return (
      <input
        type="text"
        value={formatedValue}
        onChange={onInputChange}
        ref={ref}
        className={className}
        disabled={disabled}
      />
    );
  },
);
