import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthGuard from '../AuthGuard';

// Mock the auth context
jest.mock('../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../contexts/AuthContext'),
  useAuth: jest.fn(),
}));

const mockUseAuth = require('../../contexts/AuthContext').useAuth;

const TestComponent = () => <div data-testid="protected-content">Protected Content</div>;

describe('AuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when authentication is not required', () => {
    mockUseAuth.mockReturnValue({
      authState: { isAuthenticated: false, user: null, isLoading: false },
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
    });

    render(
      <AuthGuard requireAuthentication={false}>
        <TestComponent />
      </AuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('renders children when authentication is required and user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      authState: { 
        isAuthenticated: true, 
        user: { id: '1', name: 'John Doe', email: 'john@example.com' }, 
        isLoading: false 
      },
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
    });

    render(
      <AuthGuard requireAuthentication={true}>
        <TestComponent />
      </AuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('renders auth required screen when authentication is required and user is not authenticated', () => {
    const mockLogin = jest.fn();
    mockUseAuth.mockReturnValue({
      authState: { isAuthenticated: false, user: null, isLoading: false },
      login: mockLogin,
      logout: jest.fn(),
      refreshToken: jest.fn(),
    });

    render(
      <AuthGuard requireAuthentication={true}>
        <TestComponent />
      </AuthGuard>
    );

    expect(screen.getByTestId('auth-required-screen')).toBeInTheDocument();
    expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    expect(screen.getByText('Sign in with Microsoft')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('calls login when sign in button is clicked', () => {
    const mockLogin = jest.fn();
    mockUseAuth.mockReturnValue({
      authState: { isAuthenticated: false, user: null, isLoading: false },
      login: mockLogin,
      logout: jest.fn(),
      refreshToken: jest.fn(),
    });

    render(
      <AuthGuard requireAuthentication={true}>
        <TestComponent />
      </AuthGuard>
    );

    fireEvent.click(screen.getByText('Sign in with Microsoft'));
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when authentication is in progress', () => {
    mockUseAuth.mockReturnValue({
      authState: { isAuthenticated: false, user: null, isLoading: true },
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
    });

    render(
      <AuthGuard requireAuthentication={true}>
        <TestComponent />
      </AuthGuard>
    );

    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });

  it('disables button when loading', () => {
    mockUseAuth.mockReturnValue({
      authState: { isAuthenticated: false, user: null, isLoading: true },
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
    });

    render(
      <AuthGuard requireAuthentication={true}>
        <TestComponent />
      </AuthGuard>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});