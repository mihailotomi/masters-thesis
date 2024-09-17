import { FaPencilAlt, FaRetweet } from "react-icons/fa";
import classNames from "classnames";

import { FormBuilderProps } from "./FormBuilder.types";
import { FormControl, FormControlProps } from "../form-control";
import { Button } from "../../buttons";
import { useFormBuilder } from "./useFormBuilder";
import { FormOverlay } from "./FormOverlay";

import styles from "./FormBuilder.module.scss";
import { FileUpload } from "../../file-upload";

export function FormBuilder<TForm>({
  form,
  onSubmit,
  isLoading,
  submitButtonContent,
  readonly = false,
  className,
  title,
  isSubmitting,
  entity,
  labelSize = 3,
  additionalOptions,
}: FormBuilderProps<TForm>) {
  const {
    formState,
    onControlValueChange,
    onSubmitHandler,
    onCleanHandler,
    onToggleReadonlyHandler,
  } = useFormBuilder({
    form,
    onSubmit,
    readonly,
    entity,
    isSubmitting,
  });

  function renderControls() {
    return Object.keys(form).map((key) => {
      const k = key as keyof TForm;
      const {
        type,
        defaultValue: _defaultValue,
        label,
        required = false,
        className: _className,
        disabledIf,
        visibleIf,
        // The rest options may vary on the concrete type of options
        ...restOptions
      } = form[k];
      const controlState = formState.controls[k];

      const controlProps = {
        type,
        value: controlState.value,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: (value: any) => {
          onControlValueChange(k, value);
        },
        disabled: formState.isReadonly || (disabledIf && disabledIf(formState)),
        ...restOptions,
      } as FormControlProps;

      const controlVisible = visibleIf ? visibleIf(formState) : true;

      return (
        controlVisible && (
          <div key={key} className="form-group row align-items-center">
            <label className={classNames(`col-sm-${labelSize}`, styles.formLabel)}>
              <span className="text-danger">{required ? "*" : ""}</span>
              {label}
            </label>
            <div className={`col-sm-${12 - labelSize}`}>
              <FormControl
                {...controlProps}
                className={classNames({
                  "form-control": true,
                  [styles.formControlInvalid]:
                    controlState.error && !formState.isReadonly && formState.isSubmitted,
                })}
              />
            </div>
            {controlState.error &&
            !formState.isReadonly &&
            controlState.isTouched &&
            formState.isSubmitted ? (
              <div className={classNames(styles.errorMessage)}>
                <div className={`col-sm-${labelSize}`} />
                <small className={`col-sm-${12 - labelSize}`}>{controlState.error}</small>
              </div>
            ) : null}
          </div>
        )
      );
    });
  }

  const renderSecondOption = () =>
    readonly === false ? (
      <button
        key="cancel"
        type="button"
        className={styles.cleanButton}
        onClick={() => onCleanHandler()}
      >
        <FaRetweet className="button-icon" />
        Поништи
      </button>
    ) : (
      <button
        key="toggle-back"
        type="button"
        className={styles.cleanButton}
        onClick={() => onToggleReadonlyHandler()}
      >
        Odustani
      </button>
    );

  const renderFormOptions = () => (
    <>
      <span className={styles.formOptions}>
        {!formState.isReadonly ? (
          // When form is submitting response, only primary submit control is displayed in loading state
          <>
            <Button key="submit" loading={isSubmitting} type="submit">
              {submitButtonContent}
            </Button>

            {!isSubmitting && renderSecondOption()}
          </>
        ) : (
          readonly === "toggle" && (
            <Button
              key="toggle"
              type="button"
              variant="outline-primary"
              onClick={() => onToggleReadonlyHandler()}
            >
              <FaPencilAlt className="button-icon" />
              Izmeni
            </Button>
          )
        )}
      </span>
      {!isSubmitting && (
        <span className={styles.formOptions}>
          {additionalOptions?.map((option) => option.visibleIf(formState) && option.element)}
        </span>
      )}
    </>
  );

  return (
    <form onSubmit={onSubmitHandler} className={classNames(styles.formBuilder, className)} style={{width:"80rem"}}>
      {isLoading && <FormOverlay />}
      {title && <h4 className={styles.formTitle}>{title}</h4>}
      {renderControls()}
      <FileUpload onUpload={()=>{}} />
      <div className="row justify-content-end">
        <div className={classNames(`col-sm-${12 - labelSize}`, styles.formOptionsWrapper)}>
          {renderFormOptions()}
        </div>
      </div>
    </form>
  );
}
