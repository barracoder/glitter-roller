import { PluginLoader } from '../PluginLoader';
import { PluginMetadata } from '../../types/plugin.types';

// Mock the plugin components
jest.mock('../../plugins/CsvDataLoaderPlugin', () => {
  return function MockCsvDataLoaderPlugin() {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'csv-loader' }, 'CSV Loader Plugin');
  };
});

jest.mock('../../plugins/JsonDataLoaderPlugin', () => {
  return function MockJsonDataLoaderPlugin() {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'json-loader' }, 'JSON Loader Plugin');
  };
});

jest.mock('../../plugins/AnalyticsDashboardPlugin', () => {
  return function MockAnalyticsDashboardPlugin() {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'analytics-dashboard' }, 'Analytics Dashboard Plugin');
  };
});

describe('PluginLoader', () => {
  const mockCsvLoaderMetadata: PluginMetadata = {
    id: 'data-loader-1',
    name: 'CSV Data Loader',
    version: '1.0.0',
    category: 'Loaders',
    config: {
      connectionStrings: { default: 'file://./data' }
    }
  };

  const mockJsonLoaderMetadata: PluginMetadata = {
    id: 'data-loader-2',
    name: 'JSON Data Loader',
    version: '1.0.0',
    category: 'Loaders',
    config: {
      connectionStrings: { default: 'file://./json-data' }
    }
  };

  const mockDashboardMetadata: PluginMetadata = {
    id: 'dashboard-1',
    name: 'Analytics Dashboard',
    version: '1.0.0',
    category: 'Dashboards',
    config: {
      apiBaseUrls: { analytics: 'https://api.analytics.example.com' }
    }
  };

  const mockUnknownMetadata: PluginMetadata = {
    id: 'unknown-plugin',
    name: 'Unknown Plugin',
    version: '1.0.0',
    category: 'Unknown',
    config: {}
  };

  test('loadPlugin returns plugin object for valid plugin ID', () => {
    const plugin = PluginLoader.loadPlugin(mockCsvLoaderMetadata);

    expect(plugin).not.toBeNull();
    expect(plugin?.metadata).toEqual(mockCsvLoaderMetadata);
    expect(plugin?.component).toBeDefined();
  });

  test('loadPlugin returns null for invalid plugin ID', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const plugin = PluginLoader.loadPlugin(mockUnknownMetadata);

    expect(plugin).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Plugin component not found for ID: unknown-plugin');
    
    consoleSpy.mockRestore();
  });

  test('loadPlugins loads multiple valid plugins', () => {
    const plugins = PluginLoader.loadPlugins([
      mockCsvLoaderMetadata,
      mockJsonLoaderMetadata,
      mockDashboardMetadata
    ]);

    expect(plugins).toHaveLength(3);
    expect(plugins[0].metadata.id).toBe('data-loader-1');
    expect(plugins[1].metadata.id).toBe('data-loader-2');
    expect(plugins[2].metadata.id).toBe('dashboard-1');
  });

  test('loadPlugins filters out invalid plugins', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const plugins = PluginLoader.loadPlugins([
      mockCsvLoaderMetadata,
      mockUnknownMetadata,
      mockJsonLoaderMetadata
    ]);

    expect(plugins).toHaveLength(2);
    expect(plugins[0].metadata.id).toBe('data-loader-1');
    expect(plugins[1].metadata.id).toBe('data-loader-2');
    expect(consoleSpy).toHaveBeenCalledWith('Plugin component not found for ID: unknown-plugin');
    
    consoleSpy.mockRestore();
  });

  test('getAvailablePluginIds returns all registered plugin IDs', () => {
    const availableIds = PluginLoader.getAvailablePluginIds();

    expect(availableIds).toContain('data-loader-1');
    expect(availableIds).toContain('data-loader-2');
    expect(availableIds).toContain('dashboard-1');
    expect(availableIds).toHaveLength(3);
  });

  test('isPluginAvailable returns true for registered plugins', () => {
    expect(PluginLoader.isPluginAvailable('data-loader-1')).toBe(true);
    expect(PluginLoader.isPluginAvailable('data-loader-2')).toBe(true);
    expect(PluginLoader.isPluginAvailable('dashboard-1')).toBe(true);
  });

  test('isPluginAvailable returns false for unregistered plugins', () => {
    expect(PluginLoader.isPluginAvailable('unknown-plugin')).toBe(false);
    expect(PluginLoader.isPluginAvailable('non-existent')).toBe(false);
  });
});