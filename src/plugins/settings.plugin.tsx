import React, { useState } from 'react';
import type { Plugin } from '../types/plugin';
import { usePlugins } from '../context/PluginContext';

const SettingsPage: React.FC = () => {
  const { plugins, unregisterPlugin } = usePlugins();
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleUnloadPlugin = async (pluginId: string) => {
    try {
      await unregisterPlugin(pluginId);
      alert(`Plugin ${pluginId} unloaded successfully`);
    } catch (error) {
      alert(`Failed to unload plugin: ${error}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>Settings</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Application Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '200px' }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span>Enable Notifications</span>
            </label>
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
              />
              <span>Auto-save Changes</span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Plugin Management</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {plugins.map((plugin) => (
            <div 
              key={plugin.metadata.id}
              style={{ 
                background: '#f9f9f9', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{plugin.metadata.name}</h4>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>{plugin.metadata.description}</p>
                <small style={{ color: '#999' }}>
                  v{plugin.metadata.version} by {plugin.metadata.author}
                </small>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleUnloadPlugin(plugin.metadata.id)}
                  style={{
                    padding: '6px 12px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Unload
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>System Information</h2>
        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
          <p><strong>Application:</strong> Glitter Roller v1.0.0</p>
          <p><strong>Build:</strong> Development</p>
          <p><strong>Loaded Plugins:</strong> {plugins.length}</p>
          <p><strong>User Agent:</strong> {navigator.userAgent}</p>
        </div>
      </div>
    </div>
  );
};

const SettingsWidget: React.FC = () => {
  return (
    <div style={{ 
      background: '#fff8e1', 
      padding: '15px', 
      borderRadius: '6px',
      border: '1px solid #ffc107',
      margin: '10px 0'
    }}>
      <h4>⚙️ Quick Settings</h4>
      <p>Theme: Light | Notifications: On</p>
      <button 
        style={{ 
          padding: '4px 8px', 
          background: '#ffc107', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Open Settings
      </button>
    </div>
  );
};

export const settingsPlugin: Plugin = {
  metadata: {
    id: 'settings',
    name: 'Settings Plugin',
    version: '1.0.0',
    description: 'Application settings and plugin management',
    author: 'Glitter Roller Team',
  },
  
  components: {
    'settings-widget': {
      component: SettingsWidget,
    },
  },
  
  routes: [
    {
      path: '/settings',
      component: SettingsPage,
    },
  ],
  
  menuItems: [
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: React.createElement('span', { style: { marginRight: '8px' } }, '⚙️'),
    },
  ],
  
  hooks: {
    onLoad: async () => {
      console.log('Settings plugin loaded');
    },
    onUnload: async () => {
      console.log('Settings plugin unloaded');
    },
  },
  
  initialize: async () => {
    console.log('Settings plugin initialized');
  },
  
  destroy: async () => {
    console.log('Settings plugin destroyed');
  },
};