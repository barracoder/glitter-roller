using Dashboard.Blazor.Models;

namespace Dashboard.Blazor.Services
{
    public class PluginLoader
    {
        private AppConfig _appConfig = new();
        private Dictionary<string, Plugin> _loadedPlugins = new();

        public void Initialize(AppConfig config)
        {
            _appConfig = config;
        }

        public List<Plugin> LoadPlugins(List<PluginMetadata> pluginMetadata)
        {
            var plugins = new List<Plugin>();

            foreach (var metadata in pluginMetadata)
            {
                if (_appConfig.ComponentRegistry.TryGetValue(metadata.Component, out var componentType))
                {
                    var plugin = new Plugin
                    {
                        Metadata = metadata,
                        ComponentType = componentType
                    };

                    plugins.Add(plugin);
                    _loadedPlugins[metadata.Id] = plugin;
                }
            }

            return plugins;
        }

        public Plugin? GetPlugin(string pluginId)
        {
            return _loadedPlugins.TryGetValue(pluginId, out var plugin) ? plugin : null;
        }

        public PluginHierarchy GeneratePluginHierarchy(List<PluginMetadata> plugins)
        {
            var hierarchy = new PluginHierarchy();

            foreach (var plugin in plugins)
            {
                if (!hierarchy.ContainsKey(plugin.Category))
                {
                    hierarchy[plugin.Category] = new List<PluginMetadata>();
                }
                hierarchy[plugin.Category].Add(plugin);
            }

            return hierarchy;
        }
    }
}