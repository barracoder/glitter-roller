import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the plugin components to avoid rendering actual UI
jest.mock('./plugins/CsvDataLoaderPlugin', () => {
  return function MockCsvDataLoaderPlugin({ pluginId }: { pluginId: string }) {
    return <div data-testid="csv-loader-plugin">CSV Loader Plugin: {pluginId}</div>;
  };
});

jest.mock('./plugins/JsonDataLoaderPlugin', () => {
  return function MockJsonDataLoaderPlugin({ pluginId }: { pluginId: string }) {
    return <div data-testid="json-loader-plugin">JSON Loader Plugin: {pluginId}</div>;
  };
});

jest.mock('./plugins/AnalyticsDashboardPlugin', () => {
  return function MockAnalyticsDashboardPlugin({ pluginId }: { pluginId: string }) {
    return <div data-testid="analytics-dashboard-plugin">Analytics Dashboard Plugin: {pluginId}</div>;
  };
});

describe('App', () => {
  test('renders app with navigation and welcome message', () => {
    render(<App />);

    // Check navigation is present
    expect(screen.getByText('Plugins')).toBeInTheDocument();
    expect(screen.getByText('Loaders')).toBeInTheDocument();
    expect(screen.getByText('Dashboards')).toBeInTheDocument();

    // Check welcome message is shown initially
    expect(screen.getByText('Welcome to Glitter Roller')).toBeInTheDocument();
    expect(screen.getByText('Select a plugin from the navigation panel to get started.')).toBeInTheDocument();
  });

  test('can navigate to and display a plugin', () => {
    render(<App />);

    // Expand Loaders category
    fireEvent.click(screen.getByText('Loaders'));

    // CSV Data Loader should now be visible
    expect(screen.getByText('CSV Data Loader')).toBeInTheDocument();

    // Click on CSV Data Loader
    fireEvent.click(screen.getByText('CSV Data Loader'));

    // Mock CSV loader plugin should be rendered
    expect(screen.getByTestId('csv-loader-plugin')).toBeInTheDocument();
    expect(screen.getByText('CSV Loader Plugin: data-loader-1')).toBeInTheDocument();
  });

  test('can switch between different plugins', () => {
    render(<App />);

    // Expand Loaders category
    fireEvent.click(screen.getByText('Loaders'));

    // Click on CSV Data Loader
    fireEvent.click(screen.getByText('CSV Data Loader'));
    expect(screen.getByTestId('csv-loader-plugin')).toBeInTheDocument();

    // Click on JSON Data Loader
    fireEvent.click(screen.getByText('JSON Data Loader'));
    expect(screen.getByTestId('json-loader-plugin')).toBeInTheDocument();
    expect(screen.getByText('JSON Loader Plugin: data-loader-2')).toBeInTheDocument();

    // CSV loader should no longer be rendered
    expect(screen.queryByTestId('csv-loader-plugin')).not.toBeInTheDocument();
  });

  test('can navigate to dashboard plugin', () => {
    render(<App />);

    // Expand Dashboards category
    fireEvent.click(screen.getByText('Dashboards'));

    // Analytics Dashboard should now be visible
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();

    // Click on Analytics Dashboard
    fireEvent.click(screen.getByText('Analytics Dashboard'));

    // Mock Analytics Dashboard plugin should be rendered
    expect(screen.getByTestId('analytics-dashboard-plugin')).toBeInTheDocument();
    expect(screen.getByText('Analytics Dashboard Plugin: dashboard-1')).toBeInTheDocument();
  });

  test('has correct app layout styling', () => {
    const { container } = render(<App />);
    const appDiv = container.firstChild as HTMLElement;

    expect(appDiv).toHaveStyle('display: flex');
    expect(appDiv).toHaveStyle('height: 100vh');
  });

  test('plugin selection state is maintained correctly', () => {
    render(<App />);

    // Expand Loaders and select CSV loader
    fireEvent.click(screen.getByText('Loaders'));
    fireEvent.click(screen.getByText('CSV Data Loader'));

    // Verify CSV loader plugin is displayed
    expect(screen.getByTestId('csv-loader-plugin')).toBeInTheDocument();

    // Expand Dashboards and select Analytics Dashboard
    fireEvent.click(screen.getByText('Dashboards'));
    fireEvent.click(screen.getByText('Analytics Dashboard'));

    // Verify Analytics Dashboard plugin is now displayed
    expect(screen.getByTestId('analytics-dashboard-plugin')).toBeInTheDocument();

    // CSV loader should no longer be displayed
    expect(screen.queryByTestId('csv-loader-plugin')).not.toBeInTheDocument();
  });
});
