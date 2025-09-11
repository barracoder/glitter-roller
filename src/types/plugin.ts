import type { ReactNode } from 'react';

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  dependencies?: string[];
}

export interface PluginHooks {
  onLoad?: () => Promise<void> | void;
  onUnload?: () => Promise<void> | void;
  onRouteChange?: (route: string) => Promise<void> | void;
}

export interface PluginComponent {
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

export interface PluginRoute {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

export interface PluginMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  onClick?: () => void;
  children?: PluginMenuItem[];
}

export interface Plugin {
  metadata: PluginMetadata;
  hooks?: PluginHooks;
  components?: Record<string, PluginComponent>;
  routes?: PluginRoute[];
  menuItems?: PluginMenuItem[];
  initialize: () => Promise<void> | void;
  destroy: () => Promise<void> | void;
}

export interface PluginContext {
  registerComponent: (id: string, component: PluginComponent) => void;
  registerRoute: (route: PluginRoute) => void;
  registerMenuItem: (item: PluginMenuItem) => void;
  getState: () => any;
  setState: (state: any) => void;
  emit: (event: string, data?: any) => void;
  on: (event: string, handler: (data?: any) => void) => void;
  off: (event: string, handler: (data?: any) => void) => void;
}