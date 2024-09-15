/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

type ThemeMode = "light" | "dark";

const prefersDarkMode =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

type ThemeState = {
  mode: ThemeMode;
};

const initialState: ThemeState = {
  // TODO: change back to default dark
  mode: prefersDarkMode ? "light" : "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

const persistConfig: PersistConfig<ThemeState> = {
  key: "theme",
  storage,
};

export const { toggleTheme, setTheme } = themeSlice.actions;

export const themeReducer = persistReducer(persistConfig, themeSlice.reducer);
