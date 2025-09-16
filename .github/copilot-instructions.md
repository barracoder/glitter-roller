# Glitter Roller

Glitter Roller is a multi-technology project that includes both Node.js and .NET/Blazor components. The repository contains setup files for both environments and testing configurations.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Repository State

This repository includes:
- README.md with basic project title
- .gitignore configured for Node.js and .NET development
- .runsettings for .NET test configuration
- Blazor components in the Blazor directory
- Mixed technology stack with both JavaScript/Node.js and C#/.NET components

## Working Effectively

### Prerequisites
The development environment comes pre-configured with:
- Node.js v20.19.5
- npm v10.8.2  
- git v2.51.0
- .NET SDK 8.0
- curl and other standard tools

### Node.js Project Setup
When working with the Node.js components:

1. **Initialize the Node.js project:**
   ```bash
   npm init -y
   ```
   - Takes ~1-2 seconds
   - Creates package.json with default configuration

2. **Install dependencies (when package.json exists):**
   ```bash
   npm install --no-audit --no-fund
   ```
   - Time varies based on dependencies (typically 10-60 seconds)
   - NEVER CANCEL: Allow npm install to complete fully

3. **Common development dependencies to consider:**
   ```bash
   # For TypeScript projects
   npm install --save-dev typescript @types/node ts-node
   
   # For testing
   npm install --save-dev jest @types/jest
   
   # For linting and formatting
   npm install --save-dev eslint prettier
   ```

### .NET/Blazor Project Setup
When working with the .NET/Blazor components:

1. **Restore dependencies:**
   ```bash
   dotnet restore
   ```
   - Takes ~5-30 seconds depending on packages

2. **Build the project:**
   ```bash
   dotnet build
   ```
   - Takes ~10-60 seconds

3. **Run the Blazor application:**
   ```bash
   dotnet run --project ./Blazor/Dashboard.Blazor
   ```
   - Application will be available at https://localhost:5001 by default

### Running Tests with .NET

The repository includes a `.runsettings` file that configures:
- Code coverage collection
- Test parallelization
- Test output formats (console, trx, html)
- Blazor/Playwright test parameters

To run tests with these settings:

```bash
dotnet test --settings .runsettings
```

### Build and Test Commands

Since this is an empty repository, there are no build or test commands yet. When code is added:

1. **Always validate any new package.json or .NET project scripts before documenting them**
2. **Test all build commands with adequate timeouts:**
   - Set timeout to 300+ seconds for build commands
   - Set timeout to 180+ seconds for test commands
   - NEVER CANCEL builds or tests prematurely

3. **Common .NET patterns to validate:**
   ```bash
   # Build all projects
   dotnet build
   
   # Run all tests
   dotnet test
   
   # Run with settings
   dotnet test --settings .runsettings
   
   # Run specific project
   dotnet run --project ./Blazor/Dashboard.Blazor
   ```

## Validation Requirements

### Before Adding New Code
1. **Always run appropriate dependency restoration after adding dependencies**
   - For Node.js: `npm install`
   - For .NET: `dotnet restore`
2. **Validate all new scripts work correctly**
3. **Test with realistic timeouts (never use default short timeouts)**

### Testing Blazor Features
For Blazor applications:

1. **Verify the application builds:**
   ```bash
   dotnet build ./Blazor/Dashboard.Blazor
   ```

2. **Run tests with code coverage:**
   ```bash
   dotnet test --settings .runsettings
   ```
   
3. **Start the application:**
   ```bash
   dotnet run --project ./Blazor/Dashboard.Blazor
   ```

### Quality Assurance
```bash
# For Node.js components
npm run lint    # if lint script exists
npm run format  # if format script exists
npm run test    # if test script exists

# For .NET components
dotnet format   # for code formatting
dotnet test     # for running tests
```

## Repository Structure

The repository structure now includes both Node.js and .NET components:

```
glitter-roller/
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/           # CI/CD when added
├── Blazor/
│   ├── Dashboard.Blazor/    # Blazor application
│   └── Dashboard.Blazor.Tests/ # Blazor tests
├── src/                     # Node.js source code
├── test/ or tests/          # Node.js test files
├── docs/                    # Documentation
├── package.json             # Node.js configuration
├── .runsettings            # .NET test configuration
├── README.md               # Project documentation
└── .gitignore              # Configuration for both Node.js and .NET
```

## Common Development Tasks

### Working with Blazor
1. **Create a new Blazor component:**
   ```bash
   dotnet new razorcomponent -n ComponentName -o ./Blazor/Dashboard.Blazor/Components
   ```

2. **Add a NuGet package:**
   ```bash
   dotnet add ./Blazor/Dashboard.Blazor package PackageName
   ```

3. **Run Blazor tests:**
   ```bash
   dotnet test ./Blazor/Dashboard.Blazor.Tests
   ```

### Environment Considerations
- Node.js, npm, and .NET SDK are pre-installed and working
- No firewall restrictions on npm registry or NuGet
- Git is configured and functional
- Standard development tools available

## Time Expectations

- **npm operations:** Same as before
- **dotnet restore:** 5-30 seconds
- **dotnet build:** 10-60 seconds
- **dotnet test:** 30+ seconds (more with code coverage)
- **dotnet run:** 5-15 seconds to start

**CRITICAL: NEVER CANCEL operations. Always use generous timeouts and wait for completion.**

## Current Configuration

1. **Blazor Components** - Located in the Blazor directory
2. **Test Configuration** - Defined in .runsettings with code coverage settings
3. **Code Coverage** - Configured to analyze Blazor code and exclude tests
4. **Test Output** - Configured for console, trx, and html formats

## Next Steps for Development

When continuing development:
1. Ensure Blazor components follow the structure defined in existing code
2. Keep test coverage high by adding tests for new components
3. Configure CI/CD to run both Node.js and .NET tests
4. Consider adding cross-platform testing with Playwright as configured in .runsettings
5. Document any additional setup requirements specific to the project

**Remember: This repository now combines Node.js and .NET/Blazor technologies. All development tooling and patterns should respect the multi-technology approach of the project.**