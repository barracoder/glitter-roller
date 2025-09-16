# Glitter Roller - Blazor Dashboard

A Blazor WebAssembly version of the Glitter Roller dashboard that maintains the same design principles and plugin architecture as the React version.

## Features

- 🎯 **Identical Design**: Pixel-perfect replication of the React dashboard UI
- 🔌 **Plugin Architecture**: Modular plugin system with configurable components
- ⚙️ **Configuration Management**: Support for connection strings, API URLs, and authentication settings
- 🗂️ **Hierarchical Navigation**: Left-hand side navigation with expandable plugin categories
- 🚀 **Blazor WebAssembly**: Modern .NET 8 client-side web application
- ✅ **E2E Testing**: Comprehensive Playwright tests matching the React version

## Technology Stack

- **Framework**: Blazor WebAssembly (.NET 8)
- **Language**: C#
- **Styling**: Inline CSS (matching React version exactly)
- **Testing**: Playwright E2E tests
- **Architecture**: Component-based with dependency injection

## Getting Started

### Prerequisites

- .NET 8 SDK or later
- Node.js 16+ (for E2E testing)

### Running the Application

```bash
# Build and run the Blazor application
cd Dashboard.Blazor
dotnet run

# The application will be available at http://localhost:5278
```

### Building for Production

```bash
cd Dashboard.Blazor
dotnet publish -c Release
```

### Running E2E Tests

```bash
# From the root directory
npm run test:e2e:blazor
```

## Plugin System

### Available Plugins

1. **CSV Data Loader** (`data-loader-1`)
   - Load and process CSV files
   - API key authentication
   - Validation endpoint integration

2. **JSON Data Loader** (`data-loader-2`) 
   - Parse and process JSON files
   - No authentication required
   - Simple file processing

3. **Analytics Dashboard** (`dashboard-1`)
   - Display metrics and analytics
   - OAuth authentication
   - Grid layout with four key metrics

### Adding New Plugins

1. **Create the Plugin Component**:
   ```csharp
   // Components/Plugins/MyNewPlugin.razor
   @using Dashboard.Blazor.Models
   @inherits Dashboard.Blazor.Components.Plugins.BasePluginComponent

   <div style="padding: 20px;">
       <h2>My New Plugin</h2>
       <p>Plugin ID: @PluginId</p>
       <!-- Your plugin UI here -->
   </div>
   ```

2. **Register in AppConfigService**:
   ```csharp
   // Add to Services/AppConfigService.cs
   ComponentRegistry = new Dictionary<string, Type>
   {
       { "MyNewPlugin", typeof(MyNewPlugin) },
       // ... existing registrations
   }
   ```

3. **Add Plugin Metadata**:
   ```csharp
   // Add to the Plugins list in AppConfigService
   new PluginMetadata
   {
       Id = "my-new-plugin",
       Name = "My New Plugin",
       Version = "1.0.0",
       Description = "Description of the plugin",
       Category = "MyCategory",
       Component = "MyNewPlugin",
       Config = new PluginConfig { /* configuration */ }
   }
   ```

## Architecture

### Key Components

- **MainLayout**: Main application layout with header and plugin areas
- **AppHeader**: Application header with branding
- **PluginNavigation**: Left sidebar with hierarchical plugin navigation
- **MainContentArea**: Dynamic content area using `DynamicComponent`
- **BasePluginComponent**: Base class for all plugin components

### Services

- **PluginLoader**: Manages plugin registration and loading
- **AppConfigService**: Provides application and plugin configuration

### Models

- **PluginConfig**: Configuration settings for plugins
- **PluginMetadata**: Plugin information and metadata
- **Plugin**: Combined plugin metadata and component type

## Comparison with React Version

| Feature | React Version | Blazor Version |
|---------|---------------|----------------|
| Framework | React 19 + TypeScript | Blazor WebAssembly + C# |
| Styling | Inline CSS | Identical inline CSS |
| Plugin System | Component registry | Type-based registry |
| Navigation | useState hooks | Component state |
| Testing | Playwright E2E | Identical Playwright E2E |
| Build | npm/webpack | dotnet publish |
| Runtime | Node.js server | WebAssembly in browser |

## Development

### Project Structure

```
Dashboard.Blazor/
├── Components/
│   ├── Plugins/              # Plugin implementations
│   │   ├── AnalyticsDashboardPlugin.razor
│   │   ├── CsvDataLoaderPlugin.razor
│   │   ├── JsonDataLoaderPlugin.razor
│   │   └── BasePluginComponent.cs
│   ├── AppHeader.razor
│   ├── MainContentArea.razor
│   └── PluginNavigation.razor
├── Models/
│   └── PluginModels.cs       # Data models
├── Services/
│   ├── AppConfigService.cs   # Configuration
│   └── PluginLoader.cs       # Plugin management
├── Layout/
│   └── MainLayout.razor      # Application layout
└── wwwroot/                  # Static assets
```

### Testing

The Blazor version includes comprehensive E2E tests that mirror the React version:

- Plugin navigation and expansion
- Plugin selection and content display
- Configuration display
- Button interactions
- Visual state management

Tests run against `http://localhost:5278` and use the same Playwright framework as the React version.

## CI/CD Integration

The Blazor dashboard is integrated into the existing CI pipeline with:

- Automated .NET 8 setup
- Blazor build verification
- E2E test execution
- Playwright report generation

See `.github/workflows/ci.yml` for the complete pipeline configuration.