import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CsvDataLoaderPlugin from '../CsvDataLoaderPlugin';
import { PluginConfig } from '../../types/plugin.types';

describe('CsvDataLoaderPlugin', () => {
  const mockConfig: PluginConfig = {
    connectionStrings: {
      default: 'file://./test-data'
    },
    apiBaseUrls: {
      validation: 'https://api.validation.test.com'
    },
    authSettings: {
      type: 'apikey',
      credentials: {
        apiKey: 'test-api-key'
      }
    }
  };

  test('renders plugin title and ID', () => {
    render(<CsvDataLoaderPlugin config={mockConfig} pluginId="test-csv-loader" />);

    expect(screen.getByText('CSV Data Loader')).toBeInTheDocument();
    expect(screen.getByText('Plugin ID: test-csv-loader')).toBeInTheDocument();
  });

  test('displays configuration values correctly', () => {
    render(<CsvDataLoaderPlugin config={mockConfig} pluginId="test-csv-loader" />);

    expect(screen.getByText('Connection String:')).toBeInTheDocument();
    expect(screen.getByText('file://./test-data')).toBeInTheDocument();
    expect(screen.getByText('Validation API:')).toBeInTheDocument();
    expect(screen.getByText('https://api.validation.test.com')).toBeInTheDocument();
    expect(screen.getByText('Auth Type:')).toBeInTheDocument();
    expect(screen.getByText('apikey')).toBeInTheDocument();
  });

  test('displays default values when config is missing', () => {
    const emptyConfig: PluginConfig = {};
    render(<CsvDataLoaderPlugin config={emptyConfig} pluginId="test-csv-loader" />);

    expect(screen.getByText('Connection String:')).toBeInTheDocument();
    expect(screen.getByText('No connection string configured')).toBeInTheDocument();
    expect(screen.getByText('Validation API:')).toBeInTheDocument();
    expect(screen.getByText('No validation API configured')).toBeInTheDocument();
    expect(screen.getByText('Auth Type:')).toBeInTheDocument();
    expect(screen.getByText('none')).toBeInTheDocument();
  });

  test('displays functionality description', () => {
    render(<CsvDataLoaderPlugin config={mockConfig} pluginId="test-csv-loader" />);

    expect(screen.getByText('This plugin would typically:')).toBeInTheDocument();
    expect(screen.getByText('Read CSV files from the configured path')).toBeInTheDocument();
    expect(screen.getByText('Validate data using the configured API')).toBeInTheDocument();
    expect(screen.getByText('Apply authentication based on settings')).toBeInTheDocument();
    expect(screen.getByText('Transform and load data into the system')).toBeInTheDocument();
  });

  test('load button shows alert when clicked', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
    render(<CsvDataLoaderPlugin config={mockConfig} pluginId="test-csv-loader" />);

    const loadButton = screen.getByText('Load CSV Data');
    fireEvent.click(loadButton);

    expect(alertSpy).toHaveBeenCalledWith('CSV loading would be triggered here');
    alertSpy.mockRestore();
  });

  test('load button has correct styling', () => {
    render(<CsvDataLoaderPlugin config={mockConfig} pluginId="test-csv-loader" />);

    const loadButton = screen.getByText('Load CSV Data');
    expect(loadButton).toHaveStyle('background-color: #007bff');
    expect(loadButton).toHaveStyle('color: white');
    expect(loadButton).toHaveStyle('border-radius: 4px');
  });
});