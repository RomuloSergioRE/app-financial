"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { cookie } from "@/lib/cookie";
import { authService } from "@/services/auth.service";
import type { User, LoginRequest, RegisterRequest } from "@/types";

function getUserFromToken(): User | null {
  if (typeof window === "undefined") return null;

  const token = cookie.getToken("jwt_token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.role || !payload.email) {
      throw new Error("Token inválido: payload incompleto");
    }
    return {
      id: payload.userId || payload.id,
      name: payload.name || "",
      email: payload.email,
      role: payload.role,
      status: payload.status,
      createdAt: payload.createdAt || "",
      updatedAt: payload.updatedAt || "",
    };
  } catch {
    cookie.removeToken("jwt_token");
    cookie.removeToken("refresh_token");
    return null;
  }
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getUserFromToken);

  const login = useCallback(async (data: LoginRequest) => {
    const { user: userData, accessToken, refreshToken } = await authService.login(data);
    cookie.setToken("jwt_token", accessToken, 7);
    cookie.setToken("refresh_token", refreshToken, 30);
    setUser(userData);
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const { user: userData, accessToken, refreshToken } = await authService.register(data);
    cookie.setToken("jwt_token", accessToken, 7);
    cookie.setToken("refresh_token", refreshToken, 30);
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
      cookie.removeToken("jwt_token");
      cookie.removeToken("refresh_token");
      setUser(null);
      window.location.href = "/login";
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
