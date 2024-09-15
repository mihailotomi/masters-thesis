import { useEffect, useState } from "react";
import { FormBuilderProps, FormState } from "./FormBuilder.types";
import { initializeFormState } from "./utils/initializeFormState";
import { validateFormState } from "./utils/validateFormState";
import { cleanFormState } from "./utils/cleanFormState";
import { getFormPayload } from "./utils/getFormPayload";

export const useFormBuilder = <T>({
  form,
  onSubmit,
  readonly,
  entity,
  isSubmitting,
}: Omit<FormBuilderProps<T>, "isLoading" | "submitButtonContent">) => {
  const [formState, setFormState] = useState<FormState<T>>(
    initializeFormState(form, readonly === "toggle" ? true : (readonly as boolean), entity),
  );

  useEffect(() => {
    setFormState(initializeFormState(form, formState.isReadonly, entity));
  }, [entity]);

  // For togglable forms, toggle back to readonly, once the submit request is handled
  useEffect(() => {
    if (!isSubmitting && readonly === "toggle") {
      setFormState({
        ...initializeFormState(form, readonly === "toggle" ? true : (readonly as boolean), entity),
        isReadonly: true,
      });
    }
  }, [isSubmitting]);

  function onControlValueChange<PValue>(key: keyof T, value: PValue) {
    if (!formState.controls[key]) return;
    const { validatedState } = validateFormState(form, {
      ...formState,
      controls: {
        ...formState.controls,
        [key]: { ...formState.controls[key], value, isTouched: true },
      },
    });

    setFormState(validatedState);
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const { validatedState, hasErrors } = validateFormState(form, formState);
    setFormState({ ...validatedState, isSubmitted: true });

    if (!hasErrors) {
      onSubmit(getFormPayload(formState));
    }
  };

  const onCleanHandler = () => {
    setFormState(cleanFormState(form, formState));
  };

  const onToggleReadonlyHandler = () => {
    if (formState.isReadonly === false) {
      setFormState({
        ...cleanFormState(form, formState, entity),
        isReadonly: !formState.isReadonly,
      });
    }
    setFormState({ ...formState, isReadonly: !formState.isReadonly });
  };

  return {
    formState,
    onControlValueChange,
    onSubmitHandler,
    onCleanHandler,
    onToggleReadonlyHandler,
  };
};
