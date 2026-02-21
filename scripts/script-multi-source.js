new Vue({
  el: "#app",
  data() {
    return {
      // Audio players
      audio: null,
      youtubePlayer: null,
      soundcloudPlayer: null,
      
      // Current source
      currentSource: 'local', // 'local', 'youtube', 'soundcloud'
      
      // Search
      searchQuery: '',
      searchResults: [],
      isSearching: false,
      hasSearched: false,
      
      // Playback UI state
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      isLoading: false,
      volume: 100,
      isMuted: false,
      previousVolume: 100,
      isShuffled: false,
      repeatMode: 'none', // 'none', 'all', 'one'
      originalTracks: [],
      showQueue: false,
      toast: {
        show: false,
        message: '',
        type: 'info', // 'success', 'info', 'warning', 'error'
        icon: 'info'
      },
      tracks: [
        {
          name: "Kill This Love 💔",
          artist: "BlackPink",
          cover: "./img/1.jpg",
          source: "./mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=2S24-y0Ij3Y&ab_channel=BLACKPINK",
          favorited: false,
          sourceType: 'local'
        },
        {
          name: "DDU DU DDU DU 🔫 ",
          artist: "BlackPink",
          cover: "./img/2.jpeg",
          source: "./mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=IHNzOHi8sJs&ab_channel=BLACKPINK",
          favorited: true,
          sourceType: 'local'
        },
        {
          name: "Lovesick Girls",
          artist: "BlackPink",
          cover: "./img/3.jpeg",
          source: "./mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=dyRsYk0LyA8&ab_channel=BLACKPINK",
          favorited: false,
          sourceType: 'local'
        },
        {
          name: "Playing With Fire 🔥",
          artist: "BlackPink",
          cover: "./img/4.jpeg",
          source: "./mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=9pdj4iJD08s&ab_channel=BLACKPINK",
          favorited: false,
          sourceType: 'local'
        },
        {
          name: "As If It's Your Last",
          artist: "BlackPink",
          cover: "./img/5.jpeg",
          source: "./mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=Amq-qlqbjYA&ab_channel=BLACKPINK",
          favorited: true,
          sourceType: 'local'
        },
        {
          name: "Boy with Love",
          artist: "BTS",
          cover: "./img/6.jpg",
          source: "./mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=XsX3ATc3FbA&ab_channel=HYBELABELS",
          favorited: false,
          sourceType: 'local'
        },
        {
          name: "Dynamite",
          artist: "BTS",
          cover: "./img/7.jpeg",
          source: "./mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=gdZLi9oWNZg&ab_channel=HYBELABELS",
          favorited: true,
          sourceType: 'local'
        },
        {
          name: "DNA",
          artist: "BTS",
          cover: "./img/8.jpeg",
          source: "./mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS",
          favorited: false,
          sourceType: 'local'
        },
        {
          name: "Butter",
          artist: "BTS",
          cover: "./img/9.jpeg",
          source: "./mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=WMweEpGlu_U&ab_channel=HYBELABELS",
          favorited: false,
          sourceType: 'local'
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    // ====== Source Switching ======
    async switchSource(source) {
      // Validate API configuration
      if (source === 'youtube' && (!API_CONFIG.youtube.apiKey || API_CONFIG.youtube.apiKey === 'YOUR_YOUTUBE_API_KEY')) {
        this.showToast('Please configure YouTube API key in config.js', 'warning', 'warning');
        return;
      }
      
      if (source === 'soundcloud' && (!API_CONFIG.soundcloud.clientId || API_CONFIG.soundcloud.clientId === 'YOUR_SOUNDCLOUD_CLIENT_ID')) {
        this.showToast('Please configure SoundCloud Client ID in config.js', 'warning', 'warning');
        return;
      }
      
      // Pause current playback
      this.pauseCurrentPlayer();
      
      // Clear search when switching sources
      this.searchResults = [];
      this.hasSearched = false;
      this.searchQuery = '';
      
      this.currentSource = source;
      const sourceNames = {
        'local': 'Local Files',
        'youtube': 'YouTube',
        'soundcloud': 'SoundCloud'
      };
      this.showToast(`Switched to ${sourceNames[source]} 🎵`, 'success', 'check');
      this.saveToLocalStorage();
    },
    
    // ====== Search Methods ======
    async searchMusic() {
      const query = this.searchQuery.trim();
      if (!query) {
        this.showToast('Please enter a search term', 'warning', 'warning');
        return;
      }
      
      if (this.currentSource === 'local') {
        this.showToast('Search is not available for local files', 'info', 'info');
        return;
      }
      
      this.isSearching = true;
      this.hasSearched = true;
      this.searchResults = [];
      
      try {
        let results = [];
        
        switch(this.currentSource) {
          case 'youtube':
            if (!this.youtubePlayer || !this.youtubePlayer.isReady) {
              throw new Error('YouTube player not initialized. Please refresh the page.');
            }
            this.showToast('Searching YouTube...', 'info', 'search');
            results = await this.youtubePlayer.search(query);
            break;
            
          case 'soundcloud':
            if (!this.soundcloudPlayer || !this.soundcloudPlayer.isReady) {
              throw new Error('SoundCloud player not initialized. Please refresh the page.');
            }
            this.showToast('Searching SoundCloud...', 'info', 'search');
            results = await this.soundcloudPlayer.search(query);
            break;
        }
        
        this.searchResults = results;
        
        if (results.length === 0) {
          this.showToast('No results found. Try different keywords.', 'info', 'info');
        } else {
          this.showToast(`Found ${results.length} ${results.length === 1 ? 'result' : 'results'} 🎉`, 'success', 'check');
        }
      } catch (error) {
        console.error('Search error:', error);
        this.showToast(error.message || 'Search failed', 'error', 'error');
      } finally {
        this.isSearching = false;
      }
    },
    
    playFromSearch(result) {
      try {
        // Check if already in playlist
        const existingIndex = this.tracks.findIndex(t => 
          t.name === result.name && 
          t.artist === result.artist && 
          t.sourceType === result.sourceType
        );
        
        if (existingIndex >= 0) {
          // Track exists, just play it
          this.currentTrackIndex = existingIndex;
          this.currentTrack = this.tracks[existingIndex];
        } else {
          // Add to playlist
          this.tracks.push(result);
          this.currentTrackIndex = this.tracks.length - 1;
          this.currentTrack = result;
        }
        
        this.resetPlayer();
        this.isTimerPlaying = true;
        this.showToast(`Playing: ${result.name}`, 'success', 'check');
        
        // Save to localStorage
        this.saveToLocalStorage();
      } catch (error) {
        console.error('Play error:', error);
        this.showToast('Failed to play track', 'error', 'error');
      }
    },
    
    addToPlaylist(result) {
      try {
        // Check if already in playlist
        const exists = this.tracks.find(t => 
          t.name === result.name && 
          t.artist === result.artist && 
          t.sourceType === result.sourceType
        );
        
        if (exists) {
          this.showToast('✓ Already in your playlist', 'warning', 'warning');
          return;
        }
        
        this.tracks.push(result);
        this.showToast(`✓ Added "${result.name}" to playlist`, 'success', 'check');
        this.saveToLocalStorage();
      } catch (error) {
        console.error('Add to playlist error:', error);
        this.showToast('Failed to add to playlist', 'error', 'error');
      }
    },
    
    // ====== Playback Methods ======
    play() {
      const sourceType = this.currentTrack?.source || this.currentTrack?.sourceType || 'local';
      
      switch(sourceType) {
        case 'local':
          this.playLocal();
          break;
        case 'youtube':
          this.playYouTube();
          break;
        case 'soundcloud':
          this.playSoundCloud();
          break;
        default:
          this.playLocal();
      }
    },
    
    playLocal() {
      if (this.audio.paused) {
        this.audio.play().catch(error => {
          console.error('Playback failed:', error);
          this.showToast('Playback failed. Please try again.', 'error', 'error');
        });
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    
    playYouTube() {
      if (!this.youtubePlayer || !this.youtubePlayer.isReady) {
        this.showToast('YouTube player not ready. Please wait or refresh.', 'warning', 'warning');
        return;
      }
      
      try {
        if (this.youtubePlayer.isPlaying()) {
          this.youtubePlayer.pause();
          this.isTimerPlaying = false;
        } else {
          const videoId = this.currentTrack.videoId || this.currentTrack.id;
          if (videoId) {
            this.youtubePlayer.play(videoId);
            this.isTimerPlaying = true;
          } else {
            throw new Error('Invalid YouTube video ID');
          }
        }
      } catch (error) {
        console.error('YouTube playback error:', error);
        this.showToast('YouTube playback failed', 'error', 'error');
        this.isTimerPlaying = false;
      }
    },
    
    playSoundCloud() {
      if (!this.soundcloudPlayer || !this.soundcloudPlayer.isReady) {
        this.showToast('SoundCloud player not ready. Please wait.', 'warning', 'warning');
        return;
      }
      
      try {
        const trackUrl = this.currentTrack.permalink || this.currentTrack.url;
        if (trackUrl) {
          this.soundcloudPlayer.load(trackUrl);
          this.isTimerPlaying = true;
        } else {
          this.soundcloudPlayer.toggle();
        }
      } catch (error) {
        console.error('SoundCloud playback error:', error);
        this.showToast('SoundCloud playback failed', 'error', 'error');
        this.isTimerPlaying = false;
      }
    },
    
    pauseCurrentPlayer() {
      try {
        // Pause all players safely
        if (this.audio) {
          this.audio.pause();
        }
        if (this.youtubePlayer && this.youtubePlayer.isReady) {
          this.youtubePlayer.pause();
        }
        if (this.soundcloudPlayer && this.soundcloudPlayer.isReady) {
          this.soundcloudPlayer.pause();
        }
        this.isTimerPlaying = false;
      } catch (error) {
        console.error('Error pausing player:', error);
        this.isTimerPlaying = false;
      }
    },
    
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    
    updateTimeDisplay(currentSeconds, durationSeconds) {
      let width = (100 / durationSeconds) * currentSeconds;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      
      let durmin = Math.floor(durationSeconds / 60);
      let dursec = Math.floor(durationSeconds - durmin * 60);
      let curmin = Math.floor(currentSeconds / 60);
      let cursec = Math.floor(currentSeconds - curmin * 60);
      
      if (durmin < 10) durmin = "0" + durmin;
      if (dursec < 10) dursec = "0" + dursec;
      if (curmin < 10) curmin = "0" + curmin;
      if (cursec < 10) cursec = "0" + cursec;
      
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      // Use getBoundingClientRect for accurate positioning
      const rect = progress.getBoundingClientRect();
      let position = x - rect.left;
      let percentage = (100 * position) / rect.width;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    
    clickProgress(e) {
      if (!this.currentTrack) {
        return;
      }
      
      const sourceType = this.currentTrack?.source || this.currentTrack?.sourceType || 'local';
      
      try {
        let progress = this.$refs.progress;
        if (!progress) {
          console.error('Progress bar element not found');
          return;
        }
        
        // Use getBoundingClientRect for accurate click position
        const rect = progress.getBoundingClientRect();
        let position = e.clientX - rect.left;
        let percentage = (100 * position) / rect.width;
        if (percentage > 100) percentage = 100;
        if (percentage < 0) percentage = 0;
        
        switch(sourceType) {
          case 'local':
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.clientX);
            break;
            
          case 'youtube':
            if (this.youtubePlayer && this.youtubePlayer.isReady) {
              const duration = this.youtubePlayer.getDuration();
              this.youtubePlayer.seekTo((duration * percentage) / 100);
            } else {
              this.showToast('YouTube player not ready', 'warning', 'warning');
            }
            break;
            
          case 'soundcloud':
            if (this.soundcloudPlayer && this.soundcloudPlayer.isReady) {
              this.soundcloudPlayer.getDuration().then(duration => {
                this.soundcloudPlayer.seekTo((duration * percentage) / 100);
              }).catch(error => {
                console.error('SoundCloud seek error:', error);
                this.showToast('SoundCloud seek failed', 'error', 'error');
              });
            } else {
              this.showToast('SoundCloud player not ready', 'warning', 'warning');
            }
            break;
        }
      } catch (error) {
        console.error('Error seeking in track:', error);
        this.showToast('Seek failed', 'error', 'error');
      }
    },
    
    prevTrack() {
      if (this.tracks.length === 0) {
        this.showToast('No tracks in playlist', 'warning', 'warning');
        return;
      }
      
      try {
        this.transitionName = "scale-in";
        this.isShowCover = false;
        if (this.currentTrackIndex > 0) {
          this.currentTrackIndex--;
        } else {
          this.currentTrackIndex = this.tracks.length - 1;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      } catch (error) {
        console.error('Error switching to previous track:', error);
        this.showToast('Failed to load previous track', 'error', 'error');
      }
    },
    
    nextTrack() {
      if (this.tracks.length === 0) {
        this.showToast('No tracks in playlist', 'warning', 'warning');
        return;
      }
      
      try {
        this.transitionName = "scale-out";
        this.isShowCover = false;
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.currentTrackIndex++;
        } else {
          this.currentTrackIndex = 0;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      } catch (error) {
        console.error('Error switching to next track:', error);
        this.showToast('Failed to load next track', 'error', 'error');
      }
    },
    
    resetPlayer() {
      try {
        this.pauseCurrentPlayer();
        this.barWidth = 0;
        this.circleLeft = 0;
        this.isLoading = true;
        
        if (!this.currentTrack) {
          this.showToast('No track selected', 'warning', 'warning');
          this.isLoading = false;
          return;
        }
        
        const sourceType = this.currentTrack.source || this.currentTrack.sourceType || 'local';
        
        setTimeout(() => {
          try {
            switch(sourceType) {
              case 'local':
                this.audio.currentTime = 0;
                this.audio.src = this.currentTrack.source;
                if(this.isTimerPlaying) {
                  this.audio.play().catch(error => {
                    console.error('Playback failed:', error);
                    this.showToast('Failed to load track', 'error', 'error');
                    this.isLoading = false;
                  });
                } else {
                  this.isLoading = false;
                }
                break;
                
              case 'youtube':
                if (this.youtubePlayer && this.youtubePlayer.isReady) {
                  const videoId = this.currentTrack.videoId || this.currentTrack.id;
                  if (videoId) {
                    this.youtubePlayer.play(videoId);
                  } else {
                    throw new Error('No YouTube video ID');
                  }
                } else {
                  this.showToast('YouTube player not ready', 'warning', 'warning');
                }
                this.isLoading = false;
                break;
                
              case 'soundcloud':
                if (this.soundcloudPlayer && this.soundcloudPlayer.isReady) {
                  const trackUrl = this.currentTrack.permalink || this.currentTrack.url;
                  if (trackUrl) {
                    this.soundcloudPlayer.load(trackUrl);
                  } else {
                    throw new Error('No SoundCloud track URL');
                  }
                } else {
                  this.showToast('SoundCloud player not ready', 'warning', 'warning');
                }
                this.isLoading = false;
                break;
                
              default:
                this.showToast('Unknown source type', 'error', 'error');
                this.isLoading = false;
            }
          } catch (error) {
            console.error('Error in resetPlayer:', error);
            this.showToast('Failed to load track', 'error', 'error');
            this.isLoading = false;
          }
        }, 300);
      } catch (error) {
        console.error('Error resetting player:', error);
        this.showToast('Player reset failed', 'error', 'error');
        this.isLoading = false;
      }
    },
    
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[this.currentTrackIndex].favorited;
      this.saveToLocalStorage();
      const status = this.tracks[this.currentTrackIndex].favorited ? 'added to' : 'removed from';
      this.showToast(`Track ${status} favorites`, 'success', 'check');
    },
    
    changeVolume() {
      try {
        // Ensure volume is in valid range
        this.volume = Math.max(0, Math.min(100, this.volume));
        const vol = this.volume / 100;
        
        // Update all players safely
        if (this.audio) {
          this.audio.volume = vol;
        }
        if (this.youtubePlayer && this.youtubePlayer.isReady) {
          this.youtubePlayer.setVolume(this.volume);
        }
        if (this.soundcloudPlayer && this.soundcloudPlayer.isReady) {
          this.soundcloudPlayer.setVolume(this.volume);
        }
        
        this.isMuted = this.volume === 0;
        this.saveToLocalStorage();
      } catch (error) {
        console.error('Error changing volume:', error);
        this.showToast('Volume control error', 'error', 'error');
      }
    },
    
    toggleMute() {
      try {
        if (this.isMuted) {
          this.volume = this.previousVolume || 50;
          this.isMuted = false;
        } else {
          this.previousVolume = this.volume;
          this.volume = 0;
          this.isMuted = true;
        }
        
        const vol = this.volume / 100;
        
        // Update all players safely
        if (this.audio) {
          this.audio.volume = vol;
        }
        if (this.youtubePlayer && this.youtubePlayer.isReady) {
          if (this.isMuted) {
            this.youtubePlayer.mute();
          } else {
            this.youtubePlayer.unmute();
            this.youtubePlayer.setVolume(this.volume);
          }
        }
        if (this.soundcloudPlayer && this.soundcloudPlayer.isReady) {
          this.soundcloudPlayer.setVolume(this.volume);
        }
        
        this.saveToLocalStorage();
      } catch (error) {
        console.error('Error toggling mute:', error);
        this.showToast('Mute control error', 'error', 'error');
      }
    },
    
    shuffle() {
      if (this.tracks.length <= 1) {
        this.showToast('Need at least 2 tracks to shuffle', 'warning', 'warning');
        return;
      }
      
      try {
        this.isShuffled = !this.isShuffled;
        if (this.isShuffled) {
          if (this.originalTracks.length === 0) {
            this.originalTracks = [...this.tracks];
          }
          let currentSong = this.tracks[this.currentTrackIndex];
          let shuffled = [...this.tracks];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          this.tracks = shuffled;
          this.currentTrackIndex = this.tracks.findIndex(t => 
            t.name === currentSong.name && t.artist === currentSong.artist
          );
          if (this.currentTrackIndex === -1) this.currentTrackIndex = 0;
          this.showToast('🔀 Shuffle enabled', 'success', 'check');
        } else {
          let currentSong = this.tracks[this.currentTrackIndex];
          this.tracks = [...this.originalTracks];
          this.currentTrackIndex = this.tracks.findIndex(t => 
            t.name === currentSong.name && t.artist === currentSong.artist
          );
          if (this.currentTrackIndex === -1) this.currentTrackIndex = 0;
          this.originalTracks = [];
          this.showToast('Shuffle disabled', 'info', 'info');
        }
        this.saveToLocalStorage();
      } catch (error) {
        console.error('Error shuffling tracks:', error);
        this.showToast('Shuffle failed', 'error', 'error');
        this.isShuffled = false;
      }
    },
    
    repeat() {
      try {
        const modes = ['none', 'all', 'one'];
        const currentIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentIndex + 1) % modes.length];
        this.saveToLocalStorage();
        
        const messages = {
          'none': '🔁 Repeat disabled',
          'all': '🔁 Repeat all tracks',
          'one': '🔂 Repeat current track'
        };
        this.showToast(messages[this.repeatMode], 'info', 'info');
      } catch (error) {
        console.error('Error toggling repeat:', error);
        this.showToast('Repeat control error', 'error', 'error');
      }
    },
    
    selectTrack(index) {
      if (index < 0 || index >= this.tracks.length) {
        this.showToast('Invalid track selection', 'error', 'error');
        return;
      }
      
      try {
        if (index !== this.currentTrackIndex) {
          this.currentTrackIndex = index;
          this.currentTrack = this.tracks[index];
          this.resetPlayer();
          if (this.isTimerPlaying) {
            setTimeout(() => this.play(), 500);
          }
        }
      } catch (error) {
        console.error('Error selecting track:', error);
        this.showToast('Failed to select track', 'error', 'error');
      }
    },
    
    toggleFavorite(index) {
      this.tracks[index].favorited = !this.tracks[index].favorited;
      this.saveToLocalStorage();
      const status = this.tracks[index].favorited ? 'added to' : 'removed from';
      this.showToast(`Track ${status} favorites`, 'success', 'check');
    },
    
    // ====== Toast Notifications ======
    showToast(message, type = 'info', icon = 'info') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.icon = icon;
      this.toast.show = true;
      
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
    
    // ====== Keyboard Shortcuts ======
    handleKeyPress(e) {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        this.play();
      }
      else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.nextTrack();
      }
      else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.prevTrack();
      }
      else if (e.code === 'ArrowUp') {
        e.preventDefault();
        this.volume = Math.min(100, parseInt(this.volume) + 5);
        this.changeVolume();
      }
      else if (e.code === 'ArrowDown') {
        e.preventDefault();
        this.volume = Math.max(0, parseInt(this.volume) - 5);
        this.changeVolume();
      }
      else if (e.code === 'KeyM') {
        e.preventDefault();
        this.toggleMute();
      }
      else if (e.code === 'KeyS') {
        e.preventDefault();
        this.shuffle();
      }
      else if (e.code === 'KeyR') {
        e.preventDefault();
        this.repeat();
      }
    },
    
    // ====== Local Storage ======
    saveToLocalStorage() {
      const data = {
        volume: this.volume,
        isMuted: this.isMuted,
        isShuffled: this.isShuffled,
        repeatMode: this.repeatMode,
        currentTrackIndex: this.currentTrackIndex,
        currentSource: this.currentSource,
        favorites: this.tracks.map(t => ({ 
          name: t.name, 
          artist: t.artist,
          favorited: t.favorited 
        })),
        customTracks: this.tracks.filter(t => t.sourceType !== 'local')
      };
      localStorage.setItem('musicPlayerData', JSON.stringify(data));
    },
    
    loadFromLocalStorage() {
      const data = localStorage.getItem('musicPlayerData');
      if (data) {
        const parsed = JSON.parse(data);
        this.volume = parsed.volume || 100;
        this.isMuted = parsed.isMuted || false;
        this.isShuffled = parsed.isShuffled || false;
        this.repeatMode = parsed.repeatMode || 'none';
        this.currentTrackIndex = parsed.currentTrackIndex || 0;
        this.currentSource = parsed.currentSource || 'local';
        
        // Restore custom tracks from streaming services
        if (parsed.customTracks && parsed.customTracks.length > 0) {
          this.tracks = [...this.tracks, ...parsed.customTracks];
        }
        
        // Restore favorites
        if (parsed.favorites) {
          parsed.favorites.forEach(fav => {
            const track = this.tracks.find(t => t.name === fav.name && t.artist === fav.artist);
            if (track) track.favorited = fav.favorited;
          });
        }
      }
    },
    
    // ====== Player Initializers ======
    async initializePlayers() {
      let initialized = [];
      let failed = [];
      
      // Initialize YouTube Player
      try {
        this.youtubePlayer = new YouTubePlayer(API_CONFIG.youtube);
        await this.youtubePlayer.init('youtube-player');
        
        // Set up YouTube callbacks
        this.youtubePlayer.onStateChange = (state, event) => {
          if (state === 'playing') {
            this.isTimerPlaying = true;
          } else if (state === 'paused') {
            this.isTimerPlaying = false;
          } else if (state === 'ended') {
            this.handleTrackEnd();
          }
        };
        
        this.youtubePlayer.onTimeUpdate = (currentTime, duration) => {
          this.updateTimeDisplay(currentTime, duration);
        };
        
        this.youtubePlayer.onError = (error) => {
          this.showToast('YouTube error: ' + error, 'error', 'error');
        };
        
        initialized.push('YouTube');
        console.log('✓ YouTube player initialized');
      } catch (error) {
        failed.push('YouTube');
        console.error('✗ YouTube player initialization failed:', error.message);
      }
      
      // Initialize SoundCloud Player
      try {
        this.soundcloudPlayer = new SoundCloudPlayer(API_CONFIG.soundcloud);
        await this.soundcloudPlayer.init('soundcloud-player');
        
        // Set up SoundCloud callbacks
        this.soundcloudPlayer.onStateChange = (state) => {
          if (state === 'playing') {
            this.isTimerPlaying = true;
          } else if (state === 'paused') {
            this.isTimerPlaying = false;
          } else if (state === 'ended') {
            this.handleTrackEnd();
          }
        };
        
        this.soundcloudPlayer.onTimeUpdate = (currentTime, duration) => {
          this.updateTimeDisplay(currentTime, duration);
        };
        
        this.soundcloudPlayer.onError = (error) => {
          this.showToast('SoundCloud error: ' + error, 'error', 'error');
        };
        
        initialized.push('SoundCloud');
        console.log('✓ SoundCloud player initialized');
      } catch (error) {
        failed.push('SoundCloud');
        console.error('✗ SoundCloud player initialization failed:', error.message);
      }
      
      // Show initialization summary
      if (initialized.length > 0) {
        console.log(`🎵 Initialized: ${initialized.join(', ')}`);
      }
      if (failed.length > 0) {
        console.warn(`⚠️ Failed to initialize: ${failed.join(', ')}`);
        this.showToast(`Some players failed to load. Check API keys.`, 'warning', 'warning');
      }
      if (initialized.length > 0 && failed.length === 0) {
        this.showToast('🎉 All players ready!', 'success', 'check');
      }
    },
    
    handleTrackEnd() {
      this.isLoading = false;
      if (this.repeatMode === 'one') {
        this.resetPlayer();
        this.isTimerPlaying = true;
      } else if (this.repeatMode === 'all') {
        this.nextTrack();
        this.isTimerPlaying = true;
      } else {
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.nextTrack();
          this.isTimerPlaying = true;
        } else {
          this.isTimerPlaying = false;
        }
      }
    }
  },
  
  async created() {
    let vm = this;
    
    // Load saved data from localStorage
    this.loadFromLocalStorage();
    
    this.currentTrack = this.tracks[this.currentTrackIndex];
    
    // Initialize local audio player
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.volume = this.volume / 100;
    
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onloadstart = function() {
      vm.isLoading = true;
    };
    this.audio.oncanplay = function() {
      vm.isLoading = false;
    };
    this.audio.onerror = function() {
      vm.isLoading = false;
      vm.showToast('Error loading audio file', 'error', 'error');
      console.error('Audio error:', vm.audio.error);
    };
    this.audio.onended = function() {
      vm.handleTrackEnd();
    };

    // Add keyboard event listener
    window.addEventListener('keydown', this.handleKeyPress);
    
    // Preload covers
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
    
    // Initialize streaming players
    await this.initializePlayers();
  },
  
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyPress);
    
    // Cleanup players
    if (this.youtubePlayer) {
      this.youtubePlayer.destroy();
    }
    if (this.spotifyPlayer) {
      this.spotifyPlayer.destroy();
    }
    if (this.soundcloudPlayer) {
      this.soundcloudPlayer.destroy();
    }
  }
});
