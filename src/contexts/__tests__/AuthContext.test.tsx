import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from '../AuthContext';

// Test component that uses the auth context
const TestComponent: React.FC = () => {
  const { authState, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {authState.isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
      <div data-testid="loading-status">
        {authState.isLoading ? 'loading' : 'not-loading'}
      </div>
      {authState.user && (
        <div data-testid="user-info">
          {authState.user.name} - {authState.user.email}
        </div>
      )}
      <button onClick={login} data-testid="login-btn">Login</button>
      <button onClick={logout} data-testid="logout-btn">Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('provides initial unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
    expect(screen.queryByTestId('user-info')).not.toBeInTheDocument();
  });

  test('handles login flow correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByTestId('login-btn');
    fireEvent.click(loginBtn);

    // Should show loading state immediately
    expect(screen.getByTestId('loading-status')).toHaveTextContent('loading');

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    }, { timeout: 2000 });

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByTestId('loading-status')).toHaveTextContent('not-loading');
    }, { timeout: 3000 });

    expect(screen.getByTestId('user-info')).toHaveTextContent('John Doe - john.doe@example.com');
  });

  test('handles logout correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // First login
    const loginBtn = screen.getByTestId('login-btn');
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    }, { timeout: 2000 });

    // Then logout
    const logoutBtn = screen.getByTestId('logout-btn');
    fireEvent.click(logoutBtn);

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.queryByTestId('user-info')).not.toBeInTheDocument();
  });

  test('restores authentication from localStorage', () => {
    // Pre-populate localStorage
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.png'
    };
    
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_data', JSON.stringify(mockUser));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('user-info')).toHaveTextContent('John Doe - john.doe@example.com');
  });

  test('handles invalid localStorage data gracefully', () => {
    // Set invalid JSON in localStorage
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_data', 'invalid-json');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Should remain unauthenticated and clear invalid data
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('user_data')).toBeNull();
  });

  test('throws error when useAuth is used outside AuthProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleSpy.mockRestore();
  });
});