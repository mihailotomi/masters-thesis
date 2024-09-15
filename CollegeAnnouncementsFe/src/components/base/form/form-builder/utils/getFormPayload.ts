import { FormState } from "../FormBuilder.types";

export const getFormPayload = <TForm>(formState: FormState<TForm>): TForm => {
  const payload: TForm = {} as TForm;

  Object.keys(formState.controls).forEach((key) => {
    payload[key as keyof TForm] = formState.controls[key as keyof TForm]
      .value as TForm[keyof TForm];
  });
  return payload;
};
