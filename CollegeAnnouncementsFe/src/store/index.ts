import persistStore from "redux-persist/es/persistStore";

import { store } from "./config/storeConfig";

export * from "./config/storeConfig";
export * from "./api";

export const persistor = persistStore(store);
