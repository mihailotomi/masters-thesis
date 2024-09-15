export type MaskCharacterBinding = {
  [k: string]: RegExp;
};

export type MaskInputProps = {
  pattern: string;
  value: string;
  onChange: (val: string) => void;
  maskCharacterBinding?: MaskCharacterBinding;
  className?: string;
  disabled?: boolean;
};

export const defaultMaskBinding: MaskCharacterBinding = {
  a: /^[a-zA-Z]*$/,
  "0": /^[0-9]*$/,
};
