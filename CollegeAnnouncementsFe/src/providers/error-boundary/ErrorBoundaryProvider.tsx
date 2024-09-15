import { Component, ErrorInfo, ReactElement } from "react";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./errorBoundaryProvider.types";

export class ErrorBoundaryProvider extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Greška:", error, errorInfo);
  }

  render(): ReactElement {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div>
          <h1>Došlo je do greške. Molimo Vas vratite se na početnu stranicu.</h1>
          <div>
            <h3>Greška:</h3>
            <p>{this.state.error?.message}</p>
          </div>

          <a href="/">Go to Home</a>
        </div>
      );
    }

    return this.props.children;
  }
}
