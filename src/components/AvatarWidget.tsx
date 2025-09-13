import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AvatarWidget: React.FC = () => {
  const { authState, login, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const avatarButtonStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #dee2e6',
    backgroundColor: authState.isAuthenticated ? 'transparent' : '#6c757d',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'all 0.2s',
    fontSize: '14px',
    color: '#fff',
  };

  const avatarImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  };

  const loginButtonStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  };

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50px',
    right: '0',
    backgroundColor: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '200px',
    zIndex: 1000,
  };

  const menuHeaderStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid #dee2e6',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px 8px 0 0',
  };

  const userNameStyle: React.CSSProperties = {
    fontWeight: '600',
    fontSize: '14px',
    color: '#212529',
    margin: '0 0 4px 0',
  };

  const userEmailStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#6c757d',
    margin: '0',
  };

  const menuItemStyle: React.CSSProperties = {
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#212529',
    transition: 'background-color 0.2s',
    borderRadius: '0 0 8px 8px',
  };

  const loadingSpinnerStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    border: '2px solid #f3f3f3',
    borderTop: '2px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  if (!authState.isAuthenticated) {
    return (
      <div style={containerStyle}>
        <button
          style={loginButtonStyle}
          onClick={login}
          disabled={authState.isLoading}
          onMouseEnter={(e) => {
            if (!authState.isLoading) {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }
          }}
          onMouseLeave={(e) => {
            if (!authState.isLoading) {
              e.currentTarget.style.backgroundColor = '#007bff';
            }
          }}
        >
          {authState.isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={loadingSpinnerStyle}></div>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle} ref={menuRef}>
      <button
        style={avatarButtonStyle}
        onClick={() => setShowMenu(!showMenu)}
        title={`${authState.user?.name} - Click for menu`}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#007bff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#dee2e6';
        }}
      >
        {authState.user?.avatar ? (
          <img src={authState.user.avatar} alt={authState.user.name} style={avatarImageStyle} />
        ) : (
          <span>{authState.user?.name?.charAt(0) || '?'}</span>
        )}
      </button>

      {showMenu && (
        <div style={menuStyle}>
          <div style={menuHeaderStyle}>
            <div style={userNameStyle}>{authState.user?.name}</div>
            <div style={userEmailStyle}>{authState.user?.email}</div>
          </div>
          <div
            style={menuItemStyle}
            onClick={() => {
              logout();
              setShowMenu(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Sign Out
          </div>
        </div>
      )}

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

export default AvatarWidget;