import React from "react";
import { PasswordInputProps } from "./FormControl.types";

export const PasswordInput = React.forwardRef(
  (
    { value, onChange, className, disabled = false }: Omit<PasswordInputProps, "type">,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = event.target;
      onChange(inputValue);
    };

    return (
      <input
        type="password"
        value={value}
        onChange={onInputChange}
        ref={ref}
        className={className}
        disabled={disabled}
      />
    );
  },
);
