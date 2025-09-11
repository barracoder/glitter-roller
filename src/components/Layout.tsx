import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { usePlugins } from '../context/PluginContext';

const Navigation: React.FC = () => {
  const { menuItems } = usePlugins();
  const location = useLocation();

  return (
    <nav style={{
      background: '#2c3e50',
      padding: '0 20px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      color: 'white'
    }}>
      <h2 style={{ margin: '0 30px 0 0', color: 'white' }}>
        ✨ Glitter Roller
      </h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path || '#'}
            style={{
              color: location.pathname === item.path ? '#3498db' : 'white',
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              background: location.pathname === item.path ? 'rgba(52, 152, 219, 0.2)' : 'transparent',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={item.onClick}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const Sidebar: React.FC = () => {
  const { getComponent } = usePlugins();
  
  // Get all widget components
  const dashboardWidget = getComponent('dashboard-widget');
  const userCounter = getComponent('user-counter');
  const settingsWidget = getComponent('settings-widget');

  return (
    <aside style={{
      width: '300px',
      background: '#ecf0f1',
      padding: '20px',
      borderRight: '1px solid #bdc3c7',
      minHeight: 'calc(100vh - 60px)',
      overflow: 'auto'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>Dashboard</h3>
      
      {dashboardWidget && <dashboardWidget.component {...(dashboardWidget.props || {})} />}
      {userCounter && <userCounter.component {...(userCounter.props || {})} />}
      {settingsWidget && <settingsWidget.component {...(settingsWidget.props || {})} />}
      
      <div style={{ 
        background: '#3498db', 
        color: 'white',
        padding: '15px', 
        borderRadius: '6px',
        margin: '10px 0'
      }}>
        <h4>🔌 Plugin System</h4>
        <p style={{ fontSize: '14px', margin: '5px 0' }}>
          This sidebar dynamically loads widget components from registered plugins.
        </p>
      </div>
    </aside>
  );
};

const MainContent: React.FC = () => {
  const { routes } = usePlugins();

  return (
    <main style={{
      flex: 1,
      background: 'white',
      minHeight: 'calc(100vh - 60px)',
      overflow: 'auto'
    }}>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={`${route.path}-${index}`}
            path={route.path}
            element={<route.component />}
          />
        ))}
        {/* Fallback route */}
        <Route 
          path="*" 
          element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <Link to="/" style={{ color: '#3498db' }}>Go back to home</Link>
            </div>
          } 
        />
      </Routes>
    </main>
  );
};

export const Layout: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </Router>
  );
};