import React, { useState } from 'react';
import { PluginHierarchy, PluginMetadata } from '../types/plugin.types';

interface PluginNavigationProps {
  pluginHierarchy: PluginHierarchy;
  selectedPluginId: string | null;
  onPluginSelect: (pluginId: string) => void;
}

const PluginNavigation: React.FC<PluginNavigationProps> = ({
  pluginHierarchy,
  selectedPluginId,
  onPluginSelect,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const navigationStyle: React.CSSProperties = {
    width: '300px',
    height: '100%',
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #dee2e6',
    padding: '20px',
    overflowY: 'auto',
  };

  const categoryStyle: React.CSSProperties = {
    marginBottom: '15px',
  };

  const categoryHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  };

  const pluginItemStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '4px 0',
    backgroundColor: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.2s',
  };

  const selectedPluginItemStyle: React.CSSProperties = {
    ...pluginItemStyle,
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff',
  };

  const pluginListStyle: React.CSSProperties = {
    marginTop: '8px',
    paddingLeft: '16px',
  };

  return (
    <div style={navigationStyle}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#495057' }}>
        Plugins
      </h3>
      
      {Object.entries(pluginHierarchy).map(([category, plugins]) => (
        <div key={category} style={categoryStyle}>
          <div 
            style={categoryHeaderStyle}
            onClick={() => toggleCategory(category)}
          >
            <span>{category}</span>
            <span style={{ fontSize: '12px' }}>
              {expandedCategories[category] ? '▼' : '▶'}
            </span>
          </div>
          
          {expandedCategories[category] && (
            <div style={pluginListStyle}>
              {plugins.map((plugin: PluginMetadata) => (
                <div
                  key={plugin.id}
                  style={
                    selectedPluginId === plugin.id 
                      ? selectedPluginItemStyle 
                      : pluginItemStyle
                  }
                  onClick={() => onPluginSelect(plugin.id)}
                  onMouseEnter={(e) => {
                    if (selectedPluginId !== plugin.id) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPluginId !== plugin.id) {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }
                  }}
                >
                  <div style={{ fontWeight: '500' }}>{plugin.name}</div>
                  {plugin.description && (
                    <div style={{ 
                      fontSize: '11px', 
                      marginTop: '2px',
                      opacity: selectedPluginId === plugin.id ? 0.9 : 0.7
                    }}>
                      {plugin.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PluginNavigation;