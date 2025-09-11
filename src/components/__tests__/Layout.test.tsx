import { render, screen } from '@testing-library/react';
import { Layout } from '../Layout';
import { PluginProvider } from '../../context/PluginContext';

// Mock the PluginManager
jest.mock('../../utils/PluginManager', () => ({
  pluginManager: {
    registerPlugin: jest.fn(),
    unregisterPlugin: jest.fn(),
    getPlugins: jest.fn(() => []),
    getComponents: jest.fn(() => []),
    getRoutes: jest.fn(() => [
      {
        path: '/',
        component: () => <div data-testid="home-page">Home Page</div>,
      },
      {
        path: '/test',
        component: () => <div data-testid="test-page">Test Page</div>,
      },
    ]),
    getMenuItems: jest.fn(() => [
      {
        id: 'home',
        label: 'Home',
        path: '/',
        icon: <span>🏠</span>,
      },
      {
        id: 'test',
        label: 'Test',
        path: '/test',
        icon: <span>🧪</span>,
      },
    ]),
    getComponent: jest.fn((id) => {
      if (id === 'test-widget') {
        return {
          component: () => <div data-testid="test-widget">Test Widget</div>,
        };
      }
      return undefined;
    }),
    emit: jest.fn(),
  },
}));

const LayoutWrapper: React.FC = () => (
  <PluginProvider>
    <Layout />
  </PluginProvider>
);

describe('Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render navigation with plugin menu items', () => {
    render(<LayoutWrapper />);

    expect(screen.getByText('✨ Glitter Roller')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render sidebar with dashboard heading', () => {
    render(<LayoutWrapper />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('🔌 Plugin System')).toBeInTheDocument();
  });

  it('should render main content area', () => {
    render(<LayoutWrapper />);

    // Should render a main element
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should have proper layout structure', () => {
    const { container } = render(<LayoutWrapper />);

    // Check for navigation
    expect(container.querySelector('nav')).toBeInTheDocument();
    
    // Check for sidebar
    expect(container.querySelector('aside')).toBeInTheDocument();
    
    // Check for main content
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});