import { AppConfig } from '../types/plugin.types';

export const appConfig: AppConfig = {
  plugins: [
    {
      id: 'data-loader-1',
      name: 'CSV Data Loader',
      version: '1.0.0',
      description: 'Load data from CSV files',
      category: 'Loaders',
      config: {
        connectionStrings: {
          default: 'file://./data'
        },
        apiBaseUrls: {
          validation: 'https://api.validation.example.com'
        },
        authSettings: {
          type: 'apikey',
          credentials: {
            apiKey: 'demo-key'
          }
        }
      }
    },
    {
      id: 'data-loader-2',
      name: 'JSON Data Loader',
      version: '1.0.0',
      description: 'Load data from JSON files',
      category: 'Loaders',
      config: {
        connectionStrings: {
          default: 'file://./json-data'
        },
        authSettings: {
          type: 'none'
        }
      }
    },
    {
      id: 'dashboard-1',
      name: 'Analytics Dashboard',
      version: '1.0.0',
      description: 'View analytics and metrics',
      category: 'Dashboards',
      config: {
        apiBaseUrls: {
          analytics: 'https://api.analytics.example.com'
        },
        authSettings: {
          type: 'oauth',
          credentials: {
            clientId: 'demo-client',
            clientSecret: 'demo-secret'
          }
        }
      }
    }
  ],
  pluginHierarchy: {
    'Loaders': [
      {
        id: 'data-loader-1',
        name: 'CSV Data Loader',
        version: '1.0.0',
        description: 'Load data from CSV files',
        category: 'Loaders',
        config: {
          connectionStrings: {
            default: 'file://./data'
          },
          apiBaseUrls: {
            validation: 'https://api.validation.example.com'
          },
          authSettings: {
            type: 'apikey',
            credentials: {
              apiKey: 'demo-key'
            }
          }
        }
      },
      {
        id: 'data-loader-2',
        name: 'JSON Data Loader',
        version: '1.0.0',
        description: 'Load data from JSON files',
        category: 'Loaders',
        config: {
          connectionStrings: {
            default: 'file://./json-data'
          },
          authSettings: {
            type: 'none'
          }
        }
      }
    ],
    'Dashboards': [
      {
        id: 'dashboard-1',
        name: 'Analytics Dashboard',
        version: '1.0.0',
        description: 'View analytics and metrics',
        category: 'Dashboards',
        config: {
          apiBaseUrls: {
            analytics: 'https://api.analytics.example.com'
          },
          authSettings: {
            type: 'oauth',
            credentials: {
              clientId: 'demo-client',
              clientSecret: 'demo-secret'
            }
          }
        }
      }
    ]
  }
};