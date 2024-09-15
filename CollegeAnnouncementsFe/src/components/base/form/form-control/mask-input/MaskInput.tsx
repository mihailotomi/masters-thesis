import React from "react";
import { MaskInputProps, defaultMaskBinding } from "./maskInput.types";

export const MaskInput = React.forwardRef(
  (
    {
      pattern,
      value,
      onChange,
      maskCharacterBinding = defaultMaskBinding,
      className = "",
      disabled = false,
    }: MaskInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const checkCharAtMask = (charToCheck: string, patternChar: string) => {
      if (maskCharacterBinding[patternChar]) {
        return maskCharacterBinding[patternChar].test(charToCheck);
      }
      return charToCheck === patternChar;
    };

    const onChangeHandler = (val: string) => {
      let maskedValue = "";
      if (!val) {
        return onChange(maskedValue);
      }
      for (let i = 0; i < pattern.length; i++) {
        const char = val[i];
        if (checkCharAtMask(char, pattern[i])) {
          maskedValue += char;
        } else {
          break;
        }
      }

      return onChange(maskedValue);
    };

    return (
      <input
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
        ref={ref}
        className={className}
        disabled={disabled}
      />
    );
  },
);
