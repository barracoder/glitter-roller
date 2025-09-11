import { Plugin, PluginMetadata } from '../types/plugin.types';
import CsvDataLoaderPlugin from '../plugins/CsvDataLoaderPlugin';
import JsonDataLoaderPlugin from '../plugins/JsonDataLoaderPlugin';
import AnalyticsDashboardPlugin from '../plugins/AnalyticsDashboardPlugin';

// Plugin registry mapping plugin IDs to their components
const pluginRegistry: Record<string, React.ComponentType<any>> = {
  'data-loader-1': CsvDataLoaderPlugin,
  'data-loader-2': JsonDataLoaderPlugin,
  'dashboard-1': AnalyticsDashboardPlugin,
};

export class PluginLoader {
  /**
   * Load a plugin by its metadata
   */
  static loadPlugin(metadata: PluginMetadata): Plugin | null {
    const component = pluginRegistry[metadata.id];
    
    if (!component) {
      console.warn(`Plugin component not found for ID: ${metadata.id}`);
      return null;
    }

    return {
      metadata,
      component,
    };
  }

  /**
   * Load multiple plugins by their metadata
   */
  static loadPlugins(pluginMetadata: PluginMetadata[]): Plugin[] {
    return pluginMetadata
      .map(metadata => this.loadPlugin(metadata))
      .filter((plugin): plugin is Plugin => plugin !== null);
  }

  /**
   * Get available plugin IDs
   */
  static getAvailablePluginIds(): string[] {
    return Object.keys(pluginRegistry);
  }

  /**
   * Check if a plugin is available
   */
  static isPluginAvailable(pluginId: string): boolean {
    return pluginId in pluginRegistry;
  }
}