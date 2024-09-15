import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface DrawerState {
  isOpen: boolean;
}

const initialState: DrawerState = {
  isOpen: true,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      // NOTE: We want to use the no-param-reassign rule globally, but as toolkit uses immer, we are safe here
      // eslint-disable-next-line no-param-reassign
      state.isOpen = action.payload;
    },
  },
});

const persistConfig: PersistConfig<DrawerState> = {
  key: "drawer",
  storage,
};

export const drawerActions = drawerSlice.actions;

export const drawerReducer = persistReducer(persistConfig, drawerSlice.reducer);
