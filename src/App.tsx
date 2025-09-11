import React, { useState, useEffect } from 'react';
import PluginNavigation from './components/PluginNavigation';
import MainContentArea from './components/MainContentArea';
import { PluginLoader } from './services/PluginLoader';
import { appConfig } from './config/app.config';
import { Plugin } from './types/plugin.types';
import './App.css';

function App() {
  const [selectedPluginId, setSelectedPluginId] = useState<string | null>(null);
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
  const [loadedPlugins, setLoadedPlugins] = useState<Plugin[]>([]);

  useEffect(() => {
    // Load all plugins on app initialization
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
    height: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  };

  return (
    <div style={appStyle} data-testid="app-container">
      <PluginNavigation
        pluginHierarchy={appConfig.pluginHierarchy}
        selectedPluginId={selectedPluginId}
        onPluginSelect={handlePluginSelect}
      />
      <MainContentArea selectedPlugin={selectedPlugin} />
    </div>
  );
}

export default App;
