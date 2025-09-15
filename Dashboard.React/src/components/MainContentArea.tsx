import React from 'react';
import { Plugin } from '../types/plugin.types';

interface MainContentAreaProps {
  selectedPlugin: Plugin | null;
}

const MainContentArea: React.FC<MainContentAreaProps> = ({ selectedPlugin }) => {
  const contentStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    overflow: 'auto',
    backgroundColor: '#ffffff',
  };

  const placeholderStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#6c757d',
    fontSize: '18px',
  };

  if (!selectedPlugin) {
    return (
      <div style={contentStyle} data-testid="main-content-area">
        <div style={placeholderStyle}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔌</div>
          <h2>Welcome to Glitter Roller</h2>
          <p>Select a plugin from the navigation panel to get started.</p>
        </div>
      </div>
    );
  }

  const PluginComponent = selectedPlugin.component;

  return (
    <div style={contentStyle} data-testid="main-content-area">
      <PluginComponent 
        config={selectedPlugin.metadata.config}
        pluginId={selectedPlugin.metadata.id}
      />
    </div>
  );
};

export default MainContentArea;