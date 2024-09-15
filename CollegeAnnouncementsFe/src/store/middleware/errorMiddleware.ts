import { appRoutes, navigateTo } from "@navigation";
import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";

export const errorMiddleware: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
  // isRejectedWithValue Or isRejected
  if (isRejectedWithValue(action)) {
    if ((action.meta.arg as { endpointName: string })?.endpointName !== "loginUser") {
      if ((action.payload as { status: number })?.status === 401) {
        navigateTo(appRoutes.login.path);
      }
      if ((action.payload as { status: number })?.status === 403) {
        navigateTo(appRoutes.home.path);
      }
    }
  }

  return next(action);
};
