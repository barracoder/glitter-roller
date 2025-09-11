# Glitter Roller

Glitter Roller is currently an empty repository prepared for Node.js development. The repository contains only basic setup files and is ready for initial project development.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Repository State

This repository is essentially a blank slate with:
- README.md with basic project title
- .gitignore configured for Node.js development
- No package.json, source code, or build configuration
- No CI/CD pipelines or workflows
- No dependencies or build tools configured

## Working Effectively

### Prerequisites
The development environment comes pre-configured with:
- Node.js v20.19.5
- npm v10.8.2  
- git v2.51.0
- curl and other standard Linux tools

### Initial Project Setup
When starting development in this repository:

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

### Build and Test Commands

Since this is an empty repository, there are no build or test commands yet. When code is added:

1. **Always validate any new package.json scripts before documenting them**
2. **Test all build commands with adequate timeouts:**
   - Set timeout to 300+ seconds for build commands
   - Set timeout to 180+ seconds for test commands
   - NEVER CANCEL builds or tests prematurely

3. **Common Node.js patterns to validate:**
   ```bash
   # If package.json has build script
   npm run build
   
   # If package.json has test script  
   npm test
   
   # If package.json has start script
   npm start
   
   # If package.json has dev script
   npm run dev
   ```

## Validation Requirements

### Before Adding New Code
1. **Always run npm install after adding dependencies**
2. **Validate all new scripts work correctly**
3. **Test with realistic timeouts (never use default short timeouts)**

### Testing New Features
Since there's no application yet, validation steps will depend on what's built:

1. **For CLI applications:** Test with `--help` and sample inputs
2. **For web applications:** Verify server starts and basic routes work
3. **For libraries:** Run test suites and verify exports

### Quality Assurance
When linting/formatting tools are added:
```bash
# Always run before committing
npm run lint    # if lint script exists
npm run format  # if format script exists
npm run test    # if test script exists
```

## Repository Structure

Currently minimal, but when development begins, follow these patterns:

```
glitter-roller/
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/           # CI/CD when added
├── src/                     # Source code
├── test/ or tests/          # Test files
├── docs/                    # Documentation
├── package.json             # Node.js configuration
├── README.md               # Project documentation
└── .gitignore              # Already configured
```

## Common Development Tasks

### Starting a New Node.js Project
1. `npm init -y` - Initialize package.json
2. Create src/ directory for source code
3. Add appropriate dependencies
4. Set up build and test scripts
5. Configure linting and formatting

### Adding Dependencies
- **Production:** `npm install package-name`
- **Development:** `npm install --save-dev package-name`
- **Global tools:** `npm install -g package-name` (avoid when possible)

### Environment Considerations
- Node.js and npm are pre-installed and working
- No firewall restrictions on npm registry
- Git is configured and functional
- Standard Linux development tools available

## Time Expectations

- **npm init:** 1-2 seconds
- **npm install (empty project):** 5-10 seconds  
- **npm install (with dependencies):** 10-60 seconds
- **Build commands:** Variable (allow 5+ minutes)
- **Test suites:** Variable (allow 3+ minutes)

**CRITICAL: NEVER CANCEL operations. Always use generous timeouts and wait for completion.**

## Current Limitations

1. **No application code exists** - this is a fresh repository
2. **No build system configured** - needs to be set up based on project needs
3. **No testing framework** - choose based on project requirements
4. **No CI/CD pipelines** - GitHub Actions workflows need to be created

## Next Steps for Development

When beginning development:
1. Define project purpose and update README.md
2. Initialize package.json with `npm init`
3. Set up basic project structure (src/, test/, etc.)
4. Choose and configure build tools (TypeScript, bundlers, etc.)
5. Set up testing framework (Jest, Mocha, etc.)
6. Configure linting and formatting (ESLint, Prettier)
7. Create GitHub Actions workflow for CI/CD
8. Update these instructions with project-specific guidance

**Remember: This repository is a blank slate. All development tooling and patterns will need to be established based on the specific project requirements.**