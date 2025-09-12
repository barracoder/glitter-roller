import { generatePluginHierarchy } from '../pluginUtils';
import { PluginMetadata } from '../../types/plugin.types';

describe('pluginUtils', () => {
  describe('generatePluginHierarchy', () => {
    const mockPlugins: PluginMetadata[] = [
      {
        id: 'data-loader-1',
        name: 'CSV Data Loader',
        version: '1.0.0',
        category: 'Loaders',
        component: 'CsvDataLoaderPlugin',
        config: { connectionStrings: { default: 'file://./data' } }
      },
      {
        id: 'data-loader-2',
        name: 'JSON Data Loader',
        version: '1.0.0',
        category: 'Loaders',
        component: 'JsonDataLoaderPlugin',
        config: { connectionStrings: { default: 'file://./json-data' } }
      },
      {
        id: 'dashboard-1',
        name: 'Analytics Dashboard',
        version: '1.0.0',
        category: 'Dashboards',
        component: 'AnalyticsDashboardPlugin',
        config: { apiBaseUrls: { analytics: 'https://api.analytics.example.com' } }
      }
    ];

    test('should group plugins by category', () => {
      const hierarchy = generatePluginHierarchy(mockPlugins);

      expect(hierarchy).toHaveProperty('Loaders');
      expect(hierarchy).toHaveProperty('Dashboards');
      expect(hierarchy.Loaders).toHaveLength(2);
      expect(hierarchy.Dashboards).toHaveLength(1);
    });

    test('should preserve plugin metadata in hierarchy', () => {
      const hierarchy = generatePluginHierarchy(mockPlugins);

      expect(hierarchy.Loaders[0]).toEqual(mockPlugins[0]);
      expect(hierarchy.Loaders[1]).toEqual(mockPlugins[1]);
      expect(hierarchy.Dashboards[0]).toEqual(mockPlugins[2]);
    });

    test('should handle empty plugins array', () => {
      const hierarchy = generatePluginHierarchy([]);

      expect(hierarchy).toEqual({});
    });

    test('should handle single category', () => {
      const singleCategoryPlugins = [mockPlugins[0], mockPlugins[1]];
      const hierarchy = generatePluginHierarchy(singleCategoryPlugins);

      expect(Object.keys(hierarchy)).toHaveLength(1);
      expect(hierarchy.Loaders).toHaveLength(2);
    });

    test('should handle single plugin', () => {
      const hierarchy = generatePluginHierarchy([mockPlugins[0]]);

      expect(Object.keys(hierarchy)).toHaveLength(1);
      expect(hierarchy.Loaders).toHaveLength(1);
      expect(hierarchy.Loaders[0]).toEqual(mockPlugins[0]);
    });
  });
});