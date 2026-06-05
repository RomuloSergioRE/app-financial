"use client";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import GlobalStyle from "@/styles/global";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Toast } from "@/components/molecules/Toast";

function ThemedApp({ children }: { children: React.ReactNode }) {
  const { themeObject } = useTheme();
  return (
    <StyledThemeProvider theme={themeObject}>
      <GlobalStyle />
      <Toast />
      {children}
    </StyledThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ThemedApp>{children}</ThemedApp>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
