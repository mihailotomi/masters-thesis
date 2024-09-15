import { Form, FormState } from "../FormBuilder.types";
import { executeValidators } from "../FormValidator";

export const validateFormState = <TForm>(form: Form<TForm>, formState: FormState<TForm>) => {
  const validatedState: FormState<TForm> = { ...formState } as FormState<TForm>;
  let hasErrors = false;

  Object.keys(form).forEach((key) => {
    const k = key as keyof TForm;
    const control = form[k];
    let error: string | null = null;

    if (control.validators && (control?.visibleIf ? control.visibleIf(formState) : true)) {
      const validationResult = executeValidators(
        String(formState.controls[k].value).trim(),
        control.label || key,
        control.validators,
      );

      if (!validationResult.valid) {
        error = validationResult.error || null;
        hasErrors = true;
      }
    }

    validatedState.controls[k] = { ...formState.controls[k], error };
  });

  return { hasErrors, validatedState };
};
