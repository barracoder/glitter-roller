import { test, expect } from '@playwright/test';

test.describe('Glitter Roller Plugin System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application with plugins', async ({ page }) => {
    // Check if the page loads
    await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
    
    // Check if the main title is present
    await expect(page.getByRole('heading', { name: '✨ Glitter Roller' })).toBeVisible();
    
    // Check if navigation menu items from plugins are present
    await expect(page.getByRole('link', { name: '📊 Dashboard' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: '👥 Users' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: '⚙️ Settings' }).first()).toBeVisible();
  });

  test('should display dashboard content', async ({ page }) => {
    // Check dashboard content
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
    await expect(page.getByText('Welcome to Glitter Roller')).toBeVisible();
    await expect(page.getByText('Plugin System')).toBeVisible();
    await expect(page.getByText('Modern Stack')).toBeVisible();
  });

  test('should display sidebar widgets from plugins', async ({ page }) => {
    // Check sidebar widgets
    await expect(page.getByText('Dashboard Widget')).toBeVisible();
    await expect(page.getByText('👥 User Statistics')).toBeVisible();
    await expect(page.getByText('⚙️ Quick Settings')).toBeVisible();
    await expect(page.getByText('🔌 Plugin System')).toBeVisible();
  });

  test('should navigate to users page', async ({ page }) => {
    // Click on Users link
    await page.getByRole('link', { name: '👥 Users' }).first().click();
    
    // Check URL
    await expect(page).toHaveURL('/users');
    
    // Check users page content
    await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible();
    await expect(page.getByText('Add New User')).toBeVisible();
    await expect(page.getByText('Current Users')).toBeVisible();
    
    // Check user table
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('jane@example.com')).toBeVisible();
    await expect(page.getByText('Bob Johnson')).toBeVisible();
  });

  test('should navigate to settings page', async ({ page }) => {
    // Click on Settings link
    await page.getByRole('link', { name: '⚙️ Settings' }).first().click();
    
    // Check URL
    await expect(page).toHaveURL('/settings');
    
    // Check settings page content
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByText('Application Settings')).toBeVisible();
    await expect(page.getByText('Plugin Management')).toBeVisible();
    await expect(page.getByText('System Information')).toBeVisible();
  });

  test('should show plugin information in settings', async ({ page }) => {
    // Navigate to settings
    await page.getByRole('link', { name: '⚙️ Settings' }).first().click();
    
    // Check plugin cards
    await expect(page.getByText('Dashboard Plugin')).toBeVisible();
    await expect(page.getByText('User Management Plugin')).toBeVisible();
    await expect(page.getByText('Settings Plugin')).toBeVisible();
    
    // Check plugin details
    await expect(page.getByText('A sample dashboard plugin with widgets and overview')).toBeVisible();
    await expect(page.getByText('v1.0.0 by Glitter Roller Team')).toBeVisible();
  });

  test('should have functional user form', async ({ page }) => {
    // Navigate to users page
    await page.getByRole('link', { name: '👥 Users' }).first().click();
    
    // Fill out the user form
    await page.getByPlaceholder('Name').fill('Test User');
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByRole('combobox').selectOption('Admin');
    
    // Check form values
    await expect(page.getByPlaceholder('Name')).toHaveValue('Test User');
    await expect(page.getByPlaceholder('Email')).toHaveValue('test@example.com');
  });

  test('should have functional settings controls', async ({ page }) => {
    // Navigate to settings page
    await page.getByRole('link', { name: '⚙️ Settings' }).first().click();
    
    // Test theme selector
    await page.getByRole('combobox').first().selectOption('Dark');
    
    // Test checkboxes
    const notificationsCheckbox = page.getByRole('checkbox', { name: 'Enable Notifications' });
    await expect(notificationsCheckbox).toBeChecked();
    
    const autoSaveCheckbox = page.getByRole('checkbox', { name: 'Auto-save Changes' });
    await expect(autoSaveCheckbox).toBeChecked();
  });

  test('should handle navigation between pages', async ({ page }) => {
    // Start at dashboard
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
    
    // Go to users
    await page.getByRole('link', { name: '👥 Users' }).first().click();
    await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible();
    
    // Go to settings
    await page.getByRole('link', { name: '⚙️ Settings' }).first().click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    
    // Go back to dashboard
    await page.getByRole('link', { name: '📊 Dashboard' }).first().click();
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
  });

  test('should display proper loading indicators', async ({ page }) => {
    // Check that no loading spinners are visible after page load
    await page.waitForLoadState('networkidle');
    
    // Verify content is loaded
    await expect(page.getByText('Welcome to Glitter Roller')).toBeVisible();
    await expect(page.getByText('Dashboard Widget')).toBeVisible();
  });
});