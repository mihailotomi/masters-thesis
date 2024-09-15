import { useRef } from "react";
import { FormControlProps, SelectOption } from "./FormControl.types";
import { SelectInput } from "./select-input/SelectInput";
import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import { NumberInput } from "./NumberInput";
import { TextareaInput } from "./TextareaInput";

export function FormControl({
  value,
  onChange,
  className,
  type,
  disabled = false,
  ...props
}: FormControlProps) {
  const ref = useRef(null);

  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <TextInput
            disabled={disabled}
            onChange={onChange}
            className={className}
            value={value}
            ref={ref}
          />
        );

      case "textarea":
        return (
          <TextareaInput
            disabled={disabled}
            onChange={onChange}
            className={className}
            value={value}
            ref={ref}
          />
        );

      case "number":
        return (
          <NumberInput
            disabled={disabled}
            onChange={onChange}
            className={className}
            value={value}
            ref={ref}
          />
        );

      case "password":
        return (
          <PasswordInput
            disabled={disabled}
            onChange={onChange}
            className={className}
            value={value}
            ref={ref}
          />
        );

      case "select":
        return (
          <SelectInput
            disabled={disabled}
            type="select"
            options={
              (
                props as {
                  options: SelectOption[];
                }
              ).options
            }
            onChange={onChange}
            ref={ref}
            value={value}
            className={className}
          />
        );

      default:
        break;
    }
    return <div />;
  };

  return renderInput();
}
