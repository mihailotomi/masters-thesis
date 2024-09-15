import { ReactElement } from "react";

export type ErrorBoundaryProps = {
  children: ReactElement;
  fallback?: ReactElement;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
