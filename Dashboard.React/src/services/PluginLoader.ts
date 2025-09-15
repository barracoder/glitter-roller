import { Plugin, PluginMetadata, AppConfig } from '../types/plugin.types';

export class PluginLoader {
  private static config: AppConfig | null = null;

  /**
   * Initialize the plugin loader with config
   */
  static initialize(config: AppConfig) {
    this.config = config;
  }

  /**
   * Load a plugin by its metadata
   */
  static loadPlugin(metadata: PluginMetadata): Plugin | null {
    if (!this.config) {
      console.error('PluginLoader not initialized. Call PluginLoader.initialize(config) first.');
      return null;
    }

    const component = this.config.componentRegistry[metadata.component];
    
    if (!component) {
      console.warn(`Plugin component not found for component key: ${metadata.component}`);
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
    if (!this.config) {
      return [];
    }
    return this.config.plugins.map(plugin => plugin.id);
  }

  /**
   * Check if a plugin is available
   */
  static isPluginAvailable(pluginId: string): boolean {
    if (!this.config) {
      return false;
    }
    return this.config.plugins.some(plugin => plugin.id === pluginId);
  }
}