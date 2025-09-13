import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarWidget from '../AvatarWidget';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://example.com/avatar.png'
};

describe('AvatarWidget', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows sign in button when not authenticated', () => {
    render(
      <AuthProvider>
        <AvatarWidget />
      </AuthProvider>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument();
  });

  test('shows loading state during login', async () => {
    render(
      <AuthProvider>
        <AvatarWidget />
      </AuthProvider>
    );

    const signInBtn = screen.getByText('Sign In');
    fireEvent.click(signInBtn);

    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });

  test('shows avatar and user menu when authenticated', async () => {
    render(
      <AuthProvider>
        <AvatarWidget />
      </AuthProvider>
    );

    // Login first
    const signInBtn = screen.getByText('Sign In');
    fireEvent.click(signInBtn);

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Click avatar to open menu
    const avatarBtn = screen.getByRole('button', { name: /john doe/i });
    fireEvent.click(avatarBtn);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('closes menu when clicking outside', async () => {
    render(
      <AuthProvider>
        <AvatarWidget />
      </AuthProvider>
    );

    // Login first
    const signInBtn = screen.getByText('Sign In');
    fireEvent.click(signInBtn);

    await waitFor(() => {
      expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Open menu
    const avatarBtn = screen.getByRole('button', { name: /john doe/i });
    fireEvent.click(avatarBtn);

    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    // Click outside to close menu
    fireEvent.mouseDown(document.body);

    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  test('handles logout from menu', async () => {
    render(
      <AuthProvider>
        <AvatarWidget />
      </AuthProvider>
    );

    // Login first
    const signInBtn = screen.getByText('Sign In');
    fireEvent.click(signInBtn);

    await waitFor(() => {
      expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Open menu and click sign out
    const avatarBtn = screen.getByRole('button', { name: /john doe/i });
    fireEvent.click(avatarBtn);

    const signOutBtn = screen.getByText('Sign Out');
    fireEvent.click(signOutBtn);

    // Should return to sign in state
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument();
  });

  test('displays user initials when no avatar available', async () => {
    // Mock user without avatar
    const userWithoutAvatar = {
      id: '1',
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    };

    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_data', JSON.stringify(userWithoutAvatar));

    render(
      <AuthProvider>
        <AvatarWidget />
      </AuthProvider>
    );

    // Should show user's first initial
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  test('handles hover effects on sign in button', () => {
    render(
      <AuthProvider>
        <AvatarWidget />
      </AuthProvider>
    );

    const signInBtn = screen.getByText('Sign In');
    
    // Test hover styles are applied (this tests the onMouseEnter/Leave handlers)
    fireEvent.mouseEnter(signInBtn);
    fireEvent.mouseLeave(signInBtn);
    
    // Just ensure the button is still there and functional
    expect(signInBtn).toBeInTheDocument();
  });

  test('restores authenticated state from localStorage', () => {
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_data', JSON.stringify(mockUser));

    render(
      <AuthProvider>
        <AvatarWidget />
      </AuthProvider>
    );

    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });
});