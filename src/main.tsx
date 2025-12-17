import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "modern-normalize";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./redux/store.js";
import { ThemeProvider } from "./context/themeContext.js";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./components/Common/ErrorBoundary";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Toaster position="top-right" />
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
