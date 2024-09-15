import { ButtonProps as BtnProps } from "react-bootstrap";

export type ButtonColors =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | "white"
  | undefined;

export interface ButtonProps extends BtnProps {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
