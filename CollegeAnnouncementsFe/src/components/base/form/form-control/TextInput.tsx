import React from "react";
import { TextInputProps } from "./FormControl.types";

export const TextInput = React.forwardRef(
  (
    { value, onChange, className, disabled = false }: Omit<TextInputProps, "type">,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = event.target;
      onChange(inputValue);
    };

    return (
      <input
        value={value}
        onChange={onInputChange}
        ref={ref}
        className={className}
        disabled={disabled}
      />
    );
  },
);
