# Glitter Roller

A modern React TypeScript website template with a powerful plugin architecture, built with best practices and comprehensive testing.

![Dashboard](https://github.com/user-attachments/assets/5e1d7b7a-2f65-440a-89b7-1ff5278995d0)

## Features

### 🎯 Modern Tech Stack
- **React 19** with TypeScript for type-safe development
- **Vite** for fast build times and development experience
- **React Router** for client-side routing
- **ESLint** for code quality and consistency

### 🔌 Plugin Architecture
- **Modular Design**: Features implemented as independent plugins
- **Dynamic Loading**: Plugins can be loaded/unloaded at runtime
- **Component System**: Reusable widgets and components
- **Event System**: Inter-plugin communication
- **Dependency Management**: Plugin dependencies handled automatically

### ✅ Comprehensive Testing
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright for end-to-end testing
- **Coverage Reports**: Built-in code coverage tracking
- **CI/CD Ready**: Test automation configuration included

### 📱 Sample Plugins Included
- **Dashboard Plugin**: Welcome page with informational widgets
- **User Management Plugin**: CRUD operations for user data
- **Settings Plugin**: Application configuration and plugin management

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/barracoder/glitter-roller.git
cd glitter-roller

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run Playwright e2e tests
npm run test:all     # Run all tests
```

## Project Structure

```
glitter-roller/
├── src/
│   ├── components/          # Shared UI components
│   │   └── Layout.tsx       # Main application layout
│   ├── context/            # React contexts
│   │   └── PluginContext.tsx # Plugin system context
│   ├── hooks/              # Custom React hooks
│   ├── plugins/            # Plugin implementations
│   │   ├── dashboard.plugin.tsx
│   │   ├── userManagement.plugin.tsx
│   │   └── settings.plugin.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── plugin.ts       # Plugin interface types
│   ├── utils/              # Utility functions
│   │   └── PluginManager.ts # Core plugin management
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── e2e/                    # Playwright e2e tests
├── public/                 # Static assets
├── PLUGIN_DEVELOPMENT.md   # Plugin development guide
└── README.md              # This file
```

## Screenshots

### Dashboard Page
![Dashboard](https://github.com/user-attachments/assets/5e1d7b7a-2f65-440a-89b7-1ff5278995d0)

### User Management
![Users](https://github.com/user-attachments/assets/c2a9254a-5f24-46c4-b553-8c378842de9d)

### Settings & Plugin Management  
![Settings](https://github.com/user-attachments/assets/5aa0db0e-3e63-4e55-9bd8-4f2f7cc55c24)

## Plugin Development

This template is designed to be extended through plugins. See [PLUGIN_DEVELOPMENT.md](./PLUGIN_DEVELOPMENT.md) for a comprehensive guide on creating your own plugins.

### Quick Plugin Example

```typescript
import React from 'react';
import type { Plugin } from '../types/plugin';

const MyComponent: React.FC = () => (
  <div>Hello from my plugin!</div>
);

export const myPlugin: Plugin = {
  metadata: {
    id: 'my-plugin',
    name: 'My Plugin',
    version: '1.0.0',
    description: 'A sample plugin',
    author: 'Your Name',
  },
  
  components: {
    'my-widget': { component: MyComponent },
  },
  
  routes: [
    { path: '/my-page', component: MyComponent },
  ],
  
  menuItems: [
    { id: 'my-menu', label: 'My Plugin', path: '/my-page' },
  ],
  
  initialize: async () => console.log('Plugin loaded'),
  destroy: async () => console.log('Plugin unloaded'),
};
```

## Testing

### Unit Tests
- **Framework**: Jest + React Testing Library
- **Coverage**: 70%+ target for statements, branches, functions, and lines
- **Location**: `src/**/__tests__/` and `src/**/*.test.{ts,tsx}`

### E2E Tests  
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Location**: `e2e/`

Run tests:
```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run test:all    # All tests
```

## Architecture

### Plugin System
- **PluginManager**: Centralized plugin registration and lifecycle management
- **PluginContext**: React context providing plugin access to components
- **Event System**: Pub/sub pattern for inter-plugin communication
- **Dependency Resolution**: Automatic plugin dependency handling

### Key Design Patterns
- **Modular Architecture**: Features as independent, swappable plugins
- **Dependency Injection**: Plugin context provides services to plugins
- **Observer Pattern**: Event system for loose coupling
- **Factory Pattern**: Dynamic component and route registration

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow the existing code style

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components styled with vanilla CSS
- Testing with [Jest](https://jestjs.io/) and [Playwright](https://playwright.dev/)
- Icons from emoji characters for simplicity
