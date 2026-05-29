"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import { authService } from "@/services/auth";
import type { User, LoginRequest, RegisterRequest } from "@/types";

function getUserFromToken(): User | null {
  if (typeof window === "undefined") return null;

  const token = Cookies.get("jwt_token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      status: payload.status,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getUserFromToken);

  const login = useCallback(async (data: LoginRequest) => {
    const response = await authService.login(data);
    const { user: userData, token, refreshToken } = response.data;
    Cookies.set("jwt_token", token, { expires: 7 });
    Cookies.set("refresh_token", refreshToken, { expires: 30 });
    setUser(userData);
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    const response = await authService.register(data);
    const { user: userData, token, refreshToken } = response.data;
    Cookies.set("jwt_token", token, { expires: 7 });
    Cookies.set("refresh_token", refreshToken, { expires: 30 });
    setUser(userData);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
