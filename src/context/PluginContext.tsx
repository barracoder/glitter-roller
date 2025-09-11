import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Plugin, PluginComponent, PluginRoute, PluginMenuItem } from '../types/plugin';
import { pluginManager } from '../utils/PluginManager';

interface PluginProviderContextType {
  plugins: Plugin[];
  components: PluginComponent[];
  routes: PluginRoute[];
  menuItems: PluginMenuItem[];
  registerPlugin: (plugin: Plugin) => Promise<void>;
  unregisterPlugin: (pluginId: string) => Promise<void>;
  getComponent: (componentId: string) => PluginComponent | undefined;
  emit: (event: string, data?: any) => void;
}

const PluginProviderContext = createContext<PluginProviderContextType | undefined>(undefined);

interface PluginProviderProps {
  children: ReactNode;
}

export function PluginProvider({ children }: PluginProviderProps) {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [components, setComponents] = useState<PluginComponent[]>([]);
  const [routes, setRoutes] = useState<PluginRoute[]>([]);
  const [menuItems, setMenuItems] = useState<PluginMenuItem[]>([]);

  const refreshState = () => {
    setPlugins(pluginManager.getPlugins());
    setComponents(pluginManager.getComponents());
    setRoutes(pluginManager.getRoutes());
    setMenuItems(pluginManager.getMenuItems());
  };

  const registerPlugin = async (plugin: Plugin): Promise<void> => {
    await pluginManager.registerPlugin(plugin);
    refreshState();
  };

  const unregisterPlugin = async (pluginId: string): Promise<void> => {
    await pluginManager.unregisterPlugin(pluginId);
    refreshState();
  };

  const getComponent = (componentId: string): PluginComponent | undefined => {
    return pluginManager.getComponent(componentId);
  };

  const emit = (event: string, data?: any): void => {
    pluginManager.emit(event, data);
  };

  useEffect(() => {
    refreshState();
  }, []);

  const contextValue: PluginProviderContextType = {
    plugins,
    components,
    routes,
    menuItems,
    registerPlugin,
    unregisterPlugin,
    getComponent,
    emit,
  };

  return (
    <PluginProviderContext.Provider value={contextValue}>
      {children}
    </PluginProviderContext.Provider>
  );
}

export function usePlugins(): PluginProviderContextType {
  const context = useContext(PluginProviderContext);
  if (context === undefined) {
    throw new Error('usePlugins must be used within a PluginProvider');
  }
  return context;
}