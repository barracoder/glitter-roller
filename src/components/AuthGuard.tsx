import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuthentication: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuthentication }) => {
  const { authState, login } = useAuth();

  // If authentication is not required, always show children
  if (!requireAuthentication) {
    return <>{children}</>;
  }

  // If authentication is required but user is not authenticated, show auth required screen
  if (!authState.isAuthenticated) {
    return <AuthRequiredScreen onLogin={login} isLoading={authState.isLoading} />;
  }

  // User is authenticated, show the protected content
  return <>{children}</>;
};

interface AuthRequiredScreenProps {
  onLogin: () => void;
  isLoading: boolean;
}

const AuthRequiredScreen: React.FC<AuthRequiredScreenProps> = ({ onLogin, isLoading }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: '20px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '16px',
  };

  const messageStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#6c757d',
    marginBottom: '32px',
    lineHeight: '1.5',
  };

  const loginButtonStyle: React.CSSProperties = {
    backgroundColor: '#0078d4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
  };

  const loadingSpinnerStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const microsoftIconStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    background: 'linear-gradient(45deg, #f25022 25%, #7fba00 25%, #7fba00 50%, #00a4ef 50%, #00a4ef 75%, #ffb900 75%)',
    borderRadius: '2px',
  };

  return (
    <div style={containerStyle} data-testid="auth-required-screen">
      <div style={cardStyle}>
        <div style={iconStyle}>🔐</div>
        <h1 style={titleStyle}>Authentication Required</h1>
        <p style={messageStyle}>
          This application requires authentication to access its features. 
          Please sign in with your Microsoft account to continue.
        </p>
        <button
          style={loginButtonStyle}
          onClick={onLogin}
          disabled={isLoading}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#106ebe';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#0078d4';
            }
          }}
        >
          {isLoading ? (
            <>
              <div style={loadingSpinnerStyle}></div>
              Signing in...
            </>
          ) : (
            <>
              <div style={microsoftIconStyle}></div>
              Sign in with Microsoft
            </>
          )}
        </button>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AuthGuard;