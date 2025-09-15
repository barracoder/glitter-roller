import React, { useState, useEffect } from 'react';
import PluginNavigation from './components/PluginNavigation';
import MainContentArea from './components/MainContentArea';
import AppHeader from './components/AppHeader';
import AuthGuard from './components/AuthGuard';
import { AuthProvider } from './contexts/AuthContext';
import { PluginLoader } from './services/PluginLoader';
import { appConfig } from './config/app.config';
import { Plugin } from './types/plugin.types';
import { generatePluginHierarchy } from './utils/pluginUtils';
import './App.css';

function App() {
  const [selectedPluginId, setSelectedPluginId] = useState<string | null>(null);
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
  const [loadedPlugins, setLoadedPlugins] = useState<Plugin[]>([]);

  useEffect(() => {
    // Initialize PluginLoader with config and load all plugins on app initialization
    PluginLoader.initialize(appConfig);
    const plugins = PluginLoader.loadPlugins(appConfig.plugins);
    setLoadedPlugins(plugins);
  }, []);

  useEffect(() => {
    // Update selected plugin when selectedPluginId changes
    if (selectedPluginId) {
      const plugin = loadedPlugins.find(p => p.metadata.id === selectedPluginId);
      setSelectedPlugin(plugin || null);
    } else {
      setSelectedPlugin(null);
    }
  }, [selectedPluginId, loadedPlugins]);

  const handlePluginSelect = (pluginId: string) => {
    setSelectedPluginId(pluginId);
  };

  const appStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  };

  const mainAreaStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  };

  // Generate plugin hierarchy dynamically from plugins array
  const pluginHierarchy = generatePluginHierarchy(appConfig.plugins);

  return (
    <AuthProvider>
      <AuthGuard requireAuthentication={appConfig.requireAuthentication || false}>
        <div style={appStyle} data-testid="app-container">
          <AppHeader />
          <div style={mainAreaStyle}>
            <PluginNavigation
              pluginHierarchy={pluginHierarchy}
              selectedPluginId={selectedPluginId}
              onPluginSelect={handlePluginSelect}
            />
            <MainContentArea selectedPlugin={selectedPlugin} />
          </div>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}

export default App;
