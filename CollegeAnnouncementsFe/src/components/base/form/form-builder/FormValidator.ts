import { validatorFunc } from "./FormBuilder.types";

/**
 * Creates a validator function based on a regex pattern.
 *
 * @param pattern The RegExp pattern to test the value against.
 * @param error Optional custom error message for the validator.
 * @returns A validator function that checks if the value matches the regex pattern.
 */
export const regex = (pattern: RegExp, error: string): validatorFunc => {
  return (value: string, field: string) => {
    if (!!value && !pattern.test(value)) {
      return {
        valid: false,
        error: error || `Polje '${field}' nije validno.`,
      };
    }
    return { valid: true };
  };
};

/**
 * Creates a validator function to check if a field is required (non-empty).
 *
 * @param error Optional custom error message.
 * @returns A validator function that checks if the value is non-empty.
 */
export const required = (error?: string): validatorFunc => {
  return (value: string, field: string) => {
    if (!value) {
      return {
        valid: false,
        error: error || `Polje '${field}' mora biti popunjeno.`,
      };
    }
    return { valid: true };
  };
};

/**
 * Creates a validator function for email validation using a standard email regex pattern.
 *
 * @param error Optional custom error message.
 * @returns A validator function that checks if the value is a valid email.
 */
export const email = (error?: string): validatorFunc => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex(emailRegex, error || "Polje mora biti validan e-mail.");
};

/**
 * Creates a validator function for password validation using a standard password regex pattern.
 *
 * @param error Optional custom error message.
 * @returns A validator function that checks if the value is a valid password.
 */
export const password = (error?: string): validatorFunc => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex(passwordRegex, error || "Polje mora biti validna lozinka.");
};

/**
 * Creates a validator function that checks if a field contains only numeric characters.
 *
 * @param error Optional custom error message.
 * @returns A validator function that checks if the value contains only numeric characters.
 */
export const numericOnly = (error?: string): validatorFunc => {
  return regex(/^[0-9]*$/, error || "Polje sme sadržati samo numeričke karaktere.");
};

/**
 * Creates a validator function that checks if a field contains only alphabetic characters.
 *
 * @param error Optional custom error message.
 * @returns A validator function that checks if the value contains only alphabetic characters.
 */
export const alphaOnly = (error?: string): validatorFunc => {
  return regex(/^[a-zA-Z]*$/, error || "Polje sme sadržati samo slovne karaktere.");
};

/**
 * Creates a validator function that checks if a field contains minimum number of characters.
 * @param limit minimum number of characters
 * @param error Optional custom error message.
 * @returns A validator function that checks if the value contains minimum number of characters.
 */
export const minChar = (limit: number, error?: string): validatorFunc => {
  return (value: string, field: string) => {
    if (!value || (!!value && value.length >= limit)) {
      return { valid: true };
    }
    return {
      valid: false,
      error: error || `Polje ${field} Mora sadržati najmanje ${limit} karaktera.`,
    };
  };
};

/**
 * Creates a validator function that checks if a field contains maximum number of characters.
 * @param limit maximum number of characters
 * @param error Optional custom error message.
 * @returns A validator function that checks if the value contains maximum number of characters.
 */
export const maxChar = (limit: number, error?: string): validatorFunc => {
  return (value: string, field: string) => {
    if (!value || (!!value && value.length <= limit)) {
      return { valid: true };
    }
    return {
      valid: false,
      error: error || `Polje ${field} ne sme sadržati više od ${limit} karaktera.`,
    };
  };
};

/**
 * Creates a validator function that checks if a field contains exact number of characters.
 * @param limit exact number of characters
 * @param error Optional custom error message.
 * @returns A validator function that checks if the value contains exact number of characters.
 */
export const charLength = (limit: number, error?: string): validatorFunc => {
  return (value: string, field: string) => {
    if (!!value && value.length !== limit) {
      return {
        valid: false,
        error: error || `Polje ${field} mora sadržati tačno ${limit} karaktera.`,
      };
    }
    return { valid: true };
  };
};

/**
 * Executes an array of validator functions against a given value.
 *
 * @param value The value to be validated.
 * @param field The name of the field (used in error messages).
 * @param validators An array of validator functions to apply.
 * @returns An object with a 'valid' boolean and an optional 'error' message.
 */
export const executeValidators = (value: string, field: string, validators: validatorFunc[]) => {
  for (let i = 0; i < validators.length; i++) {
    const validate = validators[i];
    const result = validate(value, field);
    if (!result.valid) {
      return result;
    }
  }
  return { valid: true };
};
