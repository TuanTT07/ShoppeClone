import type { AuthResponse } from '../types/auth.type';
import http from '../utils/http';

export const resgisterAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>('/register', body);
};
