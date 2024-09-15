import { Form, FormControlState, FormState } from "../FormBuilder.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (value: any) => {
  return typeof value === "string" ? value : value ? `${value}` : "";
};

export const initializeFormState = <TForm>(
  form: Form<TForm>,
  readonly: boolean,
  entity?: TForm,
): FormState<TForm> => {
  const state: FormState<TForm> = {
    controls: {},
    isSubmitted: false,
    isReadonly: readonly,
  } as FormState<TForm>;
  Object.keys(form).forEach((key) => {
    const k = key as keyof TForm;
    const valueExists = entity && entity[k] !== undefined;
    state.controls[k] = {
      value: valueExists ? entity[k] : form[k].defaultValue,
      error: null,
      isTouched: false,
    } as FormControlState;
  });

  return state;
};
