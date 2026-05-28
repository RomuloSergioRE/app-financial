"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import { authService } from "@/services/auth";
import type { User, LoginRequest, RegisterRequest } from "@/types";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          status: payload.status,
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
        });
      } catch {
        Cookies.remove("jwt_token");
        Cookies.remove("refresh_token");
      }
    }
    setIsLoading(false);
  }, []);

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
        isLoading,
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
