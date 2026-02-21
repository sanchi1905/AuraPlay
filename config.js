// API Configuration
// Get your API keys from:
// - YouTube: https://console.cloud.google.com/apis/credentials
// - SoundCloud: https://soundcloud.com/you/apps

const API_CONFIG = {
  // YouTube Configuration
  youtube: {
    apiKey: 'AIzaSyBPS1TjvKqnTbgFY0meK787ZQpZfnk7W5I', // Get from: https://console.cloud.google.com/apis/credentials
    maxResults: 20
  },

  // SoundCloud Configuration
  soundcloud: {
    clientId: 'KMZaPoaww4sjEQKIPp4BcFr8rSijimjq',
    clientSecret: 'ZhEz6X5ZuiiMBJvcZ039Juc9HjPPolrj' // Keep secure!
  }
};

// Check if running in development or production
const IS_DEVELOPMENT = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}
