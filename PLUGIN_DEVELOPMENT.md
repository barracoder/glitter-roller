# Glitter Roller Plugin Development Guide

Glitter Roller is a modern React TypeScript application that supports a plugin architecture. This guide will help you understand how to develop plugins for the platform.

## Overview

The plugin system allows developers to extend the application with new features, components, routes, and menu items. Each plugin is self-contained and can be loaded or unloaded at runtime.

## Plugin Architecture

### Core Components

1. **PluginManager** - Central manager for registering, unregistering, and managing plugins
2. **PluginContext** - React context that provides plugin functionality to components
3. **Plugin Interface** - TypeScript interface that defines the plugin structure

### Plugin Structure

Every plugin must implement the `Plugin` interface:

```typescript
interface Plugin {
  metadata: PluginMetadata;
  hooks?: PluginHooks;
  components?: Record<string, PluginComponent>;
  routes?: PluginRoute[];
  menuItems?: PluginMenuItem[];
  initialize: () => Promise<void> | void;
  destroy: () => Promise<void> | void;
}
```

## Creating a Plugin

### 1. Basic Plugin Structure

```typescript
import React from 'react';
import type { Plugin } from '../types/plugin';

const MyComponent: React.FC = () => {
  return <div>My Plugin Component</div>;
};

export const myPlugin: Plugin = {
  metadata: {
    id: 'my-plugin',
    name: 'My Plugin',
    version: '1.0.0',
    description: 'A sample plugin',
    author: 'Your Name',
  },
  
  initialize: async () => {
    console.log('My plugin initialized');
  },
  
  destroy: async () => {
    console.log('My plugin destroyed');
  },
};
```

### 2. Adding Components

Plugins can register reusable components:

```typescript
export const myPlugin: Plugin = {
  // ... metadata
  
  components: {
    'my-widget': {
      component: MyWidget,
      props: { title: 'Default Title' },
    },
  },
  
  // ... other properties
};
```

### 3. Adding Routes

Plugins can add new pages to the application:

```typescript
export const myPlugin: Plugin = {
  // ... metadata
  
  routes: [
    {
      path: '/my-page',
      component: MyPageComponent,
    },
    {
      path: '/my-other-page',
      component: MyOtherPageComponent,
    },
  ],
  
  // ... other properties
};
```

### 4. Adding Menu Items

Plugins can add navigation menu items:

```typescript
export const myPlugin: Plugin = {
  // ... metadata
  
  menuItems: [
    {
      id: 'my-menu',
      label: 'My Plugin',
      path: '/my-page',
      icon: React.createElement('span', { style: { marginRight: '8px' } }, '🔌'),
    },
  ],
  
  // ... other properties
};
```

### 5. Using Hooks

Plugins can use lifecycle hooks:

```typescript
export const myPlugin: Plugin = {
  // ... metadata
  
  hooks: {
    onLoad: async () => {
      console.log('Plugin loaded');
    },
    onUnload: async () => {
      console.log('Plugin unloaded');
    },
    onRouteChange: async (route: string) => {
      console.log(\`Route changed to \${route}\`);
    },
  },
  
  // ... other properties
};
```

## Plugin Examples

### Example 1: Simple Widget Plugin

```typescript
import React from 'react';
import type { Plugin } from '../types/plugin';

const WeatherWidget: React.FC = () => {
  return (
    <div style={{ 
      background: '#e3f2fd', 
      padding: '15px', 
      borderRadius: '6px',
      margin: '10px 0'
    }}>
      <h4>🌤️ Weather</h4>
      <p>Sunny, 72°F</p>
    </div>
  );
};

export const weatherPlugin: Plugin = {
  metadata: {
    id: 'weather',
    name: 'Weather Widget',
    version: '1.0.0',
    description: 'Displays current weather information',
    author: 'Weather Team',
  },
  
  components: {
    'weather-widget': {
      component: WeatherWidget,
    },
  },
  
  initialize: async () => {
    console.log('Weather plugin initialized');
  },
  
  destroy: async () => {
    console.log('Weather plugin destroyed');
  },
};
```

### Example 2: Full Page Plugin

```typescript
import React, { useState } from 'react';
import type { Plugin } from '../types/plugin';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export const todoPlugin: Plugin = {
  metadata: {
    id: 'todo',
    name: 'Todo List',
    version: '1.0.0',
    description: 'A simple todo list application',
    author: 'Todo Team',
  },
  
  routes: [
    {
      path: '/todos',
      component: TodoPage,
    },
  ],
  
  menuItems: [
    {
      id: 'todos',
      label: 'Todos',
      path: '/todos',
      icon: React.createElement('span', { style: { marginRight: '8px' } }, '✅'),
    },
  ],
  
  initialize: async () => {
    console.log('Todo plugin initialized');
  },
  
  destroy: async () => {
    console.log('Todo plugin destroyed');
  },
};
```

