import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, User } from '../types/auth.types';

interface AuthAction {
  type: 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'LOGOUT' | 'REFRESH_TOKEN';
  payload?: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        isAuthenticated: true,
        user: action.payload || null,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    case 'REFRESH_TOKEN':
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing authentication on app start
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  }, []);

  const login = () => {
    dispatch({ type: 'LOGIN_START' });
    
    // For demo purposes, we'll simulate Microsoft OAuth flow
    // In production, this would redirect to Microsoft OAuth provider:
    // window.location.href = `${oauthConfig.authorizationUrl}?client_id=${oauthConfig.clientId}&response_type=code&redirect_uri=${encodeURIComponent(oauthConfig.redirectUri)}&scope=${encodeURIComponent(oauthConfig.scopes.join(' '))}`;
    
    // Simulate Microsoft OAuth response
    setTimeout(() => {
      const mockUser: User = {
        id: 'user123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: `https://ui-avatars.com/api/?name=John+Doe&background=0078d4&color=fff`,
      };
      
      // Store auth data
      localStorage.setItem('auth_token', 'mock_ms_token_' + Date.now());
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    }, 2000); // Longer delay to simulate real OAuth flow
  };

  const logout = () => {
    // Clear stored auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    dispatch({ type: 'LOGOUT' });
  };

  const refreshToken = async () => {
    dispatch({ type: 'REFRESH_TOKEN' });
    // In a real app, this would refresh the token
    // For now, just maintain current state
  };

  const value: AuthContextType = {
    authState,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};