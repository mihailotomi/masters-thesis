import { ReactNode } from "react";
import { SelectOption } from "../form-control";

export type BaseFormControlOptions<TForm> = {
  label: string;
  required?: boolean;
  className?: string;
  disabledIf?: (formState: FormState<TForm>) => boolean;
  visibleIf?: (formState: FormState<TForm>) => boolean;
  validators?: validatorFunc[];
  defaultValue?: string | number | boolean;
};

type TextFormControlOptions<TForm> = BaseFormControlOptions<TForm> & {
  type: "text";
};

type TextareaFormControlOptions<TForm> = BaseFormControlOptions<TForm> & {
  type: "textarea";
};

type NumberFormControlOptions<TForm> = BaseFormControlOptions<TForm> & {
  type: "number";
};

type PasswordFormControlOptions<TForm> = BaseFormControlOptions<TForm> & {
  type: "password";
};

type SelectFormControlOptions<TForm> = BaseFormControlOptions<TForm> & {
  type: "select";
  options: SelectOption[];
};

export type FormControlOptions<TForm> =
  | TextFormControlOptions<TForm>
  | NumberFormControlOptions<TForm>
  | PasswordFormControlOptions<TForm>
  | SelectFormControlOptions<TForm>
  | TextareaFormControlOptions<TForm>;

export type Form<TForm> = { [P in keyof TForm]: FormControlOptions<TForm> };

export type FormAdditionalOptions<TForm> = {
  element: ReactNode;
  visibleIf: (formState: FormState<TForm>) => boolean;
}[];

export type FormBuilderProps<TForm> = {
  form: Form<TForm>;
  onSubmit: (value: TForm) => void | Promise<void>;
  submitButtonContent: ReactNode;
  isLoading?: boolean;
  isSubmitting?: boolean;
  readonly?: boolean | "toggle";
  className?: string;
  title?: string;
  entity?: TForm;
  labelSize?: 2 | 3 | 4 | 5;
  additionalOptions?: FormAdditionalOptions<TForm>;
};

export type FormControlState = {
  value: string | number | boolean;
  error: string | null;
  isTouched: boolean;
};

export type FormState<TForm> = {
  controls: {
    [P in keyof TForm]: FormControlState;
  };
  isSubmitted: boolean;
  isReadonly: boolean;
};

/**
 * Type definition for a validation function.
 * - value: The value to validate.
 * - field: The name of the field being validated.
 * Returns an object with a 'valid' boolean and an optional 'error' message.
 */
export type validatorFunc = (value: string, field: string) => { valid: boolean; error?: string };
