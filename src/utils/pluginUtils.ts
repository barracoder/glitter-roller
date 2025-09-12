import { PluginMetadata, PluginHierarchy } from '../types/plugin.types';

/**
 * Generate plugin hierarchy by grouping plugins by category
 */
export function generatePluginHierarchy(plugins: PluginMetadata[]): PluginHierarchy {
  const hierarchy: PluginHierarchy = {};
  
  for (const plugin of plugins) {
    if (!hierarchy[plugin.category]) {
      hierarchy[plugin.category] = [];
    }
    hierarchy[plugin.category].push(plugin);
  }
  
  return hierarchy;
}