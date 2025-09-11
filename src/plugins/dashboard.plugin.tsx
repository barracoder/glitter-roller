import React from 'react';
import type { Plugin } from '../types/plugin';

const DashboardPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3>Welcome to Glitter Roller</h3>
          <p>This is a sample dashboard plugin that demonstrates the plugin architecture.</p>
        </div>
        <div style={{ 
          background: '#e3f2fd', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #2196f3'
        }}>
          <h3>Plugin System</h3>
          <p>This website uses a modular plugin system. Each feature can be developed as an independent plugin.</p>
        </div>
        <div style={{ 
          background: '#f3e5f5', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #9c27b0'
        }}>
          <h3>Modern Stack</h3>
          <p>Built with React, TypeScript, Vite, Jest, and Playwright for a modern development experience.</p>
        </div>
      </div>
    </div>
  );
};

const DashboardWidget: React.FC = () => {
  return (
    <div style={{ 
      background: '#fff3e0', 
      padding: '15px', 
      borderRadius: '6px',
      border: '1px solid #ff9800',
      margin: '10px 0'
    }}>
      <h4>Dashboard Widget</h4>
      <p>This is a reusable dashboard widget component.</p>
    </div>
  );
};

export const dashboardPlugin: Plugin = {
  metadata: {
    id: 'dashboard',
    name: 'Dashboard Plugin',
    version: '1.0.0',
    description: 'A sample dashboard plugin with widgets and overview',
    author: 'Glitter Roller Team',
  },
  
  components: {
    'dashboard-widget': {
      component: DashboardWidget,
    },
  },
  
  routes: [
    {
      path: '/',
      component: DashboardPage,
      exact: true,
    },
    {
      path: '/dashboard',
      component: DashboardPage,
    },
  ],
  
  menuItems: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: React.createElement('span', { style: { marginRight: '8px' } }, '📊'),
    },
  ],
  
  hooks: {
    onLoad: async () => {
      console.log('Dashboard plugin loaded');
    },
    onUnload: async () => {
      console.log('Dashboard plugin unloaded');
    },
    onRouteChange: async (route: string) => {
      console.log(`Dashboard plugin: Route changed to ${route}`);
    },
  },
  
  initialize: async () => {
    console.log('Dashboard plugin initialized');
  },
  
  destroy: async () => {
    console.log('Dashboard plugin destroyed');
  },
};