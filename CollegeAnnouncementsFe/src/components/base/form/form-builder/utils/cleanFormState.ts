import { Form, FormState } from "../FormBuilder.types";
import { stringify } from "./initializeFormState";

export const cleanFormState = <TForm>(
  form: Form<TForm>,
  formState: FormState<TForm>,
  entity?: TForm,
) => {
  const cleanedState: FormState<TForm> = { ...formState, isSubmitted: false } as FormState<TForm>;

  Object.keys(formState.controls).forEach((key) => {
    const k = key as keyof TForm;
    cleanedState.controls[k] = {
      ...formState.controls[k],
      value: stringify(entity && entity[k]) || form[k].defaultValue,
      isTouched: false,
      error: null,
    };
  });

  return cleanedState;
};
