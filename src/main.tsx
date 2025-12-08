import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "modern-normalize";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./redux/store.js";
import { ThemeProvider } from "./context/themeContext.js";

// if (import.meta.env.DEV) {
//   import("./mocks/browser.js").then(({ worker }) => {
//     worker
//       .start({
//         onUnhandledRequest: "bypass",
//       })
//       .then(() => {
//         renderApp();
//       });
//   });
// } else {
//   renderApp();
// }

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
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
  </StrictMode>
);
