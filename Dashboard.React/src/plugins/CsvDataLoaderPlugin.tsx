import React from 'react';
import { PluginProps } from '../types/plugin.types';

const CsvDataLoaderPlugin: React.FC<PluginProps> = ({ config, pluginId }) => {
  const connectionString = config.connectionStrings?.default || 'No connection string configured';
  const apiUrl = config.apiBaseUrls?.validation || 'No validation API configured';
  const authType = config.authSettings?.type || 'none';

  return (
    <div style={{ padding: '20px' }}>
      <h2>CSV Data Loader</h2>
      <p>Plugin ID: {pluginId}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Configuration</h3>
        <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          <p><strong>Connection String:</strong> {connectionString}</p>
          <p><strong>Validation API:</strong> {apiUrl}</p>
          <p><strong>Auth Type:</strong> {authType}</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Functionality</h3>
        <p>This plugin would typically:</p>
        <ul>
          <li>Read CSV files from the configured path</li>
          <li>Validate data using the configured API</li>
          <li>Apply authentication based on settings</li>
          <li>Transform and load data into the system</li>
        </ul>
      </div>

      <button 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('CSV loading would be triggered here')}
      >
        Load CSV Data
      </button>
    </div>
  );
};

export default CsvDataLoaderPlugin;