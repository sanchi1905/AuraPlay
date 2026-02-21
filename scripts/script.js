new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
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
          favorited: false
        },
        {
          name: "DDU DU DDU DU 🔫 ",
          artist: "BlackPink",
          cover: "./img/2.jpeg",
          source: "./mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=IHNzOHi8sJs&ab_channel=BLACKPINK",
          favorited: true
        },

        {
          name: "Lovesick Girls",
          artist: "BlackPink",
          cover: "./img/3.jpeg",
          source: "./mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=dyRsYk0LyA8&ab_channel=BLACKPINK",
          favorited: false
        },

        {
          name: "Playing With Fire 🔥",
          artist: "BlackPink",
          cover: "./img/4.jpeg",
          source: "./mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=9pdj4iJD08s&ab_channel=BLACKPINK",
          favorited: false
        },
        {
          name: "As If It's Your Last",
          artist: "BlackPink",
          cover: "./img/5.jpeg",
          source: "./mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=Amq-qlqbjYA&ab_channel=BLACKPINK",
          favorited: true
        },
        {
          name: "Boy with Love",
          artist: "BTS",
          cover: "./img/6.jpg",
          source: "./mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=XsX3ATc3FbA&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Dynamite",
          artist: "BTS",
          cover: "./img/7.jpeg",
          source: "./mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=gdZLi9oWNZg&ab_channel=HYBELABELS",
          favorited: true
        },
        {
          name: "DNA",
          artist: "BTS",
          cover: "./img/8.jpeg",
          source: "./mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Butter",
          artist: "BTS",
          cover: "./img/9.jpeg",
          source: "./mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=WMweEpGlu_U&ab_channel=HYBELABELS",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
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
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
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
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      this.isLoading = true;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play().catch(error => {
            console.error('Playback failed:', error);
            this.showToast('Failed to load track', 'error', 'error');
            this.isLoading = false;
          });
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
      this.saveToLocalStorage();
      const status = this.tracks[this.currentTrackIndex].favorited ? 'added to' : 'removed from';
      this.showToast(`Track ${status} favorites`, 'success', 'check');
    },
    changeVolume() {
      this.audio.volume = this.volume / 100;
      this.isMuted = this.volume === 0;
      this.saveToLocalStorage();
    },
    toggleMute() {
      if (this.isMuted) {
        this.volume = this.previousVolume || 50;
        this.isMuted = false;
      } else {
        this.previousVolume = this.volume;
        this.volume = 0;
        this.isMuted = true;
      }
      this.audio.volume = this.volume / 100;
      this.saveToLocalStorage();
    },
    shuffle() {
      this.isShuffled = !this.isShuffled;
      if (this.isShuffled) {
        // Save original order if not already saved
        if (this.originalTracks.length === 0) {
          this.originalTracks = [...this.tracks];
        }
        // Shuffle array using Fisher-Yates algorithm
        let currentSong = this.tracks[this.currentTrackIndex];
        let shuffled = [...this.tracks];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        this.tracks = shuffled;
        // Find current song in shuffled array
        this.currentTrackIndex = this.tracks.findIndex(t => t.name === currentSong.name);
        this.showToast('Shuffle enabled', 'success', 'check');
      } else {
        // Restore original order
        let currentSong = this.tracks[this.currentTrackIndex];
        this.tracks = [...this.originalTracks];
        this.currentTrackIndex = this.tracks.findIndex(t => t.name === currentSong.name);
        this.showToast('Shuffle disabled', 'info', 'info');
      }
      this.saveToLocalStorage();
    },
    repeat() {
      const modes = ['none', 'all', 'one'];
      const currentIndex = modes.indexOf(this.repeatMode);
      this.repeatMode = modes[(currentIndex + 1) % modes.length];
      this.saveToLocalStorage();
      const messages = {
        'none': 'Repeat disabled',
        'all': 'Repeat all tracks',
        'one': 'Repeat current track'
      };
      this.showToast(messages[this.repeatMode], 'info', 'info');
    },
    selectTrack(index) {
      if (index !== this.currentTrackIndex) {
        this.currentTrackIndex = index;
        this.currentTrack = this.tracks[index];
        this.resetPlayer();
        if (this.isTimerPlaying) {
          this.audio.play().catch(error => {
            console.error('Playback failed:', error);
            this.showToast('Playback failed', 'error', 'error');
          });
        }
      }
    },
    toggleFavorite(index) {
      this.tracks[index].favorited = !this.tracks[index].favorited;
      this.saveToLocalStorage();
      const status = this.tracks[index].favorited ? 'added to' : 'removed from';
      this.showToast(`Track ${status} favorites`, 'success', 'check');
    },
    handleKeyPress(e) {
      // Space bar - play/pause
      if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        this.play();
      }
      // Arrow right - next track
      else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.nextTrack();
      }
      // Arrow left - previous track
      else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.prevTrack();
      }
      // Arrow up - volume up
      else if (e.code === 'ArrowUp') {
        e.preventDefault();
        this.volume = Math.min(100, parseInt(this.volume) + 5);
        this.changeVolume();
      }
      // Arrow down - volume down
      else if (e.code === 'ArrowDown') {
        e.preventDefault();
        this.volume = Math.max(0, parseInt(this.volume) - 5);
        this.changeVolume();
      }
      // M - mute/unmute
      else if (e.code === 'KeyM') {
        e.preventDefault();
        this.toggleMute();
      }
      // S - shuffle
      else if (e.code === 'KeyS') {
        e.preventDefault();
        this.shuffle();
      }
      // R - repeat
      else if (e.code === 'KeyR') {
        e.preventDefault();
        this.repeat();
      }
    },
    saveToLocalStorage() {
      const data = {
        volume: this.volume,
        isMuted: this.isMuted,
        isShuffled: this.isShuffled,
        repeatMode: this.repeatMode,
        currentTrackIndex: this.currentTrackIndex,
        favorites: this.tracks.map(t => ({ name: t.name, favorited: t.favorited }))
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
        // Restore favorites
        if (parsed.favorites) {
          parsed.favorites.forEach(fav => {
            const track = this.tracks.find(t => t.name === fav.name);
            if (track) track.favorited = fav.favorited;
          });
        }
      }
    }
  },
  created() {
    let vm = this;
    
    // Load saved data from localStorage
    this.loadFromLocalStorage();
    
    this.currentTrack = this.tracks[this.currentTrackIndex];
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
      vm.isLoading = false;
      if (vm.repeatMode === 'one') {
        vm.audio.currentTime = 0;
        vm.audio.play();
      } else if (vm.repeatMode === 'all') {
        vm.nextTrack();
        vm.isTimerPlaying = true;
      } else {
        // Check if it's the last track
        if (vm.currentTrackIndex < vm.tracks.length - 1) {
          vm.nextTrack();
          vm.isTimerPlaying = true;
        } else {
          vm.isTimerPlaying = false;
        }
      }
    };

    // Add keyboard event listener
    window.addEventListener('keydown', this.handleKeyPress);
    
    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }
});
