import { type Response } from './utils.type';

import type { User } from './user.type';
export type AuthResponse = Response<{
  access_token: string;
  expires_in: string;
  user: User;
}>;
