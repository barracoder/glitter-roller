export interface PluginConfig {
  connectionStrings?: Record<string, string>;
  apiBaseUrls?: Record<string, string>;
  authSettings?: {
    type: 'oauth' | 'apikey' | 'basic' | 'none';
    credentials?: Record<string, string>;
  };
  [key: string]: any;
}

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description?: string;
  category: string;
  config: PluginConfig;
  component: string; // Reference to component key in the registry
}

export interface Plugin {
  metadata: PluginMetadata;
  component: React.ComponentType<PluginProps>;
}

export interface PluginProps {
  config: PluginConfig;
  pluginId: string;
}

export interface PluginHierarchy {
  [category: string]: PluginMetadata[];
}

export interface AppConfig {
  plugins: PluginMetadata[];
  componentRegistry: Record<string, React.ComponentType<PluginProps>>;
  requireAuthentication?: boolean;
}