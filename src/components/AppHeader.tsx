import React from 'react';
import AvatarWidget from './AvatarWidget';

const AppHeader: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    height: '60px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#212529',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <span>🔌</span>
        Glitter Roller
      </div>
      <div style={rightSectionStyle}>
        <AvatarWidget />
      </div>
    </header>
  );
};

export default AppHeader;