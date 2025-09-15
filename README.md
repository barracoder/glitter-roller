# Glitter Roller

A React/TypeScript plugin-friendly website that provides a shell for configurable plugins with a hierarchical navigation system. Now also available as a Blazor WebAssembly version!

## Versions Available

### 🔵 React Dashboard (Original)
- **Framework**: React 19 + TypeScript
- **Location**: `/src` directory  
- **URL**: `http://localhost:3000`
- **Command**: `npm start`

### 🟢 Blazor Dashboard (New!)
- **Framework**: Blazor WebAssembly + .NET 8
- **Location**: `/Dashboard.Blazor` directory
- **URL**: `http://localhost:5278` 
- **Command**: `cd Dashboard.Blazor && dotnet run`

Both versions share identical design principles, plugin architecture, and comprehensive E2E testing.

## Features

- 🔌 **Plugin Architecture**: Modular plugin system with configurable components
- ⚙️ **Configuration Management**: Support for connection strings, API URLs, and authentication settings per plugin
- 🗂️ **Hierarchical Navigation**: Left-hand side task pane showing plugin categories (e.g., Loaders, Dashboards)
- 🎨 **Modern UI**: Clean, responsive interface built with React/TypeScript
- ✅ **Comprehensive Testing**: Unit tests with >77% coverage and E2E tests with Playwright
- 🚀 **Production Ready**: Optimized build process and development workflow

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd glitter-roller

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
# React version tests
npm test -- --coverage --watchAll=false

# React E2E tests
npm run test:e2e

# Blazor build and E2E tests  
npm run blazor:test

# Run only Blazor E2E tests
npm run test:e2e:blazor
```

## Plugin System

### Architecture

The plugin system is built around these core concepts:

1. **Plugin Metadata**: Defines plugin ID, name, version, category, and configuration
2. **Plugin Components**: React components that implement the plugin UI
3. **Plugin Loader**: Service that manages plugin registration and loading
4. **Configuration**: Flexible config system supporting various auth types and connection settings

### Plugin Configuration

Each plugin supports the following configuration options:

```typescript
interface PluginConfig {
  connectionStrings?: Record<string, string>;
  apiBaseUrls?: Record<string, string>;
  authSettings?: {
    type: 'oauth' | 'apikey' | 'basic' | 'none';
    credentials?: Record<string, string>;
  };
  [key: string]: any; // Additional custom configuration
}
```

### Adding New Plugins

1. **Create the Plugin Component**:
   ```typescript
   // src/plugins/MyNewPlugin.tsx
   import React from 'react';
   import { PluginProps } from '../types/plugin.types';

   const MyNewPlugin: React.FC<PluginProps> = ({ config, pluginId }) => {
     return (
       <div>
         <h2>My New Plugin</h2>
         <p>Plugin ID: {pluginId}</p>
         {/* Your plugin UI here */}
       </div>
     );
   };

   export default MyNewPlugin;
   ```

2. **Register the Plugin**:
   ```typescript
   // Add to src/services/PluginLoader.ts
   import MyNewPlugin from '../plugins/MyNewPlugin';

   const pluginRegistry: Record<string, React.ComponentType<any>> = {
     // ... existing plugins
     'my-new-plugin': MyNewPlugin,
   };
   ```

3. **Add Plugin Configuration**:
   ```typescript
   // Add to src/config/app.config.ts
   {
     id: 'my-new-plugin',
     name: 'My New Plugin',
     version: '1.0.0',
     description: 'Description of what the plugin does',
     category: 'MyCategory',
     config: {
       // Plugin-specific configuration
     }
   }
   ```

### Existing Plugins

The system comes with three sample plugins:

1. **CSV Data Loader** (`data-loader-1`): Demonstrates file-based data loading with API validation
2. **JSON Data Loader** (`data-loader-2`): Shows simple file processing capabilities
3. **Analytics Dashboard** (`dashboard-1`): Displays metrics and analytics with OAuth authentication

## Screenshots

### Welcome Screen
![Welcome Screen](https://github.com/user-attachments/assets/c5400919-fb39-4313-a3a3-39ad76eb2ff1)

### CSV Data Loader Plugin
![CSV Data Loader](https://github.com/user-attachments/assets/a6db9804-71a3-439a-8798-4a7ba32eb09e)

### Analytics Dashboard Plugin
![Analytics Dashboard](https://github.com/user-attachments/assets/8ce951ca-e7e2-4b75-bf35-9269806e7566)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MainContentArea.tsx
│   ├── PluginNavigation.tsx
│   └── __tests__/
├── config/             # Application configuration
│   └── app.config.ts
├── plugins/            # Plugin implementations
│   ├── CsvDataLoaderPlugin.tsx
│   ├── JsonDataLoaderPlugin.tsx
│   ├── AnalyticsDashboardPlugin.tsx
│   └── __tests__/
├── services/           # Business logic and utilities
│   ├── PluginLoader.ts
│   └── __tests__/
├── types/              # TypeScript type definitions
│   └── plugin.types.ts
├── App.tsx            # Main application component
└── index.tsx          # Application entry point

e2e/                   # End-to-end tests
├── plugin-system.spec.ts
└── playwright.config.ts
```

## Testing

The project includes comprehensive testing:

- **Unit Tests**: React Testing Library for component testing
- **Integration Tests**: Full application flow testing
- **E2E Tests**: Playwright for browser automation testing
- **Coverage**: >77% test coverage across the codebase

### Test Coverage

Current coverage metrics:
- Statements: 77.1%
- Branches: 71.42%
- Functions: 79.31%
- Lines: 76.54%

## Technology Stack

### React Version
- **Frontend**: React 19.1, TypeScript 4.9
- **Styling**: Inline CSS (easily replaceable with styled-components, CSS modules, etc.)
- **Testing**: Jest, React Testing Library, Playwright
- **Build**: Create React App, npm/webpack
- **Development**: Hot reloading, source maps, dev server

### Blazor Version  
- **Frontend**: Blazor WebAssembly, .NET 8, C#
- **Styling**: Identical inline CSS to React version
- **Testing**: Playwright E2E tests (matching React tests)
- **Build**: dotnet publish, WebAssembly
- **Development**: Hot reload, debugging, dev server

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-plugin`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Run E2E tests: `npm run test:e2e`
7. Submit a pull request

## License

This project is licensed under the MIT License.