import { PluginManager } from '../PluginManager';
import type { Plugin } from '../../types/plugin';

describe('PluginManager', () => {
  let pluginManager: PluginManager;
  let mockPlugin: Plugin;

  beforeEach(() => {
    pluginManager = new PluginManager();
    
    // Create a simple mock component function
    const MockComponent = () => null;
    
    mockPlugin = {
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
        description: 'A test plugin',
        author: 'Test Author',
      },
      initialize: jest.fn(),
      destroy: jest.fn(),
      hooks: {
        onLoad: jest.fn(),
        onUnload: jest.fn(),
        onRouteChange: jest.fn(),
      },
      components: {
        'test-component': {
          component: MockComponent,
        },
      },
      routes: [
        {
          path: '/test',
          component: MockComponent,
        },
      ],
      menuItems: [
        {
          id: 'test-menu',
          label: 'Test Menu',
          path: '/test',
        },
      ],
    };
  });

  describe('registerPlugin', () => {
    it('should register a plugin successfully', async () => {
      await pluginManager.registerPlugin(mockPlugin);
      
      expect(mockPlugin.initialize).toHaveBeenCalled();
      expect(mockPlugin.hooks?.onLoad).toHaveBeenCalled();
      expect(pluginManager.getPlugin('test-plugin')).toBe(mockPlugin);
    });

    it('should throw error when registering plugin with duplicate id', async () => {
      await pluginManager.registerPlugin(mockPlugin);
      
      await expect(pluginManager.registerPlugin(mockPlugin))
        .rejects.toThrow('Plugin with id "test-plugin" is already registered');
    });

    it('should check plugin dependencies', async () => {
      const dependentPlugin: Plugin = {
        ...mockPlugin,
        metadata: {
          ...mockPlugin.metadata,
          id: 'dependent-plugin',
          dependencies: ['non-existent-plugin'],
        },
      };

      await expect(pluginManager.registerPlugin(dependentPlugin))
        .rejects.toThrow('Plugin "dependent-plugin" depends on "non-existent-plugin" which is not loaded');
    });

    it('should register plugin components, routes, and menu items', async () => {
      await pluginManager.registerPlugin(mockPlugin);
      
      expect(pluginManager.getComponent('test-component')).toBeDefined();
      expect(pluginManager.getRoutes()).toHaveLength(1);
      expect(pluginManager.getMenuItems()).toHaveLength(1);
    });
  });

  describe('unregisterPlugin', () => {
    beforeEach(async () => {
      await pluginManager.registerPlugin(mockPlugin);
    });

    it('should unregister a plugin successfully', async () => {
      await pluginManager.unregisterPlugin('test-plugin');
      
      expect(mockPlugin.hooks?.onUnload).toHaveBeenCalled();
      expect(mockPlugin.destroy).toHaveBeenCalled();
      expect(pluginManager.getPlugin('test-plugin')).toBeUndefined();
    });

    it('should clean up plugin resources', async () => {
      await pluginManager.unregisterPlugin('test-plugin');
      
      expect(pluginManager.getComponent('test-component')).toBeUndefined();
      expect(pluginManager.getRoutes()).toHaveLength(0);
      expect(pluginManager.getMenuItems()).toHaveLength(0);
    });

    it('should throw error when unregistering non-existent plugin', async () => {
      await expect(pluginManager.unregisterPlugin('non-existent'))
        .rejects.toThrow('Plugin with id "non-existent" is not registered');
    });
  });

  describe('getters', () => {
    beforeEach(async () => {
      await pluginManager.registerPlugin(mockPlugin);
    });

    it('should return all plugins', () => {
      const plugins = pluginManager.getPlugins();
      expect(plugins).toHaveLength(1);
      expect(plugins[0]).toBe(mockPlugin);
    });

    it('should return all components', () => {
      const components = pluginManager.getComponents();
      expect(components).toHaveLength(1);
    });

    it('should return all routes', () => {
      const routes = pluginManager.getRoutes();
      expect(routes).toHaveLength(1);
      expect(routes[0].path).toBe('/test');
    });

    it('should return all menu items', () => {
      const menuItems = pluginManager.getMenuItems();
      expect(menuItems).toHaveLength(1);
      expect(menuItems[0].id).toBe('test-menu');
    });
  });

  describe('notifyRouteChange', () => {
    beforeEach(async () => {
      await pluginManager.registerPlugin(mockPlugin);
    });

    it('should notify all plugins of route changes', async () => {
      await pluginManager.notifyRouteChange('/new-route');
      
      expect(mockPlugin.hooks?.onRouteChange).toHaveBeenCalledWith('/new-route');
    });
  });

  describe('event system', () => {
    it('should emit and handle events', () => {
      const handler = jest.fn();
      const listeners = (pluginManager as any).eventListeners;
      
      // Manually add listener for testing
      listeners.set('test-event', [handler]);
      
      pluginManager.emit('test-event', 'test-data');
      
      expect(handler).toHaveBeenCalledWith('test-data');
    });
  });
});