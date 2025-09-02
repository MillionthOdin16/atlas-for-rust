# Atlas for Rust - Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview

Atlas for Rust is a Vue.js + Electron desktop application that provides an interactive map experience for the Rust game. It communicates with Rust servers using the same websocket protocol as the official Rust+ Companion app.

**Technology Stack:**
- Vue.js 2.6 with vue-cli-service
- Electron 11 for desktop app packaging  
- Tailwind CSS for styling
- Leaflet maps for interactive mapping
- Node.js (originally built for v15, requires compatibility workarounds for v20+)

## Critical Setup Requirements

**NEVER use default Node.js commands** - This project requires the legacy OpenSSL provider for Node.js 20+:

```bash
# ALWAYS use this prefix for all npm commands
NODE_OPTIONS=--openssl-legacy-provider
```

## Working Effectively

### Initial Setup and Dependencies
```bash
# Install dependencies - NEVER CANCEL: Takes 75 seconds (first time) or 15 seconds (cached)
npm install  # timeout: 120+ seconds
```

### Development Server (Web Version)
```bash
# Start Vue.js development server
NODE_OPTIONS=--openssl-legacy-provider npm run serve
# Runs on http://localhost:8080/
# Starts in ~10 seconds, NEVER CANCEL before server is ready
```

### Production Build (Web Version)  
```bash
# Build web version - NEVER CANCEL: Takes ~13 seconds
NODE_OPTIONS=--openssl-legacy-provider npm run build  # timeout: 60+ seconds
# Output: ./dist/ directory
```

### Electron Development
```bash
# Run Electron app in development mode - NEVER CANCEL: Takes ~20 seconds to launch
NODE_OPTIONS=--openssl-legacy-provider npm run electron:serve  # timeout: 120+ seconds
# Launches Electron desktop app with hot reload
```

### Electron Production Build
**WARNING**: Electron production builds (`npm run electron:build`) fail on Node.js 20+ due to compatibility issues. The GitHub Actions CI uses Node.js 15 with Wine to build Windows executables. Do not attempt electron builds in Node.js 20+ environments - document this limitation instead.

## Validation and Testing

**CRITICAL**: This project has NO formal test suite. All validation is manual through running the application.

### Required Manual Validation Steps
Always perform these validation steps after making changes:

1. **Install and Build Validation:**
   ```bash
   npm install  # Wait full 75+ seconds (first time) or 15+ seconds (cached)
   NODE_OPTIONS=--openssl-legacy-provider npm run build  # Wait full 13+ seconds
   ```

2. **Application Start Validation:**
   ```bash
   NODE_OPTIONS=--openssl-legacy-provider npm run serve
   # Navigate to http://localhost:8080/
   # Verify welcome screen loads with "Welcome to Atlas for Rust" 
   # Verify "Connect with Rust+" button is visible and clickable
   # Verify Atlas logo and "Developed with ❤️ by Liam Cottle" footer appear
   ```

3. **Electron Validation:**
   ```bash
   NODE_OPTIONS=--openssl-legacy-provider npm run electron:serve
   # Verify Electron window opens showing the same welcome screen
   # Verify window can be resized and closed properly
   ```

4. **UI Interaction Validation:**
   - Click the "Connect with Rust+" button to verify it responds
   - Verify no console errors appear during normal operation
   - Test that the interface loads all visual elements correctly

### No Linting Available
This project does not have ESLint, Prettier, or other code linting tools configured. Code quality validation is manual only.

## Asset Management

### Updating Rust Game Assets
```bash
# Update assets from Rust game installation (Windows only)
node update_assets.js "<drive>:\SteamLibrary\steamapps\common\Rust"
# This updates ./src/items.json and ./public/images/items/
```

## Project Structure and Navigation

### Key Directories
- `./src/` - Vue.js application source code
- `./src/components/` - Vue components (ConnectRustPlus.vue, RustPlus.vue, etc.)
- `./src/background.js` - Electron main process code
- `./public/` - Static assets including large Rust game image assets
- `./public/images/items/` - Rust game item images (600+ PNG files)
- `./tools/RustAssetManager.js` - Asset synchronization utility
- `./.github/workflows/build.yml` - CI/CD that builds Windows executables

### Important Files
- `./src/App.vue` - Main Vue application component
- `./src/main.js` - Vue application entry point
- `./src/preload.js` - Electron preload script
- `./vue.config.js` - Vue CLI and Electron builder configuration
- `./package.json` - Project dependencies and scripts

## Common Issues and Workarounds

### Node.js Compatibility
- **Problem**: Default npm commands fail with "digital envelope routines::unsupported" 
- **Solution**: Always use `NODE_OPTIONS=--openssl-legacy-provider` prefix

### Build Warnings
- **Expected**: Large asset size warnings (many 200KB+ game images)
- **Expected**: Browserslist outdated warnings (harmless)
- **Action**: These warnings are normal, do not attempt to fix

### Electron Build Failures
- **Problem**: `npm run electron:build` fails on Node.js 20+
- **Solution**: This is expected. Document that Electron builds require Node.js 15 environment (use CI for releases)

## CI/CD Pipeline
GitHub Actions automatically builds Windows executables on tagged releases using:
- Node.js 15 (not 20+)  
- Wine for cross-platform Windows builds
- Builds take ~5 minutes in CI environment

## Timing Expectations

| Command | Expected Time | Timeout Setting |
|---------|---------------|-----------------|
| `npm install` (first time) | 75 seconds | 120+ seconds |
| `npm install` (cached) | 15 seconds | 120+ seconds |
| `npm run serve` (startup) | 10 seconds | 60+ seconds |
| `npm run build` | 13 seconds | 60+ seconds |
| `npm run electron:serve` (launch) | 20 seconds | 120+ seconds |

**NEVER CANCEL** any of these operations before the specified timeout periods.