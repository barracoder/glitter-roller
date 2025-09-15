import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-blazor',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5278',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'cd Dashboard.Blazor && dotnet run',
    url: 'http://localhost:5278',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});