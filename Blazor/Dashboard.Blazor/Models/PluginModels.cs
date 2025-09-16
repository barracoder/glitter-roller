using System.Collections.Generic;

namespace Dashboard.Blazor.Models
{
    public class PluginConfig
    {
        public Dictionary<string, string>? ConnectionStrings { get; set; }
        public Dictionary<string, string>? ApiBaseUrls { get; set; }
        public AuthSettings? AuthSettings { get; set; }
        public Dictionary<string, object>? AdditionalConfig { get; set; }
    }

    public class AuthSettings
    {
        public string Type { get; set; } = "none"; // oauth, apikey, basic, none
        public Dictionary<string, string>? Credentials { get; set; }
    }

    public class PluginMetadata
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Version { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Category { get; set; } = string.Empty;
        public PluginConfig Config { get; set; } = new();
        public string Component { get; set; } = string.Empty; // Reference to component type
    }

    public class Plugin
    {
        public PluginMetadata Metadata { get; set; } = new();
        public Type? ComponentType { get; set; }
    }

    public class PluginHierarchy : Dictionary<string, List<PluginMetadata>>
    {
    }

    public class AppConfig
    {
        public List<PluginMetadata> Plugins { get; set; } = new();
        public Dictionary<string, Type> ComponentRegistry { get; set; } = new();
        public bool RequireAuthentication { get; set; } = false;
    }
}