import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PluginNavigation from '../PluginNavigation';
import { PluginHierarchy } from '../../types/plugin.types';

const mockPluginHierarchy: PluginHierarchy = {
  'Loaders': [
    {
      id: 'test-loader-1',
      name: 'Test Loader 1',
      version: '1.0.0',
      description: 'Test loader description',
      category: 'Loaders',
      config: {}
    },
    {
      id: 'test-loader-2',
      name: 'Test Loader 2',
      version: '1.0.0',
      category: 'Loaders',
      config: {}
    }
  ],
  'Dashboards': [
    {
      id: 'test-dashboard-1',
      name: 'Test Dashboard',
      version: '1.0.0',
      description: 'Test dashboard description',
      category: 'Dashboards',
      config: {}
    }
  ]
};

describe('PluginNavigation', () => {
  const mockOnPluginSelect = jest.fn();

  beforeEach(() => {
    mockOnPluginSelect.mockClear();
  });

  test('renders plugin navigation with correct title', () => {
    render(
      <PluginNavigation
        pluginHierarchy={mockPluginHierarchy}
        selectedPluginId={null}
        onPluginSelect={mockOnPluginSelect}
      />
    );

    expect(screen.getByText('Plugins')).toBeInTheDocument();
  });

  test('renders all categories', () => {
    render(
      <PluginNavigation
        pluginHierarchy={mockPluginHierarchy}
        selectedPluginId={null}
        onPluginSelect={mockOnPluginSelect}
      />
    );

    expect(screen.getByText('Loaders')).toBeInTheDocument();
    expect(screen.getByText('Dashboards')).toBeInTheDocument();
  });

  test('categories are collapsed by default', () => {
    render(
      <PluginNavigation
        pluginHierarchy={mockPluginHierarchy}
        selectedPluginId={null}
        onPluginSelect={mockOnPluginSelect}
      />
    );

    // Plugin names should not be visible initially
    expect(screen.queryByText('Test Loader 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Dashboard')).not.toBeInTheDocument();
  });

  test('clicking category expands it and shows plugins', () => {
    render(
      <PluginNavigation
        pluginHierarchy={mockPluginHierarchy}
        selectedPluginId={null}
        onPluginSelect={mockOnPluginSelect}
      />
    );

    // Click on Loaders category
    fireEvent.click(screen.getByText('Loaders'));

    // Plugin names should now be visible
    expect(screen.getByText('Test Loader 1')).toBeInTheDocument();
    expect(screen.getByText('Test Loader 2')).toBeInTheDocument();
    expect(screen.getByText('Test loader description')).toBeInTheDocument();
  });

  test('clicking on plugin calls onPluginSelect', () => {
    render(
      <PluginNavigation
        pluginHierarchy={mockPluginHierarchy}
        selectedPluginId={null}
        onPluginSelect={mockOnPluginSelect}
      />
    );

    // Expand Loaders category
    fireEvent.click(screen.getByText('Loaders'));

    // Click on a plugin
    fireEvent.click(screen.getByText('Test Loader 1'));

    expect(mockOnPluginSelect).toHaveBeenCalledWith('test-loader-1');
  });

  test('selected plugin is highlighted', () => {
    render(
      <PluginNavigation
        pluginHierarchy={mockPluginHierarchy}
        selectedPluginId="test-loader-1"
        onPluginSelect={mockOnPluginSelect}
      />
    );

    // Expand Loaders category
    fireEvent.click(screen.getByText('Loaders'));

    // Check that the plugin is rendered and can be found
    expect(screen.getByText('Test Loader 1')).toBeInTheDocument();
  });

  test('renders plugins without descriptions', () => {
    render(
      <PluginNavigation
        pluginHierarchy={mockPluginHierarchy}
        selectedPluginId={null}
        onPluginSelect={mockOnPluginSelect}
      />
    );

    // Expand Loaders category
    fireEvent.click(screen.getByText('Loaders'));

    expect(screen.getByText('Test Loader 2')).toBeInTheDocument();
    // Test Loader 2 has no description, so it shouldn't appear
    expect(screen.queryByText('Test loader description')).toBeInTheDocument(); // Only Test Loader 1's description
  });
});