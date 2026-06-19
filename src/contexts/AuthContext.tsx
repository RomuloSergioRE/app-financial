"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { authService } from "@/services/auth.service";
import type { User, LoginRequest, RegisterRequest } from "@/types";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  initializing: boolean;
  role: User["role"] | null;
  plan: User["plan"] | null;
  currency: string;
  locale: string;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    authService
      .getProfile()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setInitializing(false));
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    const userData = await authService.login(data);
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const userData = await authService.register(data);
    setUser(userData);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await authService.getProfile();
      setUser(userData);
    } catch {
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
    } finally {
      setUser(null);
      const locale = user?.locale ?? "pt-BR";
      window.location.href = `/${locale}/login`;
    }
  }, [user?.locale]);

  if (initializing) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        plan: user?.plan ?? null,
        currency: user?.currency ?? "BRL",
        locale: user?.locale ?? "pt-BR",
        isAuthenticated: !!user,
        initializing,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
