import { api } from "../api/api";
import { LoginResponse } from "@/lib/auth";

export const AuthService = {
  login: async (login: string, password: string) => {
    const { data } = await api.post<LoginResponse>(
      "/auth/login",
      {
        login,
        password,
      }
    );

    return data;
  },
  me: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },
};