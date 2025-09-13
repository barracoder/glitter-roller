export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scopes: string[];
  authorizationUrl: string;
  tokenUrl: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: () => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}