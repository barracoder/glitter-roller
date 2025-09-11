import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalyticsDashboardPlugin from '../AnalyticsDashboardPlugin';
import { PluginConfig } from '../../types/plugin.types';

describe('AnalyticsDashboardPlugin', () => {
  const mockConfig: PluginConfig = {
    apiBaseUrls: {
      analytics: 'https://api.analytics.test.com'
    },
    authSettings: {
      type: 'oauth',
      credentials: {
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret'
      }
    }
  };

  test('renders plugin title and ID', () => {
    render(<AnalyticsDashboardPlugin config={mockConfig} pluginId="test-dashboard" />);

    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Plugin ID: test-dashboard')).toBeInTheDocument();
  });

  test('displays configuration values correctly', () => {
    render(<AnalyticsDashboardPlugin config={mockConfig} pluginId="test-dashboard" />);

    expect(screen.getByText('Analytics API:')).toBeInTheDocument();
    expect(screen.getByText('https://api.analytics.test.com')).toBeInTheDocument();
    expect(screen.getByText('Auth Type:')).toBeInTheDocument();
    expect(screen.getByText('oauth')).toBeInTheDocument();
    expect(screen.getByText('Client ID:')).toBeInTheDocument();
    expect(screen.getByText('test-client-id')).toBeInTheDocument();
  });

  test('displays default values when config is missing', () => {
    const emptyConfig: PluginConfig = {};
    render(<AnalyticsDashboardPlugin config={emptyConfig} pluginId="test-dashboard" />);

    expect(screen.getByText('Analytics API:')).toBeInTheDocument();
    expect(screen.getByText('No analytics API configured')).toBeInTheDocument();
    expect(screen.getByText('Auth Type:')).toBeInTheDocument();
    expect(screen.getByText('none')).toBeInTheDocument();
    expect(screen.getByText('Client ID:')).toBeInTheDocument();
    expect(screen.getByText('No client ID')).toBeInTheDocument();
  });

  test('displays analytics overview with metrics', () => {
    render(<AnalyticsDashboardPlugin config={mockConfig} pluginId="test-dashboard" />);

    expect(screen.getByText('Analytics Overview')).toBeInTheDocument();
    
    // Check for metric titles
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Active Sessions')).toBeInTheDocument();
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    
    // Check for metric values
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('567')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
    expect(screen.getByText('3.2%')).toBeInTheDocument();
  });

  test('refresh button shows alert when clicked', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
    render(<AnalyticsDashboardPlugin config={mockConfig} pluginId="test-dashboard" />);

    const refreshButton = screen.getByText('Refresh Data');
    fireEvent.click(refreshButton);

    expect(alertSpy).toHaveBeenCalledWith('Refreshing analytics data...');
    alertSpy.mockRestore();
  });

  test('refresh button has correct styling', () => {
    render(<AnalyticsDashboardPlugin config={mockConfig} pluginId="test-dashboard" />);

    const refreshButton = screen.getByText('Refresh Data');
    expect(refreshButton).toHaveStyle('background-color: #ffc107');
    expect(refreshButton).toHaveStyle('color: black');
    expect(refreshButton).toHaveStyle('border-radius: 4px');
  });

  test('metrics have grid layout styling', () => {
    render(<AnalyticsDashboardPlugin config={mockConfig} pluginId="test-dashboard" />);
    
    // Find the grid container using data-testid
    const gridElement = screen.getByTestId('analytics-grid');
    expect(gridElement).toBeInTheDocument();
  });
});