## Plugin Registration

### Registering a Plugin

```typescript
import { usePlugins } from './context/PluginContext';
import { myPlugin } from './plugins/myPlugin';

const MyApp: React.FC = () => {
  const { registerPlugin } = usePlugins();

  useEffect(() => {
    const loadPlugin = async () => {
      try {
        await registerPlugin(myPlugin);
        console.log('Plugin registered successfully');
      } catch (error) {
        console.error('Failed to register plugin:', error);
      }
    };

    loadPlugin();
  }, [registerPlugin]);

  return <div>My App</div>;
};
```

### Unregistering a Plugin

```typescript
const { unregisterPlugin } = usePlugins();

const handleUnloadPlugin = async () => {
  try {
    await unregisterPlugin('my-plugin');
    console.log('Plugin unregistered successfully');
  } catch (error) {
    console.error('Failed to unregister plugin:', error);
  }
};
```

## Plugin Dependencies

Plugins can declare dependencies on other plugins:

```typescript
export const myPlugin: Plugin = {
  metadata: {
    id: 'my-plugin',
    name: 'My Plugin',
    version: '1.0.0',
    description: 'A plugin with dependencies',
    author: 'Your Name',
    dependencies: ['base-plugin', 'utils-plugin'],
  },
  
  // ... other properties
};
```

The plugin manager will ensure that dependencies are loaded before loading the dependent plugin.

## Event System

Plugins can communicate with each other using the event system:

### Emitting Events

```typescript
const { emit } = usePlugins();

const handleButtonClick = () => {
  emit('user-action', { action: 'button-click', userId: 123 });
};
```

### Listening to Events

```typescript
export const myPlugin: Plugin = {
  // ... metadata
  
  initialize: async () => {
    // Access the plugin context to listen to events
    // This would typically be done within a React component
  },
  
  // ... other properties
};
```

## Best Practices

1. **Unique Plugin IDs**: Always use unique plugin IDs to avoid conflicts
2. **Error Handling**: Always handle errors in plugin initialization and destruction
3. **Resource Cleanup**: Clean up any resources in the destroy method
4. **TypeScript**: Use TypeScript for better type safety and development experience
5. **Testing**: Write unit tests for your plugin components and logic
6. **Documentation**: Document your plugin's API and usage

## Testing Plugins

### Unit Testing

```typescript
import { render, screen } from '@testing-library/react';
import { myPlugin } from '../myPlugin';

describe('My Plugin', () => {
  it('should have correct metadata', () => {
    expect(myPlugin.metadata.id).toBe('my-plugin');
    expect(myPlugin.metadata.name).toBe('My Plugin');
  });

  it('should render component correctly', () => {
    const Component = myPlugin.components?.['my-component']?.component;
    if (Component) {
      render(<Component />);
      expect(screen.getByText('My Plugin Component')).toBeInTheDocument();
    }
  });
});
```

### E2E Testing

```typescript
import { test, expect } from '@playwright/test';

test('should load my plugin', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('My Plugin')).toBeVisible();
  
  // Navigate to plugin page
  await page.getByRole('link', { name: 'My Plugin' }).click();
  await expect(page).toHaveURL('/my-page');
});
```

## Plugin Development Workflow

1. **Create Plugin File**: Create a new file in the `src/plugins/` directory
2. **Implement Plugin Interface**: Ensure your plugin implements the `Plugin` interface
3. **Register Plugin**: Add your plugin to the main application
4. **Test Plugin**: Write and run unit tests for your plugin
5. **Document Plugin**: Add documentation for your plugin's features

## Troubleshooting

### Common Issues

1. **Plugin Not Loading**: Check that the plugin ID is unique and the plugin is properly registered
2. **Component Not Rendering**: Ensure the component is a valid React component and properly exported
3. **Routes Not Working**: Check that the route paths are unique and the components are valid
4. **Dependencies Not Found**: Ensure all dependent plugins are registered before the current plugin

### Debugging

Use the browser's developer tools to debug plugins:

1. Check console for error messages
2. Use React Developer Tools to inspect component tree
3. Use the Network tab to check for failed resource loads

## Conclusion

The Glitter Roller plugin system provides a powerful way to extend the application with new features. By following this guide and the provided examples, you can create robust and maintainable plugins that integrate seamlessly with the platform.