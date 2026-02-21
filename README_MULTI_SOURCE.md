# 🎵 Potify - Multi-Source Music Player

A beautiful, feature-rich web music player that streams from **YouTube, Spotify, SoundCloud**, and plays **local MP3 files**.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎼 Multi-Source Playback
- **Local MP3 Files** - Offline playback
- **YouTube Music** - Millions of songs & videos
- **Spotify** - High-quality streaming (Premium required)
- **SoundCloud** - Indie & remixes

### 🎛️ Player Controls
- ▶️ Play/Pause, Next/Previous
- 🔀 Shuffle mode
- 🔁 Repeat (Off/All/One)
- 🔊 Volume control with mute
- ⏩ Seek/scrub through tracks
- ⌨️ Keyboard shortcuts

### 🔍 Smart Search
- Search across YouTube, Spotify, and SoundCloud
- Instant playback from search results
- Add tracks to playlist with one click

### 📋 Playlist Management
- View full playlist queue
- Click any track to play
- Add favorites (♥)
- Persistent playlist storage

### 🎨 Modern UI/UX
- Light & Dark themes
- Smooth animations
- Responsive design (mobile-friendly)
- Toast notifications
- Loading states

### ♿ Accessibility
- Full keyboard navigation
- ARIA labels
- Screen reader support
- Focus indicators

---

## 🚀 Quick Start

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/potify-player.git
cd potify-player
```

### 2. Test Locally (No Setup)
```bash
# Python 3
python -m http.server 8080

# Or Node.js
npx serve
```

Open `http://localhost:8080` and use **Local** tab (works immediately)

### 3. Enable Streaming (Optional)

**Get API Keys:**
- [YouTube API Key](https://console.cloud.google.com/apis/credentials)
- [Spotify Developers](https://developer.spotify.com/dashboard)
- [SoundCloud Apps](https://soundcloud.com/you/apps)

**Configure:**
Edit `config.js` with your API keys:
```javascript
const API_CONFIG = {
  youtube: {
    apiKey: 'YOUR_YOUTUBE_API_KEY'
  },
  spotify: {
    clientId: 'YOUR_SPOTIFY_CLIENT_ID',
    clientSecret: 'YOUR_SPOTIFY_CLIENT_SECRET', // Backend only!
    redirectUri: 'http://localhost:8080/callback'
  },
  soundcloud: {
    clientId: 'YOUR_SOUNDCLOUD_CLIENT_ID'
  }
};
```

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.**

---

## 📖 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete API setup guide
- **[KEYBOARD_SHORTCUTS.md](KEYBOARD_SHORTCUTS.md)** - Keyboard controls
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[ADDING_MUSIC_GUIDE.md](ADDING_MUSIC_GUIDE.md)** - Add local MP3s

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `→` | Next track |
| `←` | Previous track |
| `↑` | Volume up (+5%) |
| `↓` | Volume down (-5%) |
| `M` | Mute/Unmute |
| `S` | Toggle shuffle |
| `R` | Cycle repeat modes |

---

## 🛠️ Tech Stack

- **Frontend**: Vue.js 2.6, HTML5, CSS3
- **APIs**: 
  - YouTube Data API v3
  - Spotify Web API + Web Playback SDK
  - SoundCloud API + Widget API
- **Storage**: localStorage for persistence
- **Audio**: HTML5 Audio API, YouTube IFrame API

---

## 📁 Project Structure

```
Potify-mini-Music-Player/
├── index.html                    # Main HTML
├── config.js                     # API configuration
├── css/
│   └── main.css                 # Styles with themes
├── scripts/
│   ├── script-multi-source.js   # Main Vue app
│   ├── youtube-player.js        # YouTube integration
│   ├── spotify-player.js        # Spotify integration
│   └── soundcloud-player.js     # SoundCloud integration
├── mp3/                          # Local MP3 files
├── img/                          # Album covers & assets
├── SETUP_GUIDE.md               # API setup instructions
├── KEYBOARD_SHORTCUTS.md        # Keyboard reference
├── ADDING_MUSIC_GUIDE.md        # Add local music
└── CHANGELOG.md                 # Version history
```

---

## 🎯 Use Cases

### For Developers
- 🎓 Learn API integration
- 🎨 Study Vue.js patterns
- 🔊 Understand Web Audio APIs
- 📱 Practice responsive design

### For Users
- 🎵 Personal music player
- 📚 Study/work playlists
- 🎧 Podcast player
- 🎼 DJ practice tool

### For Portfolios
- 💼 Showcase web dev skills
- 🎨 Demonstrate UI/UX design
- 🔌 Display API integration
- ⚡ Show performance optimization

---

## 🔒 Security Notes

### Development
- ✅ API keys in `config.js` for local testing
- ⚠️ Don't commit keys to public repos
- 🔐 Use `.gitignore` for `config.js`

### Production
- ❌ **Never** put API keys in frontend
- ✅ Implement backend API proxy
- ✅ Use environment variables
- ✅ Server-side OAuth for Spotify

**Example `.gitignore`:**
```
config.js
.env
node_modules/
```

---

## 🚧 Limitations

### YouTube
- 10,000 quota units/day (~200-400 searches)
- Some videos not embeddable
- Cannot play in background

### Spotify
- **Requires Premium** for playback
- Free accounts can search only
- Token expires after 1 hour

### SoundCloud
- Only streamable tracks available
- Some tracks region-locked
- Limited API quota

### Local Files
- Manual file management
- Limited to local storage
- No search functionality

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- [ ] Backend server for secure API handling
- [ ] Playlist import/export (JSON, M3U)
- [ ] Equalizer visualization
- [ ] Lyrics integration
- [ ] Social features (share playlists)
- [ ] Progressive Web App (PWA)
- [ ] Desktop app (Electron)

**To contribute:**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📜 License

This project is open source under the **MIT License**.

**Note**: Music streaming requires compliance with:
- YouTube Terms of Service
- Spotify Developer Terms
- SoundCloud API Terms

---

## 🙏 Acknowledgments

- **Original Design**: [muhammederdem/mini-player](https://github.com/muhammederdem/mini-player)
- **Vue.js**: Frontend framework
- **Font**: Bitter (Google Fonts)
- **Icons**: Custom SVG sprites
- **APIs**: YouTube, Spotify, SoundCloud

---

## 💡 Tips

### For Best Experience:
1. **Use Chrome/Edge** for best compatibility
2. **Get Spotify Premium** for full streaming
3. **Limit YouTube searches** to stay under quota
4. **Use Dark Mode** to save battery
5. **Enable HTTPS** for Spotify in production

### Performance:
- Preloads album covers for smooth transitions
- Lazy loads streaming players
- Caches settings in localStorage
- Optimized animations for 60fps

---

## 📞 Support

**Issues?**
- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) troubleshooting
- Open GitHub issue with:
  - Browser & version
  - Error message
  - Console log (F12)
  - Steps to reproduce

**Questions?**
- Read documentation first
- Search existing issues
- Ask in discussions tab

---

## 🎉 Credits

Built with ❤️ by developers for developers

**Star ⭐ this repo if you find it helpful!**

---

### Version 2.0.0 - Multi-Source Release
- ✨ Added YouTube, Spotify, SoundCloud integration
- 🔍 Implemented search functionality
- 🎨 Enhanced UI with source tabs
- 📱 Improved mobile responsiveness
- 🔐 Added API configuration system
- 📚 Complete documentation

See [CHANGELOG.md](CHANGELOG.md) for full history.
