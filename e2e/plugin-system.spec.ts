import { test, expect } from '@playwright/test';

test.describe('Glitter Roller Plugin System', () => {
  test('should display welcome message on initial load', async ({ page }) => {
    await page.goto('/');

    // Check that the app title and navigation are present
    await expect(page.getByRole('heading', { name: 'Plugins' })).toBeVisible();
    await expect(page.getByText('Welcome to Glitter Roller')).toBeVisible();
    await expect(page.getByText('Select a plugin from the navigation panel to get started.')).toBeVisible();
  });

  test('should expand plugin categories and show plugins', async ({ page }) => {
    await page.goto('/');

    // Initially categories should be collapsed
    await expect(page.getByText('CSV Data Loader')).not.toBeVisible();
    await expect(page.getByText('JSON Data Loader')).not.toBeVisible();

    // Expand Loaders category
    await page.getByText('Loaders').click();

    // Plugins should now be visible
    await expect(page.getByText('CSV Data Loader')).toBeVisible();
    await expect(page.getByText('JSON Data Loader')).toBeVisible();
    await expect(page.getByText('Load data from CSV files')).toBeVisible();
    await expect(page.getByText('Load data from JSON files')).toBeVisible();
  });

  test('should display CSV Data Loader plugin when selected', async ({ page }) => {
    await page.goto('/');

    // Expand Loaders and click CSV Data Loader
    await page.getByText('Loaders').click();
    await page.getByText('CSV Data Loader').click();

    // Check that the plugin content is displayed
    await expect(page.getByRole('heading', { name: 'CSV Data Loader' })).toBeVisible();
    await expect(page.getByText('Plugin ID: data-loader-1')).toBeVisible();
    
    // Check configuration section
    await expect(page.getByRole('heading', { name: 'Configuration' })).toBeVisible();
    await expect(page.getByText('Connection String: file://./data')).toBeVisible();
    await expect(page.getByText('Validation API: https://api.validation.example.com')).toBeVisible();
    await expect(page.getByText('Auth Type: apikey')).toBeVisible();

    // Check functionality section
    await expect(page.getByRole('heading', { name: 'Functionality' })).toBeVisible();
    await expect(page.getByText('Read CSV files from the configured path')).toBeVisible();

    // Check that the load button is present
    await expect(page.getByRole('button', { name: 'Load CSV Data' })).toBeVisible();
  });

  test('should display Analytics Dashboard plugin when selected', async ({ page }) => {
    await page.goto('/');

    // Expand Dashboards and click Analytics Dashboard
    await page.getByText('Dashboards').click();
    await page.getByText('Analytics Dashboard').click();

    // Check that the plugin content is displayed
    await expect(page.getByRole('heading', { name: 'Analytics Dashboard' })).toBeVisible();
    await expect(page.getByText('Plugin ID: dashboard-1')).toBeVisible();
    
    // Check configuration section
    await expect(page.getByRole('heading', { name: 'Configuration' })).toBeVisible();
    await expect(page.getByText('Analytics API: https://api.analytics.example.com')).toBeVisible();
    await expect(page.getByText('Auth Type: oauth')).toBeVisible();
    await expect(page.getByText('Client ID: demo-client')).toBeVisible();

    // Check analytics overview
    await expect(page.getByRole('heading', { name: 'Analytics Overview' })).toBeVisible();
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('1,234')).toBeVisible();
    await expect(page.getByText('Active Sessions')).toBeVisible();
    await expect(page.getByText('567')).toBeVisible();
    await expect(page.getByText('Total Revenue')).toBeVisible();
    await expect(page.getByText('$12,345')).toBeVisible();
    await expect(page.getByText('Conversion Rate')).toBeVisible();
    await expect(page.getByText('3.2%')).toBeVisible();

    // Check that the refresh button is present
    await expect(page.getByRole('button', { name: 'Refresh Data' })).toBeVisible();
  });

  test('should switch between different plugins', async ({ page }) => {
    await page.goto('/');

    // First, select CSV Data Loader
    await page.getByText('Loaders').click();
    await page.getByText('CSV Data Loader').click();
    await expect(page.getByRole('heading', { name: 'CSV Data Loader' })).toBeVisible();

    // Then switch to JSON Data Loader
    await page.getByText('JSON Data Loader').click();
    await expect(page.getByRole('heading', { name: 'JSON Data Loader' })).toBeVisible();
    await expect(page.getByText('Plugin ID: data-loader-2')).toBeVisible();

    // CSV Data Loader should no longer be visible
    await expect(page.getByText('Plugin ID: data-loader-1')).not.toBeVisible();

    // Then switch to Analytics Dashboard
    await page.getByText('Dashboards').click();
    await page.getByText('Analytics Dashboard').click();
    await expect(page.getByRole('heading', { name: 'Analytics Dashboard' })).toBeVisible();

    // JSON Data Loader should no longer be visible
    await expect(page.getByText('Plugin ID: data-loader-2')).not.toBeVisible();
  });

  test('should trigger plugin interactions', async ({ page }) => {
    await page.goto('/');

    // Test CSV Data Loader button
    await page.getByText('Loaders').click();
    await page.getByText('CSV Data Loader').click();
    
    // Set up alert listener
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Load CSV Data' }).click();

    // Test Analytics Dashboard button
    await page.getByText('Dashboards').click();
    await page.getByText('Analytics Dashboard').click();
    await page.getByRole('button', { name: 'Refresh Data' }).click();
  });

  test('should maintain plugin selection state visually', async ({ page }) => {
    await page.goto('/');

    // Expand Loaders and select CSV Data Loader
    await page.getByText('Loaders').click();
    await page.getByText('CSV Data Loader').click();

    // The selected plugin should have different styling (we can't easily test the exact color,
    // but we can verify the plugin is selected by checking the content is displayed)
    await expect(page.getByRole('heading', { name: 'CSV Data Loader' })).toBeVisible();

    // Switch to another plugin
    await page.getByText('JSON Data Loader').click();
    await expect(page.getByRole('heading', { name: 'JSON Data Loader' })).toBeVisible();
  });
});