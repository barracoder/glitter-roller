import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { PluginProvider, usePlugins } from '../PluginContext';
import type { Plugin } from '../../types/plugin';

// Mock the PluginManager
jest.mock('../../utils/PluginManager', () => ({
  pluginManager: {
    registerPlugin: jest.fn(),
    unregisterPlugin: jest.fn(),
    getPlugins: jest.fn(() => []),
    getComponents: jest.fn(() => []),
    getRoutes: jest.fn(() => []),
    getMenuItems: jest.fn(() => []),
    getComponent: jest.fn(),
    emit: jest.fn(),
  },
}));

const TestComponent: React.FC = () => {
  const { plugins, registerPlugin, unregisterPlugin, getComponent, emit } = usePlugins();
  
  return (
    <div>
      <div data-testid="plugin-count">{plugins.length}</div>
      <button 
        data-testid="register-plugin"
        onClick={() => {
          const mockPlugin: Plugin = {
            metadata: { id: 'test', name: 'Test', version: '1.0.0', description: 'Test', author: 'Test' },
            initialize: jest.fn(),
            destroy: jest.fn(),
          };
          registerPlugin(mockPlugin);
        }}
      >
        Register Plugin
      </button>
      <button 
        data-testid="unregister-plugin"
        onClick={() => unregisterPlugin('test')}
      >
        Unregister Plugin
      </button>
      <button 
        data-testid="get-component"
        onClick={() => getComponent('test-component')}
      >
        Get Component
      </button>
      <button 
        data-testid="emit-event"
        onClick={() => emit('test-event', 'test-data')}
      >
        Emit Event
      </button>
    </div>
  );
};

describe('PluginContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide plugin context to children', () => {
    render(
      <PluginProvider>
        <TestComponent />
      </PluginProvider>
    );

    expect(screen.getByTestId('plugin-count')).toBeInTheDocument();
    expect(screen.getByTestId('register-plugin')).toBeInTheDocument();
    expect(screen.getByTestId('unregister-plugin')).toBeInTheDocument();
    expect(screen.getByTestId('get-component')).toBeInTheDocument();
    expect(screen.getByTestId('emit-event')).toBeInTheDocument();
  });

  it('should throw error when usePlugins is used outside PluginProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('usePlugins must be used within a PluginProvider');

    console.error = originalError;
  });

  it('should call pluginManager methods when context methods are called', async () => {
    const { pluginManager } = require('../../utils/PluginManager');
    
    render(
      <PluginProvider>
        <TestComponent />
      </PluginProvider>
    );

    // Test registerPlugin
    await act(async () => {
      screen.getByTestId('register-plugin').click();
    });
    expect(pluginManager.registerPlugin).toHaveBeenCalled();

    // Test unregisterPlugin
    await act(async () => {
      screen.getByTestId('unregister-plugin').click();
    });
    expect(pluginManager.unregisterPlugin).toHaveBeenCalledWith('test');

    // Test getComponent
    screen.getByTestId('get-component').click();
    expect(pluginManager.getComponent).toHaveBeenCalledWith('test-component');

    // Test emit
    screen.getByTestId('emit-event').click();
    expect(pluginManager.emit).toHaveBeenCalledWith('test-event', 'test-data');
  });
});