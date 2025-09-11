import React from 'react';
import { PluginProps } from '../types/plugin.types';

const AnalyticsDashboardPlugin: React.FC<PluginProps> = ({ config, pluginId }) => {
  const apiUrl = config.apiBaseUrls?.analytics || 'No analytics API configured';
  const authType = config.authSettings?.type || 'none';
  const clientId = config.authSettings?.credentials?.clientId || 'No client ID';

  return (
    <div style={{ padding: '20px' }}>
      <h2>Analytics Dashboard</h2>
      <p>Plugin ID: {pluginId}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Configuration</h3>
        <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          <p><strong>Analytics API:</strong> {apiUrl}</p>
          <p><strong>Auth Type:</strong> {authType}</p>
          <p><strong>Client ID:</strong> {clientId}</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Analytics Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '4px' }}>
            <h4>Total Users</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>1,234</p>
          </div>
          <div style={{ background: '#e8f5e8', padding: '15px', borderRadius: '4px' }}>
            <h4>Active Sessions</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>567</p>
          </div>
          <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '4px' }}>
            <h4>Total Revenue</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>$12,345</p>
          </div>
          <div style={{ background: '#fce4ec', padding: '15px', borderRadius: '4px' }}>
            <h4>Conversion Rate</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#c2185b' }}>3.2%</p>
          </div>
        </div>
      </div>

      <button 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#ffc107', 
          color: 'black', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Refreshing analytics data...')}
      >
        Refresh Data
      </button>
    </div>
  );
};

export default AnalyticsDashboardPlugin;