import React, { useState } from 'react';
import type { Plugin } from '../types/plugin';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagementPage: React.FC = () => {
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Adding user:', newUser);
    setNewUser({ name: '', email: '', role: 'User' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>User Management</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Add New User</h2>
        <form onSubmit={handleAddUser} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button 
            type="submit"
            style={{ 
              padding: '8px 16px', 
              background: '#2196f3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add User
          </button>
        </form>
      </div>

      <div>
        <h2>Current Users</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.id}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.role}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <button 
                    style={{ 
                      padding: '4px 8px', 
                      background: '#f44336', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                    onClick={() => console.log('Delete user:', user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserCounter: React.FC = () => {
  return (
    <div style={{ 
      background: '#e8f5e8', 
      padding: '15px', 
      borderRadius: '6px',
      border: '1px solid #4caf50',
      margin: '10px 0'
    }}>
      <h4>👥 User Statistics</h4>
      <p>Total Users: 3</p>
      <p>Active: 3 | Inactive: 0</p>
    </div>
  );
};

export const userManagementPlugin: Plugin = {
  metadata: {
    id: 'user-management',
    name: 'User Management Plugin',
    version: '1.0.0',
    description: 'A plugin for managing users with CRUD operations',
    author: 'Glitter Roller Team',
  },
  
  components: {
    'user-counter': {
      component: UserCounter,
    },
  },
  
  routes: [
    {
      path: '/users',
      component: UserManagementPage,
    },
  ],
  
  menuItems: [
    {
      id: 'users',
      label: 'Users',
      path: '/users',
      icon: React.createElement('span', { style: { marginRight: '8px' } }, '👥'),
    },
  ],
  
  hooks: {
    onLoad: async () => {
      console.log('User Management plugin loaded');
    },
    onUnload: async () => {
      console.log('User Management plugin unloaded');
    },
  },
  
  initialize: async () => {
    console.log('User Management plugin initialized');
  },
  
  destroy: async () => {
    console.log('User Management plugin destroyed');
  },
};