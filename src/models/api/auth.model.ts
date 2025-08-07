export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresIn?: number;
  userId?: string;
  userType: string;
}
