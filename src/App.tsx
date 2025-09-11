import React, { useEffect } from 'react';
import { PluginProvider, usePlugins } from './context/PluginContext';
import { Layout } from './components/Layout';
import { dashboardPlugin } from './plugins/dashboard.plugin';
import { userManagementPlugin } from './plugins/userManagement.plugin';
import { settingsPlugin } from './plugins/settings.plugin';
import './App.css';

const AppContent: React.FC = () => {
  const { registerPlugin } = usePlugins();

  useEffect(() => {
    const loadPlugins = async () => {
      try {
        // Load core plugins
        await registerPlugin(dashboardPlugin);
        await registerPlugin(userManagementPlugin);
        await registerPlugin(settingsPlugin);
        
        console.log('All plugins loaded successfully');
      } catch (error) {
        // Ignore if plugins are already registered
        if (error instanceof Error && error.message.includes('already registered')) {
          console.log('Plugins already loaded');
        } else {
          console.error('Failed to load plugins:', error);
        }
      }
    };

    loadPlugins();
  }, [registerPlugin]);

  return <Layout />;
};

function App() {
  return (
    <PluginProvider>
      <AppContent />
    </PluginProvider>
  );
}

export default App;
