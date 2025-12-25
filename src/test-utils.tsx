import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/auth/slice";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

export const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = createTestQueryClient();

  const store = configureStore({
    reducer: {
      auth: authReducer,
    },

    preloadedState: {
      auth: {
        token: "test-token",
        isLoggedIn: true,
        isRefreshing: false,
        user: { id: "1", name: "Test User" },
      } as any,
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};
