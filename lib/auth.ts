export interface User {
  id: number;
  fullname: string;
  email: string;
  role: "firma" | "market" | "admin";
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  role: "firma" | "market" | "admin";
}