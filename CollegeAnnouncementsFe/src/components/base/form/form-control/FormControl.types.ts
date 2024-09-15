export interface BaseFormControlProps<TValue> {
  value: TValue;
  onChange: (value: TValue) => void;
  className?: string;
  disabled?: boolean;
}

export type TextInputProps = BaseFormControlProps<string> & {
  type: "text";
};

export type TextareaInputProps = BaseFormControlProps<string> & {
  type: "textarea";
};

export type NumberInputProps = BaseFormControlProps<string> & {
  type: "number";
};

export type PasswordInputProps = BaseFormControlProps<string> & {
  type: "password";
};

export type SelectOption = { value: string | boolean | number; label: string };

export type SelectProps = BaseFormControlProps<string | number | boolean> & {
  type: "select";
  options: SelectOption[];
};

export type FormControlProps =
  | TextInputProps
  | PasswordInputProps
  | NumberInputProps
  | SelectProps
  | TextareaInputProps;
