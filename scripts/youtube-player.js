// YouTube Player Integration
// Handles YouTube music playback and search

class YouTubePlayer {
  constructor(config) {
    this.config = config;
    this.player = null;
    this.isReady = false;
    this.currentVideoId = null;
    this.onStateChange = null;
    this.onTimeUpdate = null;
    this.onError = null;
    this.updateInterval = null;
  }

  // Initialize YouTube IFrame API
  init(containerId = 'youtube-player') {
    return new Promise((resolve, reject) => {
      // Load YouTube IFrame API if not already loaded
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Wait for API to load
        window.onYouTubeIframeAPIReady = () => {
          this.createPlayer(containerId, resolve, reject);
        };
      } else {
        this.createPlayer(containerId, resolve, reject);
      }
    });
  }

  // Create YouTube player
  createPlayer(containerId, resolve, reject) {
    try {
      this.player = new YT.Player(containerId, {
        height: '0',
        width: '0',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            this.isReady = true;
            console.log('YouTube Player ready');
            resolve(event);
          },
          onStateChange: (event) => {
            this.handleStateChange(event);
          },
          onError: (event) => {
            this.handleError(event);
            if (reject) reject(event);
          }
        }
      });
    } catch (error) {
      console.error('Error creating YouTube player:', error);
      if (reject) reject(error);
    }
  }

  // Handle player state changes
  handleStateChange(event) {
    const states = {
      '-1': 'unstarted',
      '0': 'ended',
      '1': 'playing',
      '2': 'paused',
      '3': 'buffering',
      '5': 'cued'
    };

    const state = states[event.data];
    console.log('YouTube Player State:', state);

    if (this.onStateChange) {
      this.onStateChange(state, event);
    }

    // Start time update interval when playing
    if (state === 'playing') {
      this.startTimeUpdate();
    } else {
      this.stopTimeUpdate();
    }

    // Handle ended
    if (state === 'ended' && this.onStateChange) {
      this.onStateChange('ended', event);
    }
  }

  // Handle player errors
  handleError(event) {
    const errors = {
      2: 'Invalid video ID',
      5: 'HTML5 player error',
      100: 'Video not found or private',
      101: 'Video not embeddable',
      150: 'Video not embeddable'
    };

    const errorMessage = errors[event.data] || 'Unknown error';
    console.error('YouTube Player Error:', errorMessage);

    if (this.onError) {
      this.onError(errorMessage, event);
    }
  }

  // Start time update interval
  startTimeUpdate() {
    this.stopTimeUpdate();
    this.updateInterval = setInterval(() => {
      if (this.player && this.onTimeUpdate) {
        const currentTime = this.player.getCurrentTime();
        const duration = this.player.getDuration();
        this.onTimeUpdate(currentTime, duration);
      }
    }, 500); // Update every 500ms
  }

  // Stop time update interval
  stopTimeUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  // Search for videos
  async search(query, maxResults = 20) {
    const apiKey = this.config.apiKey;
    if (!apiKey || apiKey === 'YOUR_YOUTUBE_API_KEY') {
      throw new Error('YouTube API key not configured. Get one at: https://console.cloud.google.com/apis/credentials');
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Transform results to match our track format
      return data.items.map(item => ({
        id: item.id.videoId,
        name: item.snippet.title,
        artist: item.snippet.channelTitle,
        cover: item.snippet.thumbnails.high.url,
        source: 'youtube',
        videoId: item.id.videoId,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        favorited: false
      }));
    } catch (error) {
      console.error('YouTube search error:', error);
      throw error;
    }
  }

  // Load and play a video
  play(videoId) {
    if (!this.isReady) {
      console.error('YouTube player not ready');
      return;
    }

    if (this.currentVideoId !== videoId) {
      this.currentVideoId = videoId;
      this.player.loadVideoById(videoId);
    } else {
      this.player.playVideo();
    }
  }

  // Pause playback
  pause() {
    if (this.isReady && this.player) {
      this.player.pauseVideo();
    }
  }

  // Stop playback
  stop() {
    if (this.isReady && this.player) {
      this.player.stopVideo();
      this.stopTimeUpdate();
    }
  }

  // Seek to position (in seconds)
  seekTo(seconds) {
    if (this.isReady && this.player) {
      this.player.seekTo(seconds, true);
    }
  }

  // Set volume (0-100)
  setVolume(volume) {
    if (this.isReady && this.player) {
      this.player.setVolume(volume);
    }
  }

  // Mute
  mute() {
    if (this.isReady && this.player) {
      this.player.mute();
    }
  }

  // Unmute
  unmute() {
    if (this.isReady && this.player) {
      this.player.unMute();
    }
  }

  // Get current time
  getCurrentTime() {
    if (this.isReady && this.player) {
      return this.player.getCurrentTime();
    }
    return 0;
  }

  // Get duration
  getDuration() {
    if (this.isReady && this.player) {
      return this.player.getDuration();
    }
    return 0;
  }

  // Get current state
  getState() {
    if (this.isReady && this.player) {
      const state = this.player.getPlayerState();
      const states = {
        '-1': 'unstarted',
        '0': 'ended',
        '1': 'playing',
        '2': 'paused',
        '3': 'buffering',
        '5': 'cued'
      };
      return states[state] || 'unknown';
    }
    return 'not-ready';
  }

  // Check if playing
  isPlaying() {
    return this.getState() === 'playing';
  }

  // Destroy player
  destroy() {
    this.stopTimeUpdate();
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
    this.isReady = false;
    this.currentVideoId = null;
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = YouTubePlayer;
}
