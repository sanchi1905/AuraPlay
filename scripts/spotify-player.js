// Spotify Player Integration
// Handles Spotify authentication and playback
// Requires Spotify Premium account

class SpotifyPlayer {
  constructor(config) {
    this.config = config;
    this.player = null;
    this.deviceId = null;
    this.accessToken = null;
    this.isReady = false;
    this.currentTrack = null;
    this.onStateChange = null;
    this.onTimeUpdate = null;
    this.onError = null;
  }

  // Initialize Spotify Web Playback SDK
  init() {
    return new Promise((resolve, reject) => {
      // Check if user is authenticated
      this.accessToken = this.getAccessToken();
      
      if (!this.accessToken) {
        reject(new Error('Not authenticated. Please login to Spotify.'));
        return;
      }

      // Load Spotify Web Playback SDK if not already loaded
      if (!window.Spotify) {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
          this.createPlayer(resolve, reject);
        };
      } else {
        this.createPlayer(resolve, reject);
      }
    });
  }

  // Create Spotify player
  createPlayer(resolve, reject) {
    try {
      this.player = new Spotify.Player({
        name: 'Potify Music Player',
        getOAuthToken: cb => { cb(this.accessToken); },
        volume: 0.5
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Spotify Player ready with Device ID', device_id);
        this.deviceId = device_id;
        this.isReady = true;
        resolve(device_id);
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Spotify Player has gone offline', device_id);
        this.isReady = false;
      });

      // Player State Changed
      this.player.addListener('player_state_changed', state => {
        this.handleStateChange(state);
      });

      // Errors
      this.player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization Error:', message);
        if (this.onError) this.onError('Initialization Error: ' + message);
      });

      this.player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication Error:', message);
        if (this.onError) this.onError('Authentication Error: ' + message);
        // Clear invalid token
        this.clearAccessToken();
      });

      this.player.addListener('account_error', ({ message }) => {
        console.error('Account Error:', message);
        if (this.onError) this.onError('Account Error (Premium required): ' + message);
      });

      this.player.addListener('playback_error', ({ message }) => {
        console.error('Playback Error:', message);
        if (this.onError) this.onError('Playback Error: ' + message);
      });

      // Connect to the player
      this.player.connect();

    } catch (error) {
      console.error('Error creating Spotify player:', error);
      if (reject) reject(error);
    }
  }

  // Handle player state changes
  handleStateChange(state) {
    if (!state) return;

    const {
      paused,
      position,
      duration,
      track_window: { current_track }
    } = state;

    this.currentTrack = current_track;

    // Trigger callbacks
    if (this.onStateChange) {
      this.onStateChange(paused ? 'paused' : 'playing', state);
    }

    if (this.onTimeUpdate) {
      this.onTimeUpdate(position / 1000, duration / 1000);
    }

    // Check if track ended
    if (position === 0 && paused && duration > 0) {
      if (this.onStateChange) {
        this.onStateChange('ended', state);
      }
    }
  }

  // Authentication: Get authorization URL
  getAuthUrl() {
    const scopes = this.config.scopes.join('%20');
    const redirectUri = encodeURIComponent(this.config.redirectUri);
    return `https://accounts.spotify.com/authorize?client_id=${this.config.clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
  }

  // Initiate login flow
  login() {
    const authUrl = this.getAuthUrl();
    window.location.href = authUrl;
  }

  // Logout
  logout() {
    this.clearAccessToken();
    if (this.player) {
      this.player.disconnect();
    }
    this.isReady = false;
    this.accessToken = null;
  }

  // Parse access token from URL (after redirect)
  parseAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    
    if (accessToken) {
      this.saveAccessToken(accessToken);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    return accessToken;
  }

  // Save access token to localStorage
  saveAccessToken(token) {
    localStorage.setItem('spotify_access_token', token);
    localStorage.setItem('spotify_token_time', Date.now().toString());
  }

  // Get access token from localStorage
  getAccessToken() {
    const token = localStorage.getItem('spotify_access_token');
    const tokenTime = localStorage.getItem('spotify_token_time');
    
    // Check if token is expired (1 hour = 3600000 ms)
    if (token && tokenTime) {
      const elapsed = Date.now() - parseInt(tokenTime);
      if (elapsed < 3600000) {
        return token;
      } else {
        this.clearAccessToken();
      }
    }
    
    return null;
  }

  // Clear access token
  clearAccessToken() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_token_time');
  }

  // Check if authenticated
  isAuthenticated() {
    return !!this.getAccessToken();
  }

  // Search for tracks
  async search(query, maxResults = 20) {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${maxResults}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Transform results to match our track format
      return data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        cover: track.album.images[0]?.url || './img/default.jpg',
        source: 'spotify',
        uri: track.uri,
        url: track.external_urls.spotify,
        duration: track.duration_ms / 1000,
        favorited: false
      }));
    } catch (error) {
      console.error('Spotify search error:', error);
      throw error;
    }
  }

  // Play a track
  async play(trackUri) {
    if (!this.isReady) {
      throw new Error('Spotify player not ready');
    }

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify({
          uris: [trackUri]
        })
      });
    } catch (error) {
      console.error('Spotify play error:', error);
      throw error;
    }
  }

  // Pause playback
  pause() {
    if (this.player) {
      this.player.pause();
    }
  }

  // Resume playback
  resume() {
    if (this.player) {
      this.player.resume();
    }
  }

  // Toggle play/pause
  togglePlay() {
    if (this.player) {
      this.player.togglePlay();
    }
  }

  // Seek to position (in seconds)
  async seekTo(seconds) {
    if (!this.isReady) return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${Math.floor(seconds * 1000)}&device_id=${this.deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
    } catch (error) {
      console.error('Spotify seek error:', error);
    }
  }

  // Set volume (0-1)
  setVolume(volume) {
    if (this.player) {
      this.player.setVolume(volume);
    }
  }

  // Get current state
  async getState() {
    if (this.player) {
      return await this.player.getCurrentState();
    }
    return null;
  }

  // Destroy player
  destroy() {
    if (this.player) {
      this.player.disconnect();
      this.player = null;
    }
    this.isReady = false;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpotifyPlayer;
}
