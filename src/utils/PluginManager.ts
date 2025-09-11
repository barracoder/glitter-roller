import type { Plugin, PluginContext, PluginComponent, PluginRoute, PluginMenuItem } from '../types/plugin';

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private components: Map<string, PluginComponent> = new Map();
  private routes: PluginRoute[] = [];
  private menuItems: PluginMenuItem[] = [];
  private state: any = {};
  private eventListeners: Map<string, Array<(data?: any) => void>> = new Map();

  async registerPlugin(plugin: Plugin): Promise<void> {
    if (this.plugins.has(plugin.metadata.id)) {
      throw new Error(`Plugin with id "${plugin.metadata.id}" is already registered`);
    }

    // Check dependencies
    if (plugin.metadata.dependencies) {
      for (const dep of plugin.metadata.dependencies) {
        if (!this.plugins.has(dep)) {
          throw new Error(`Plugin "${plugin.metadata.id}" depends on "${dep}" which is not loaded`);
        }
      }
    }

    // Create plugin context
    const context: PluginContext = {
      registerComponent: (id: string, component: PluginComponent) => {
        this.components.set(id, component);
      },
      registerRoute: (route: PluginRoute) => {
        this.routes.push(route);
      },
      registerMenuItem: (item: PluginMenuItem) => {
        this.menuItems.push(item);
      },
      getState: () => ({ ...this.state }),
      setState: (newState: any) => {
        this.state = { ...this.state, ...newState };
      },
      emit: (event: string, data?: any) => {
        const listeners = this.eventListeners.get(event) || [];
        listeners.forEach(listener => listener(data));
      },
      on: (event: string, handler: (data?: any) => void) => {
        const listeners = this.eventListeners.get(event) || [];
        listeners.push(handler);
        this.eventListeners.set(event, listeners);
      },
      off: (event: string, handler: (data?: any) => void) => {
        const listeners = this.eventListeners.get(event) || [];
        const index = listeners.indexOf(handler);
        if (index > -1) {
          listeners.splice(index, 1);
          this.eventListeners.set(event, listeners);
        }
      },
    };

    // Initialize plugin
    await plugin.initialize();

    // Register plugin components, routes, and menu items
    if (plugin.components) {
      Object.entries(plugin.components).forEach(([id, component]) => {
        context.registerComponent(id, component);
      });
    }

    if (plugin.routes) {
      plugin.routes.forEach(route => {
        context.registerRoute(route);
      });
    }

    if (plugin.menuItems) {
      plugin.menuItems.forEach(item => {
        context.registerMenuItem(item);
      });
    }

    // Execute onLoad hook
    if (plugin.hooks?.onLoad) {
      await plugin.hooks.onLoad();
    }

    this.plugins.set(plugin.metadata.id, plugin);
  }

  async unregisterPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin with id "${pluginId}" is not registered`);
    }

    // Execute onUnload hook
    if (plugin.hooks?.onUnload) {
      await plugin.hooks.onUnload();
    }

    // Clean up plugin resources
    await plugin.destroy();

    // Remove components, routes, and menu items
    if (plugin.components) {
      Object.keys(plugin.components).forEach(id => {
        this.components.delete(id);
      });
    }

    if (plugin.routes) {
      plugin.routes.forEach(route => {
        const index = this.routes.findIndex(r => r.path === route.path);
        if (index > -1) {
          this.routes.splice(index, 1);
        }
      });
    }

    if (plugin.menuItems) {
      plugin.menuItems.forEach(item => {
        const index = this.menuItems.findIndex(mi => mi.id === item.id);
        if (index > -1) {
          this.menuItems.splice(index, 1);
        }
      });
    }

    this.plugins.delete(pluginId);
  }

  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }

  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getComponent(componentId: string): PluginComponent | undefined {
    return this.components.get(componentId);
  }

  getComponents(): PluginComponent[] {
    return Array.from(this.components.values());
  }

  getRoutes(): PluginRoute[] {
    return [...this.routes];
  }

  getMenuItems(): PluginMenuItem[] {
    return [...this.menuItems];
  }

  async notifyRouteChange(route: string): Promise<void> {
    for (const plugin of this.plugins.values()) {
      if (plugin.hooks?.onRouteChange) {
        await plugin.hooks.onRouteChange(route);
      }
    }
  }

  emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach(listener => listener(data));
  }
}

// Singleton instance
export const pluginManager = new PluginManager();