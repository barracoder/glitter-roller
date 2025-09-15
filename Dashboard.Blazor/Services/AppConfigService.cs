using Dashboard.Blazor.Models;
using Dashboard.Blazor.Components.Plugins;

namespace Dashboard.Blazor.Services
{
    public class AppConfigService
    {
        public static AppConfig GetConfig()
        {
            return new AppConfig
            {
                RequireAuthentication = false, // Simplified for initial implementation
                Plugins = new List<PluginMetadata>
                {
                    new PluginMetadata
                    {
                        Id = "data-loader-1",
                        Name = "CSV Data Loader",
                        Version = "1.0.0",
                        Description = "Load data from CSV files",
                        Category = "Loaders",
                        Component = "CsvDataLoaderPlugin",
                        Config = new PluginConfig
                        {
                            ConnectionStrings = new Dictionary<string, string>
                            {
                                { "default", "file://./data" }
                            },
                            ApiBaseUrls = new Dictionary<string, string>
                            {
                                { "validation", "https://api.validation.example.com" }
                            },
                            AuthSettings = new AuthSettings
                            {
                                Type = "apikey",
                                Credentials = new Dictionary<string, string>
                                {
                                    { "apiKey", "demo-key" }
                                }
                            }
                        }
                    },
                    new PluginMetadata
                    {
                        Id = "data-loader-2",
                        Name = "JSON Data Loader",
                        Version = "1.0.0",
                        Description = "Load data from JSON files",
                        Category = "Loaders",
                        Component = "JsonDataLoaderPlugin",
                        Config = new PluginConfig
                        {
                            ConnectionStrings = new Dictionary<string, string>
                            {
                                { "default", "file://./json-data" }
                            },
                            AuthSettings = new AuthSettings
                            {
                                Type = "none"
                            }
                        }
                    },
                    new PluginMetadata
                    {
                        Id = "dashboard-1",
                        Name = "Analytics Dashboard",
                        Version = "1.0.0",
                        Description = "View analytics and metrics",
                        Category = "Dashboards",
                        Component = "AnalyticsDashboardPlugin",
                        Config = new PluginConfig
                        {
                            ApiBaseUrls = new Dictionary<string, string>
                            {
                                { "analytics", "https://api.analytics.example.com" }
                            },
                            AuthSettings = new AuthSettings
                            {
                                Type = "oauth",
                                Credentials = new Dictionary<string, string>
                                {
                                    { "clientId", "demo-client" },
                                    { "clientSecret", "demo-secret" }
                                }
                            }
                        }
                    }
                },
                ComponentRegistry = new Dictionary<string, Type>
                {
                    { "CsvDataLoaderPlugin", typeof(CsvDataLoaderPlugin) },
                    { "JsonDataLoaderPlugin", typeof(JsonDataLoaderPlugin) },
                    { "AnalyticsDashboardPlugin", typeof(AnalyticsDashboardPlugin) }
                }
            };
        }
    }
}