import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { AlertProvider, ErrorBoundaryProvider, NetworkConnectionProvider } from "@providers";
import { RootRouter } from "@router";
import { persistor, store } from "@store";

function App() {
  return (
    <ErrorBoundaryProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <NetworkConnectionProvider>
            <AlertProvider />
            <RootRouter />
          </NetworkConnectionProvider>
        </Provider>
      </PersistGate>
    </ErrorBoundaryProvider>
  );
}

export default App;
