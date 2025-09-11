import React from 'react';
import { PluginProps } from '../types/plugin.types';

const JsonDataLoaderPlugin: React.FC<PluginProps> = ({ config, pluginId }) => {
  const connectionString = config.connectionStrings?.default || 'No connection string configured';
  const authType = config.authSettings?.type || 'none';

  return (
    <div style={{ padding: '20px' }}>
      <h2>JSON Data Loader</h2>
      <p>Plugin ID: {pluginId}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Configuration</h3>
        <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          <p><strong>Connection String:</strong> {connectionString}</p>
          <p><strong>Auth Type:</strong> {authType}</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Functionality</h3>
        <p>This plugin would typically:</p>
        <ul>
          <li>Read JSON files from the configured path</li>
          <li>Parse and validate JSON structure</li>
          <li>Transform data as needed</li>
          <li>Load data into the system</li>
        </ul>
      </div>

      <button 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('JSON loading would be triggered here')}
      >
        Load JSON Data
      </button>
    </div>
  );
};

export default JsonDataLoaderPlugin;