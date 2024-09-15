import { useLayoutEffect, useState, ReactNode } from "react";
import { History } from "history";
import { Router } from "react-router-dom";

export interface HistoryRouterProps {
  history: History;
  basename?: string;
  children?: ReactNode;
}

export function HistoryRouter({ basename, children, history }: HistoryRouterProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}
