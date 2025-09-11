import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainContentArea from '../MainContentArea';
import { Plugin } from '../../types/plugin.types';

// Mock plugin component for testing
const MockPluginComponent: React.FC<{ config: any; pluginId: string }> = ({ config, pluginId }) => (
  <div>
    <div data-testid="plugin-id">{pluginId}</div>
    <div data-testid="plugin-config">{JSON.stringify(config)}</div>
  </div>
);

const mockPlugin: Plugin = {
  metadata: {
    id: 'test-plugin',
    name: 'Test Plugin',
    version: '1.0.0',
    category: 'Test',
    config: {
      apiBaseUrls: { test: 'https://test.api.com' },
      authSettings: { type: 'apikey' }
    }
  },
  component: MockPluginComponent
};

describe('MainContentArea', () => {
  test('renders welcome message when no plugin is selected', () => {
    render(<MainContentArea selectedPlugin={null} />);

    expect(screen.getByText('Welcome to Glitter Roller')).toBeInTheDocument();
    expect(screen.getByText('Select a plugin from the navigation panel to get started.')).toBeInTheDocument();
    expect(screen.getByText('🔌')).toBeInTheDocument();
  });

  test('renders plugin component when plugin is selected', () => {
    render(<MainContentArea selectedPlugin={mockPlugin} />);

    expect(screen.getByTestId('plugin-id')).toHaveTextContent('test-plugin');
    expect(screen.getByTestId('plugin-config')).toHaveTextContent(
      JSON.stringify(mockPlugin.metadata.config)
    );
  });

  test('passes correct props to plugin component', () => {
    render(<MainContentArea selectedPlugin={mockPlugin} />);

    const pluginId = screen.getByTestId('plugin-id');
    const pluginConfig = screen.getByTestId('plugin-config');

    expect(pluginId).toHaveTextContent('test-plugin');
    expect(pluginConfig).toHaveTextContent(JSON.stringify({
      apiBaseUrls: { test: 'https://test.api.com' },
      authSettings: { type: 'apikey' }
    }));
  });

  test('has correct styling for content area', () => {
    const { container } = render(<MainContentArea selectedPlugin={null} />);
    const contentDiv = container.firstChild as HTMLElement;

    expect(contentDiv).toHaveStyle('flex: 1');
    expect(contentDiv).toHaveStyle('height: 100vh');
    expect(contentDiv).toHaveStyle('overflow: auto');
    expect(contentDiv).toHaveStyle('background-color: #ffffff');
  });
});