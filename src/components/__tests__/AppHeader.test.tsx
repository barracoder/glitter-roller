import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppHeader from '../AppHeader';
import { AuthProvider } from '../../contexts/AuthContext';

describe('AppHeader', () => {
  test('renders header with logo and avatar widget', () => {
    render(
      <AuthProvider>
        <AppHeader />
      </AuthProvider>
    );

    // Check for logo
    expect(screen.getByText('🔌')).toBeInTheDocument();
    expect(screen.getByText('Glitter Roller')).toBeInTheDocument();

    // Check for sign in button (indicating AvatarWidget is rendered)
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('has correct header structure', () => {
    render(
      <AuthProvider>
        <AppHeader />
      </AuthProvider>
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Header should contain both logo and auth sections
    expect(header).toContainElement(screen.getByText('Glitter Roller'));
    expect(header).toContainElement(screen.getByText('Sign In'));
  });
});