# Reward SDK

## Overview

The Reward SDK is a React component library that allows integration of a reward system into your web application. It can be used in React applications via npm or as a UMD build via CDN in any web application.

## Installation

The SDK supports three build formats:

- **ESM** (ECMAScript Modules) for modern React applications
- **CJS** (CommonJS) for Node.js and older React applications
- **UMD** (Universal Module Definition) for direct browser usage via CDN

### Option 1: NPM Package for React Applications

```bash
npm install reward-sdk
# or
yarn add reward-sdk
```

#### Import in modern React applications (ESM):

```jsx
import RewardSdk from "reward-sdk";

function App() {
  return (
    <RewardSdk
      apiKey="your-api-key-here"
      onRewardGranted={() => console.log("Reward granted!")}
    />
  );
}
```

#### Import in CommonJS environments:

```javascript
const { RewardSdk } = require("reward-sdk");
```

### Option 2: CDN Integration (UMD)

Include the SDK directly via CDN for non-React applications or when you want to load it directly in the browser:

```html
<!-- Load React and ReactDOM from CDN -->
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
></script>

<!-- Load the Reward SDK from CDN (GitHub) -->
<script src="https://cdn.jsdelivr.net/gh/Amgad012/reward-sdk@v1.0.0/dist/umd/reward-sdk.js"></script>

<!-- Alternative: Load from npm CDN -->
<!-- <script src="https://cdn.jsdelivr.net/npm/reward-sdk/dist/umd/reward-sdk.js"></script> -->
```

Then use it in your HTML:

```html
<div id="sdk-container"></div>

<script>
  const rootElement = document.getElementById("sdk-container");
  const root = ReactDOM.createRoot(rootElement);

  // Render the SDK component
  root.render(
    React.createElement(window.RewardSdk, {
      apiKey: "your-api-key-here",
      onRewardGranted: () => console.log("Reward granted!"),
      onClose: () => console.log("SDK closed"),
    })
  );
</script>
```

## Usage

### Basic React Integration

```jsx
import React from "react";
import RewardSdk from "reward-sdk";

function MyRewardPage() {
  const handleRewardGranted = () => {
    // Called when the user completes all tasks and earns a reward
    console.log("User earned a reward!");
    // Increment counter, navigate, or perform other actions
  };

  const handleClose = () => {
    // Called when the user clicks the close button
    console.log("User closed the SDK");
    // Navigate away or perform other actions
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <RewardSdk
        apiKey="your-api-key"
        onRewardGranted={handleRewardGranted}
        onClose={handleClose}
      />
    </div>
  );
}

export default MyRewardPage;
```

### Non-React Web Applications

For traditional HTML/JS applications, you can use the UMD build:

```html
<!-- In your HTML file -->
<div id="reward-container"></div>

<script>
  // Access the SDK via the global variable
  const { RewardSdk } = window;

  // Initialize the SDK
  const container = document.getElementById("reward-container");

  ReactDOM.render(
    React.createElement(RewardSdk, {
      apiKey: "your-api-key",
      onRewardGranted: function () {
        console.log("Reward granted!");
        // Your reward logic here
      },
      onClose: function () {
        console.log("SDK closed");
        // Your close logic here
      },
    }),
    container
  );
</script>
```

## Build Commands

- `npm run build` - Build all formats (ESM, CJS, UMD)
- `npm run build:cdn` - Build all formats and copy UMD build to legacy path

export default MyRewardPage;

````

## Props

The RewardSdk component accepts the following props:

| Prop            | Type     | Required                                  | Description                                                  |
| --------------- | -------- | ----------------------------------------- | ------------------------------------------------------------ |
| apiKey          | string   | Yes* | Your API key for authentication                              |
| apiBaseUrl      | string   | Yes* | Base URL for API requests                                    |
| taskCount       | number   | No   | Number of tasks to complete before reward (defaults to env variable or 3) |
| customStyle     | object   | No   | Custom styling for the component                             |
| onRewardGranted | function | No   | Callback when a reward is granted after completing all tasks |
| onClose         | function | No   | Callback when the user clicks the close button               |

*Note: For `apiKey` and `apiBaseUrl`, these can be provided either as props or through environment variables during build time:
- `apiKey` can be set via `VITE_API_KEY` environment variable
- `apiBaseUrl` can be set via `VITE_API_BASE_URL` environment variable
- `taskCount` can be set via `VITE_TASK_COUNT` environment variable

If the environment variables are set during build, you don't need to pass these props when using the SDK. The props will override the environment values if both are provided.

## Custom Styling

You can customize the appearance of the SDK by passing a `customStyle` object:

```jsx
<RewardSdk
  apiKey="your-api-key"
  customStyle={{
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    // Add other CSS properties
  }}
  onRewardGranted={handleRewardGranted}
  onClose={handleClose}
/>
````

## Components

### RewardSdk

This is the main component that renders the reward tasks interface.

### CloseButton

A reusable close button component with a confirmation dialog. You can use this independently if needed:

```jsx
import { CloseButton } from "react-hello-sdk";

function MyComponent() {
  const handleClose = () => {
    console.log("Button clicked and confirmed");
    // Your close logic here
  };

  return (
    <div style={{ position: "relative" }}>
      <CloseButton
        onClose={handleClose}
        confirmMessage="Are you sure you want to close?"
        label="Close"
      />
      {/* Your content here */}
    </div>
  );
}
```

CloseButton Props:

| Prop           | Type     | Required | Description                                             |
| -------------- | -------- | -------- | ------------------------------------------------------- |
| onClose        | function | Yes      | Callback function called when the user confirms closing |
| confirmMessage | string   | No       | Message to display in the confirmation dialog           |
| style          | object   | No       | Additional styles to apply to the button                |
| label          | string   | No       | Button label (default is "X")                           |

## Utility Functions

The SDK also exports utility functions for session management:

```jsx
import RewardSdk, {
  updateSessionId,
  getSessionId,
  hasSessionId,
} from "react-hello-sdk";

// Check if a session exists
const sessionExists = hasSessionId();

// Get the current session ID
const currentSession = getSessionId();

// Update or clear the session ID
updateSessionId("new-session-id"); // Set new ID
updateSessionId(null); // Clear the ID
```

## Building the SDK

To build the SDK for production:

```bash
npm run build
# or
yarn build
```

## Requirements

- React 16.8+ (requires Hooks support)
- Modern browser support

## License

See the LICENSE file for details.
