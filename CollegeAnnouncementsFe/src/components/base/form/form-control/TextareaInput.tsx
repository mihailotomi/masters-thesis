import React from "react";
import classNames from "classnames";

import { TextareaInputProps } from "./FormControl.types";

import styles from "./FormControl.module.scss";

export const TextareaInput = React.forwardRef(
  (
    { value, onChange, className, disabled = false }: Omit<TextareaInputProps, "type">,
    ref: React.Ref<HTMLTextAreaElement>,
  ) => {
    const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value: inputValue } = event.target;
      onChange(inputValue);
    };

    return (
      <textarea
        value={value}
        onChange={onInputChange}
        ref={ref}
        className={classNames(className, styles.textarea)}
        disabled={disabled}
      />
    );
  },
);
