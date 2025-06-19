import React from 'react';
import RewardSdk from "./RewardSdk";

// Export the RewardSdk component as default export for ESM/CJS usage
export default RewardSdk;

// Also expose individual named exports
export { RewardSdk };

// Auto-initialize the SDK for UMD/CDN builds
// This will expose the SDK as a global variable (window.RewardSdk)
if (typeof window !== 'undefined') {
  // Ensure we don't overwrite existing global
  if (!window.RewardSdk) {
    window.RewardSdk = RewardSdk;
  }
}

/**
 * SDK Usage Examples:
 *
 * 1. Via Import in React apps (ESM):
 *    import RewardSdk from 'reward-sdk';
 *    
 *    function App() {
 *      return (
 *        <RewardSdk 
 *          apiKey="your-api-key" 
 *          onRewardGranted={() => console.log('Reward granted!')} 
 *        />
 *      );
 *    }
 *
 * 2. Via Import in CommonJS environments:
 *    const { RewardSdk } = require('reward-sdk');
 *
 * 3. Via CDN (UMD): *    <script src="https://cdn.jsdelivr.net/npm/reward-sdk/dist/umd/reward-sdk.js"></script>
 *    <script>
 *      // Then access it via window.RewardSdk
 *      const sdk = window.RewardSdk;
 *      // Use it with React
 *      ReactDOM.render(
 *        React.createElement(sdk, {
 *          apiKey: "your-api-key",
 *          onRewardGranted: () => console.log('Reward granted!')
 *        }),
 *        document.getElementById('reward-container')
 *      );
 *    </script>
 */
