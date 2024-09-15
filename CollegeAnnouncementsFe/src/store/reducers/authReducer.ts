import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { User } from "@entities";

interface AuthState {
  currentUser: User | null;
}

const initialState: AuthState = {
  currentUser: null,
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload;
    },
  },
});

const persistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage,
};

export const authActions = authState.actions;

export const authReducer = persistReducer(persistConfig, authState.reducer);
