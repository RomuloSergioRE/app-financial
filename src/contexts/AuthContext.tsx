"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { authService } from "@/services/auth.service";
import type { User, LoginRequest, RegisterRequest } from "@/types";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  initializing: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
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

  const logout = useCallback(() => {
    authService.logout().finally(() => {
      setUser(null);
      window.location.href = "/login";
    });
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
