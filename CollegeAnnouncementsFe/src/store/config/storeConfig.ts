import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authReducer, drawerReducer, themeReducer, loaderReducer } from "../reducers";
import {
  announcementsApi,
  authApi,
} from "../api";
import { errorMiddleware } from "../middleware";

export const store = configureStore({
  reducer: {
    // redux slice reducers
    drawer: drawerReducer,
    auth: authReducer,
    theme: themeReducer,
    loader: loaderReducer,
    // redux api reducers
    [announcementsApi.reducerPath]: announcementsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      announcementsApi.middleware,
      errorMiddleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
