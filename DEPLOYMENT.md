# Deploying the Reward SDK

This guide explains how to deploy the Reward SDK for both npm package distribution and CDN access.

## Building the SDK

The SDK supports three build formats:

- **ESM** (ECMAScript Modules) for modern React applications
- **CJS** (CommonJS) for Node.js and older React applications
- **UMD** (Universal Module Definition) for direct browser usage via CDN

### Build Command

Run the following command to build all formats:

```bash
npm run build
```

This will create the following directory structure in the `dist` directory:

- `dist/esm/reward-sdk.js` - ES module format
- `dist/cjs/reward-sdk.js` - CommonJS format
- `dist/umd/reward-sdk.js` - UMD format (for CDN use)

## Option 1: Deploying as NPM Package

### 1. Update package.json

Ensure your package.json has the correct configuration:

```json
{
  "name": "reward-sdk",
  "version": "1.0.0",
  "main": "dist/cjs/reward-sdk.js",
  "module": "dist/esm/reward-sdk.js",
  "unpkg": "dist/umd/reward-sdk.js",
  "jsdelivr": "dist/umd/reward-sdk.js",
  "exports": {
    ".": {
      "import": "./dist/esm/reward-sdk.js",
      "require": "./dist/cjs/reward-sdk.js",
      "browser": "./dist/umd/reward-sdk.js",
      "default": "./dist/esm/reward-sdk.js"
    }
  }
}
```

### 2. Publish to NPM

```bash
# Login to npm
npm login

# Publish package
npm publish
```

## Option 2: Deploying to CDN via GitHub

### 1. Create a GitHub Repository

```bash
# Initialize the repository locally
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/reward-sdk.git
git push -u origin main
```

### 2. Release a Version

```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

### 3. Access via CDN

Once deployed to GitHub, the SDK can be accessed via CDN:

#### jsDelivr (preferred)

```html
<!-- UMD build -->
<script src="https://cdn.jsdelivr.net/gh/Amgad012/reward-sdk@v1.0.0/dist/umd/reward-sdk.js"></script>
```

#### Unpkg Alternative

```html
<!-- UMD build -->
<script src="https://unpkg.com/reward-sdk@1.0.0/dist/umd/reward-sdk.js"></script>
```

## Usage After Deployment

### In React Applications (via NPM)

```jsx
// ESM import (recommended for modern applications)
import RewardSdk from "reward-sdk";

// CommonJS import (for older applications)
const { RewardSdk } = require("reward-sdk");

function App() {
  return (
    <RewardSdk
      apiKey="your-api-key"
      onRewardGranted={() => console.log("Reward granted!")}
    />
  );
}
```

### In Browser (via CDN)

```html
<!-- Load dependencies -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Load SDK -->
<script src="https://cdn.jsdelivr.net/gh/yourusername/reward-sdk@v1.0.0/dist/umd/reward-sdk.js"></script>

<script>
  // Access via global variable
  const { RewardSdk } = window;

  // Use with React
  ReactDOM.render(
    React.createElement(RewardSdk, {
      apiKey: "your-api-key",
      onRewardGranted: () => console.log("Reward granted!"),
    }),
    document.getElementById("reward-container")
  );
</script>
```

```

2. Or create a release on GitHub:
- Go to your repository on GitHub
- Click on "Releases"
- Click on "Create a new release"
- Enter the tag version (e.g., "v1.0.0")
- Upload the `dist/reward-sdk.umd.js` file as `reward-sdk.min.js`
- Publish the release

## Step 4: Access the SDK via jsDelivr

The SDK can now be accessed via jsDelivr using the following URL:

```

https://cdn.jsdelivr.net/gh/Amgad012/reward-sdk@v1.0.0/dist/umd/reward-sdk.js

````

Replace `yourusername` with your GitHub username and `1.0.0` with the version tag.

## Step 5: Integrate the SDK into a React Application

### Option 1: Using CDN

Add the following to your HTML file:

```html
<!-- Load React and ReactDOM from CDN if not already included -->
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
></script>

<!-- Load the Reward SDK from CDN -->
<script src="https://cdn.jsdelivr.net/gh/Amgad012/reward-sdk@v1.0.0/dist/umd/reward-sdk.js"></script>
````

Then in your JavaScript:

```javascript
// Access the SDK via window.RewardSdk
const SdkComponent = window.RewardSdk;

// Use it in your React component
ReactDOM.render(
  <SdkComponent
    apiKey="your-api-key"
    onRewardGranted={() => console.log("Reward granted!")}
    onClose={() => console.log("SDK closed")}
  />,
  document.getElementById("root")
);
```

### Option 2: Using npm

If you've published the SDK to npm, you can install and use it like any other package:

```bash
npm install reward-sdk
```

Then in your React component:

```javascript
import RewardSdk from "reward-sdk";

function App() {
  return (
    <RewardSdk
      apiKey="your-api-key"
      onRewardGranted={() => console.log("Reward granted!")}
      onClose={() => console.log("SDK closed")}
    />
  );
}
```

## Updating the SDK

When you make changes to the SDK:

1. Build the SDK: `npm run build`
2. Update the version in `package.json`
3. Commit and push the changes
4. Create a new tag or release
5. Update the CDN URL in your applications to point to the new version
