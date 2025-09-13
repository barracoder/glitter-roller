# Authentication Configuration Example

To control whether authentication is required for the application, modify the `requireAuthentication` flag in `src/config/app.config.ts`:

## Enable Authentication Requirement
```typescript
export const appConfig: AppConfig = {
  requireAuthentication: true, // Users must authenticate to use the app
  plugins: [
    // ... plugin configurations
  ],
  // ... other config
};
```

## Disable Authentication Requirement (Optional Access)
```typescript
export const appConfig: AppConfig = {
  requireAuthentication: false, // Authentication is optional
  plugins: [
    // ... plugin configurations
  ],
  // ... other config
};
```

When `requireAuthentication: true`:
- Users see the authentication required screen on first visit
- Must sign in with Microsoft account to access any features
- Full authentication flow with user profile and sign out

When `requireAuthentication: false` (or omitted):
- Users can access the application immediately
- Authentication is still available via the header sign-in button
- Optional authentication for enhanced features