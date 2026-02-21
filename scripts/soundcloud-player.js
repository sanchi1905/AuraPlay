// SoundCloud Player Integration
// Handles SoundCloud track playback and search

class SoundCloudPlayer {
  constructor(config) {
    this.config = config;
    this.widget = null;
    this.isReady = false;
    this.currentTrack = null;
    this.onStateChange = null;
    this.onTimeUpdate = null;
    this.onError = null;
    this.updateInterval = null;
  }

  // Initialize SoundCloud Widget API
  init(containerId = 'soundcloud-player') {
    return new Promise((resolve, reject) => {
      // Load SoundCloud Widget API if not already loaded
      if (!window.SC) {
        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.onload = () => {
          this.createWidget(containerId, resolve, reject);
        };
        script.onerror = (error) => {
          reject(new Error('Failed to load SoundCloud API'));
        };
        document.body.appendChild(script);
      } else {
        this.createWidget(containerId, resolve, reject);
      }
    });
  }

  // Create SoundCloud widget
  createWidget(containerId, resolve, reject) {
    try {
      const iframe = document.getElementById(containerId);
      if (!iframe) {
        reject(new Error(`Container ${containerId} not found`));
        return;
      }

      this.widget = SC.Widget(iframe);

      // Bind events
      this.widget.bind(SC.Widget.Events.READY, () => {
        console.log('SoundCloud Widget ready');
        this.isReady = true;
        resolve();
      });

      this.widget.bind(SC.Widget.Events.PLAY, () => {
        console.log('SoundCloud playing');
        if (this.onStateChange) {
          this.onStateChange('playing');
        }
        this.startTimeUpdate();
      });

      this.widget.bind(SC.Widget.Events.PAUSE, () => {
        console.log('SoundCloud paused');
        if (this.onStateChange) {
          this.onStateChange('paused');
        }
        this.stopTimeUpdate();
      });

      this.widget.bind(SC.Widget.Events.FINISH, () => {
        console.log('SoundCloud finished');
        if (this.onStateChange) {
          this.onStateChange('ended');
        }
        this.stopTimeUpdate();
      });

      this.widget.bind(SC.Widget.Events.ERROR, (error) => {
        console.error('SoundCloud error:', error);
        if (this.onError) {
          this.onError('Playback error', error);
        }
      });

    } catch (error) {
      console.error('Error creating SoundCloud widget:', error);
      if (reject) reject(error);
    }
  }

  // Start time update interval
  startTimeUpdate() {
    this.stopTimeUpdate();
    this.updateInterval = setInterval(() => {
      if (this.widget && this.onTimeUpdate) {
        this.widget.getPosition(position => {
          this.widget.getDuration(duration => {
            this.onTimeUpdate(position / 1000, duration / 1000);
          });
        });
      }
    }, 500);
  }

  // Stop time update interval
  stopTimeUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  // Search for tracks using SoundCloud API v2
  async search(query, maxResults = 20) {
    const clientId = this.config.clientId;
    if (!clientId || clientId === 'YOUR_SOUNDCLOUD_CLIENT_ID') {
      throw new Error('SoundCloud Client ID not configured. Get one at: https://soundcloud.com/you/apps');
    }

    // Try using the v2 API endpoint which may still work
    const url = `https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(query)}&limit=${maxResults}&client_id=${clientId}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        // If API fails, provide helpful message
        if (response.status === 401 || response.status === 403) {
          throw new Error('SoundCloud API authentication failed. The API key may be invalid or expired.');
        }
        throw new Error(`SoundCloud API error: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.error) {
        throw new Error(data.errors ? data.errors[0].error_message : 'Search failed');
      }

      // V2 API returns collection
      const tracks = data.collection || data;
      
      // Filter streamable tracks only
      const streamableTracks = Array.isArray(tracks) ? tracks.filter(track => track.streamable) : [];

      if (streamableTracks.length === 0) {
        throw new Error('No streamable tracks found. Try a different search term.');
      }

      // Transform results to match our track format
      return streamableTracks.map(track => ({
        id: track.id,
        name: track.title,
        artist: track.user.username,
        cover: track.artwork_url ? track.artwork_url.replace('large', 't500x500') : './img/default.jpg',
        source: 'soundcloud',
        permalink: track.permalink_url,
        url: track.permalink_url,
        duration: track.duration / 1000,
        waveform: track.waveform_url,
        favorited: false
      }));
    } catch (error) {
      console.error('SoundCloud search error:', error);
      throw new Error(error.message || 'SoundCloud search failed. Please try again or use a different search term.');
    }
  }

  // Load and play a track by URL
  load(trackUrl) {
    if (!this.isReady) {
      console.error('SoundCloud widget not ready');
      return;
    }

    this.widget.load(trackUrl, {
      auto_play: true,
      buying: false,
      sharing: false,
      download: false,
      show_artwork: false,
      show_playcount: false
    });

    this.currentTrack = trackUrl;
  }

  // Play
  play() {
    if (this.isReady && this.widget) {
      this.widget.play();
    }
  }

  // Pause
  pause() {
    if (this.isReady && this.widget) {
      this.widget.pause();
    }
  }

  // Toggle play/pause
  toggle() {
    if (this.isReady && this.widget) {
      this.widget.toggle();
    }
  }

  // Seek to position (in seconds)
  seekTo(seconds) {
    if (this.isReady && this.widget) {
      this.widget.seekTo(seconds * 1000);
    }
  }

  // Set volume (0-100)
  setVolume(volume) {
    if (this.isReady && this.widget) {
      this.widget.setVolume(volume);
    }
  }

  // Get current position (returns promise)
  getPosition() {
    return new Promise((resolve) => {
      if (this.isReady && this.widget) {
        this.widget.getPosition(position => {
          resolve(position / 1000);
        });
      } else {
        resolve(0);
      }
    });
  }

  // Get duration (returns promise)
  getDuration() {
    return new Promise((resolve) => {
      if (this.isReady && this.widget) {
        this.widget.getDuration(duration => {
          resolve(duration / 1000);
        });
      } else {
        resolve(0);
      }
    });
  }

  // Check if playing
  async isPlaying() {
    return new Promise((resolve) => {
      if (this.isReady && this.widget) {
        this.widget.isPaused(isPaused => {
          resolve(!isPaused);
        });
      } else {
        resolve(false);
      }
    });
  }

  // Get current track info
  async getCurrentTrack() {
    return new Promise((resolve) => {
      if (this.isReady && this.widget) {
        this.widget.getCurrentSound(sound => {
          resolve(sound);
        });
      } else {
        resolve(null);
      }
    });
  }

  // Destroy widget
  destroy() {
    this.stopTimeUpdate();
    if (this.widget) {
      this.widget.pause();
    }
    this.isReady = false;
    this.currentTrack = null;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SoundCloudPlayer;
}
