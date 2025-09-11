import { render, screen } from '@testing-library/react';
import { dashboardPlugin } from '../dashboard.plugin';

describe('Dashboard Plugin', () => {
  it('should have correct metadata', () => {
    expect(dashboardPlugin.metadata.id).toBe('dashboard');
    expect(dashboardPlugin.metadata.name).toBe('Dashboard Plugin');
    expect(dashboardPlugin.metadata.version).toBe('1.0.0');
    expect(dashboardPlugin.metadata.author).toBe('Glitter Roller Team');
  });

  it('should have required methods', () => {
    expect(typeof dashboardPlugin.initialize).toBe('function');
    expect(typeof dashboardPlugin.destroy).toBe('function');
  });

  it('should have hooks', () => {
    expect(dashboardPlugin.hooks).toBeDefined();
    expect(typeof dashboardPlugin.hooks?.onLoad).toBe('function');
    expect(typeof dashboardPlugin.hooks?.onUnload).toBe('function');
    expect(typeof dashboardPlugin.hooks?.onRouteChange).toBe('function');
  });

  it('should have components', () => {
    expect(dashboardPlugin.components).toBeDefined();
    expect(dashboardPlugin.components?.['dashboard-widget']).toBeDefined();
  });

  it('should have routes', () => {
    expect(dashboardPlugin.routes).toBeDefined();
    expect(dashboardPlugin.routes).toHaveLength(2);
    expect(dashboardPlugin.routes?.[0].path).toBe('/');
    expect(dashboardPlugin.routes?.[1].path).toBe('/dashboard');
  });

  it('should have menu items', () => {
    expect(dashboardPlugin.menuItems).toBeDefined();
    expect(dashboardPlugin.menuItems).toHaveLength(1);
    expect(dashboardPlugin.menuItems?.[0].id).toBe('dashboard');
    expect(dashboardPlugin.menuItems?.[0].label).toBe('Dashboard');
    expect(dashboardPlugin.menuItems?.[0].path).toBe('/dashboard');
  });

  it('should render dashboard widget component', () => {
    const DashboardWidget = dashboardPlugin.components?.['dashboard-widget']?.component;
    if (DashboardWidget) {
      render(<DashboardWidget />);
      expect(screen.getByText('Dashboard Widget')).toBeInTheDocument();
      expect(screen.getByText('This is a reusable dashboard widget component.')).toBeInTheDocument();
    }
  });

  it('should render dashboard page component', () => {
    const DashboardPage = dashboardPlugin.routes?.[0]?.component;
    if (DashboardPage) {
      render(<DashboardPage />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Welcome to Glitter Roller')).toBeInTheDocument();
      expect(screen.getByText('Plugin System')).toBeInTheDocument();
      expect(screen.getByText('Modern Stack')).toBeInTheDocument();
    }
  });

  it('should call initialize and destroy methods', async () => {
    const initializeSpy = jest.spyOn(dashboardPlugin, 'initialize');
    const destroySpy = jest.spyOn(dashboardPlugin, 'destroy');

    await dashboardPlugin.initialize();
    expect(initializeSpy).toHaveBeenCalled();

    await dashboardPlugin.destroy();
    expect(destroySpy).toHaveBeenCalled();

    initializeSpy.mockRestore();
    destroySpy.mockRestore();
  });

  it('should call hook methods', async () => {
    if (dashboardPlugin.hooks?.onLoad) {
      const onLoadSpy = jest.spyOn(dashboardPlugin.hooks, 'onLoad');
      await dashboardPlugin.hooks.onLoad();
      expect(onLoadSpy).toHaveBeenCalled();
      onLoadSpy.mockRestore();
    }

    if (dashboardPlugin.hooks?.onUnload) {
      const onUnloadSpy = jest.spyOn(dashboardPlugin.hooks, 'onUnload');
      await dashboardPlugin.hooks.onUnload();
      expect(onUnloadSpy).toHaveBeenCalled();
      onUnloadSpy.mockRestore();
    }

    if (dashboardPlugin.hooks?.onRouteChange) {
      const onRouteChangeSpy = jest.spyOn(dashboardPlugin.hooks, 'onRouteChange');
      await dashboardPlugin.hooks.onRouteChange('/test-route');
      expect(onRouteChangeSpy).toHaveBeenCalledWith('/test-route');
      onRouteChangeSpy.mockRestore();
    }
  });
});