"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import { authService } from "@/services/auth.service";
import type { User, LoginRequest, RegisterRequest } from "@/types";

function getUserFromToken(): User | null {
  if (typeof window === "undefined") return null;

  const token = Cookies.get("jwt_token");
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
    Cookies.remove("jwt_token");
    Cookies.remove("refresh_token");
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
    const { user: userData, token, refreshToken } = await authService.login(data);
    Cookies.set("jwt_token", token, { expires: 7, sameSite: "lax", secure: true, partitioned: true });
    Cookies.set("refresh_token", refreshToken, { expires: 30, sameSite: "lax", secure: true, partitioned: true });
    setUser(userData);
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const { user: userData, token, refreshToken } = await authService.register(data);
    Cookies.set("jwt_token", token, { expires: 7, sameSite: "lax", secure: true, partitioned: true });
    Cookies.set("refresh_token", refreshToken, { expires: 30, sameSite: "lax", secure: true, partitioned: true });
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
    Cookies.remove("jwt_token");
    Cookies.remove("refresh_token");
    setUser(null);
    window.location.href = "/login";
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
