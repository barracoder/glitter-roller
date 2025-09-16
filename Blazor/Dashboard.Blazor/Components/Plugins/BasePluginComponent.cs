using Microsoft.AspNetCore.Components;
using Dashboard.Blazor.Models;

namespace Dashboard.Blazor.Components.Plugins
{
    public abstract class BasePluginComponent : ComponentBase
    {
        [Parameter] public PluginConfig Config { get; set; } = new();
        [Parameter] public string PluginId { get; set; } = string.Empty;
    }
}