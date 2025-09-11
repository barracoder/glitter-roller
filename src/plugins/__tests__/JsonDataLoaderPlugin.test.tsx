import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JsonDataLoaderPlugin from '../JsonDataLoaderPlugin';
import { PluginConfig } from '../../types/plugin.types';

describe('JsonDataLoaderPlugin', () => {
  const mockConfig: PluginConfig = {
    connectionStrings: {
      default: 'file://./test-json-data'
    },
    authSettings: {
      type: 'none'
    }
  };

  test('renders plugin title and ID', () => {
    render(<JsonDataLoaderPlugin config={mockConfig} pluginId="test-json-loader" />);

    expect(screen.getByText('JSON Data Loader')).toBeInTheDocument();
    expect(screen.getByText('Plugin ID: test-json-loader')).toBeInTheDocument();
  });

  test('displays configuration values correctly', () => {
    render(<JsonDataLoaderPlugin config={mockConfig} pluginId="test-json-loader" />);

    expect(screen.getByText('Connection String:')).toBeInTheDocument();
    expect(screen.getByText('file://./test-json-data')).toBeInTheDocument();
    expect(screen.getByText('Auth Type:')).toBeInTheDocument();
    expect(screen.getByText('none')).toBeInTheDocument();
  });

  test('displays functionality description', () => {
    render(<JsonDataLoaderPlugin config={mockConfig} pluginId="test-json-loader" />);

    expect(screen.getByText('This plugin would typically:')).toBeInTheDocument();
    expect(screen.getByText('Read JSON files from the configured path')).toBeInTheDocument();
    expect(screen.getByText('Parse and validate JSON structure')).toBeInTheDocument();
  });

  test('load button triggers alert', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
    render(<JsonDataLoaderPlugin config={mockConfig} pluginId="test-json-loader" />);

    const loadButton = screen.getByText('Load JSON Data');
    fireEvent.click(loadButton);

    expect(alertSpy).toHaveBeenCalledWith('JSON loading would be triggered here');
    alertSpy.mockRestore();
  });
});