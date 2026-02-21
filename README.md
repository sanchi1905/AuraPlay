# 🎵 AuraPlay - Holographic Multi-Source Music Player

A stunning, feature-rich music player with **holographic aurora theme** built with **Vue.js 2**, **HTML5**, and **CSS3**. Stream music from **YouTube**, **SoundCloud**, or play your **local MP3 files** - all in one beautiful, eye-catching interface.

![AuraPlay Music Player](https://github.com/developerrahulofficial/Potify-mini-Music-Player/assets/83329806/315cf8f8-9998-43c2-b5f8-36e530536f7c)

## ✨ Key Features

### 🌈 Stunning Holographic Aurora UI
- **Animated Aurora Background** - Dynamic gradient animations that shift colors
- **Glass Morphism Design** - Beautiful blur effects and transparency
- **Neon Glowing Effects** - Cyan, magenta, and yellow neon accents
- **Gradient Animations** - Smooth color transitions throughout
- **Modern Typography** - Eye-catching gradient text logo
- **Responsive Design** - Stunning on all screen sizes

### 🎵 Multi-Source Playback
- **Local MP3s** - Play music files from your computer
- **YouTube Integration** - Search and stream from YouTube
- **SoundCloud Support** - Search and play from SoundCloud
- **Seamless Switching** - Easy source tab switching
- **Universal Controls** - Same controls work for all sources

### 🎮 Advanced Playback Controls
- **Play/Pause** - Smooth playback control
- **Next/Previous Track** - Navigate through playlists
- **Accurate Seeking** - Click anywhere on progress bar to jump
- **Real-time Progress** - Animated gradient progress bar
- **Volume Control** - Beautiful gradient slider (0-100%)
- **Mute/Unmute** - Quick volume toggle

### 🎲 Smart Playback Modes
- **Shuffle Mode** - Randomize track order
- **Repeat Modes** - None, Repeat All, Repeat One
- **Queue Management** - View and manage upcoming tracks
- **Mixed Playlists** - Combine tracks from different sources

### 🔍 Search & Discovery
- **YouTube Search** - Find any song on YouTube
- **SoundCloud Search** - Discover tracks on SoundCloud
- **Add to Playlist** - Build your custom playlist
- **Search Results** - Beautiful card-based results
- **Live Search** - Fast, responsive searching

### 🎨 User Interface
- **Holographic Theme** - Stunning aurora gradient animations
- **Glass Morphism** - Modern blur and transparency effects
- **Neon Glow Effects** - Cyan and magenta glowing borders
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Smooth Animations** - Polished transitions everywhere
- **Toast Notifications** - Elegant user feedback messages
- **Loading States** - Beautiful spinners and indicators

### 📋 Playlist Features
- **Interactive Queue** - Click any track to play immediately
- **Favorites System** - Mark tracks as favorites (persisted)
- **Now Playing Indicator** - Visual indicator for current track
- **Track Information** - Artist name, song title, and album art

### ⌨️ Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `→` | Next Track |
| `←` | Previous Track |
| `↑` | Volume Up (+5%) |
| `↓` | Volume Down (-5%) |
| `M` | Mute/Unmute |
| `S` | Toggle Shuffle |
| `R` | Cycle Repeat Mode |

### ♿ Accessibility Features
- **ARIA Labels** - Full screen reader support
- **Keyboard Navigation** - Complete keyboard accessibility
- **Focus Indicators** - Clear visual focus states
- **Reduced Motion Support** - Respects user preferences
- **Semantic HTML** - Proper role and landmark usage

### 💾 Data Persistence
All settings are automatically saved to localStorage:
- Volume level and mute state
- Shuffle and repeat mode preferences
- Favorite tracks
- Last played track position

### 🎭 Error Handling
- Graceful audio loading errors
- Network error recovery
- User-friendly error messages
- Console logging for debugging

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 2.6
- **Markup**: HTML5 with semantic elements
- **Styling**: CSS3 with custom properties, Glass Morphism, Gradients
- **Audio**: HTML5 Audio API
- **Video**: YouTube IFrame Player API
- **Streaming**: SoundCloud Widget API
- **Storage**: localStorage API
- **Icons**: Custom SVG sprite system
- **Animations**: CSS keyframe animations with cubic-bezier easing

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- **YouTube API Key** (for YouTube streaming)
- **SoundCloud Client ID** (for SoundCloud streaming)
- A local web server (for API features)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanchi1905/AuraPlay.git
   cd AuraPlay
   ```

2. **Configure API Keys**
   - Open `config.js`
   - Add your YouTube API key:
     ```javascript
     youtube: {
       apiKey: 'YOUR_YOUTUBE_API_KEY'
     }
     ```
   - Add your SoundCloud Client ID:
     ```javascript
     soundcloud: {
       clientId: 'YOUR_SOUNDCLOUD_CLIENT_ID'
     }
     ```

3. **Add local music files** (optional)
   - Place MP3 files in the `/mp3` folder
   - Place album cover images in the `/img` folder
   - Update track list in `scripts/script-multi-source.js`

4. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8080
   
   # Or using Node.js
   npx http-server -p 8080
   ```

5. **Open in browser**
   - Navigate to `http://localhost:8080`
   - Enjoy your holographic music player! 🎵

### Getting API Keys

**YouTube API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key to `config.js`

**SoundCloud Client ID:**
1. Visit [SoundCloud Developers](https://developers.soundcloud.com/)
2. Register your application
3. Copy the Client ID to `config.js`

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

## 📁 Project Structure

```
AuraPlay/
├── index.html                    # Main application
├── config.js                     # API configuration
├── css/
│   ├── main.css                 # Holographic aurora theme styles
│   └── main.scss                # Source SCSS
├── scripts/
│   ├── script-multi-source.js   # Main Vue.js app
│   ├── youtube-player.js        # YouTube integration
│   ├── soundcloud-player.js     # SoundCloud integration
│   └── script.js                # Legacy local player
├── img/                         # Album covers & assets
├── mp3/                         # Local audio files
├── SETUP_GUIDE.md              # Detailed setup instructions
├── API_INTEGRATION_SUMMARY.md  # API documentation
└── README.md                    # This file
```

## 🎨 Customization

### Holographic Aurora Theme
The player uses CSS custom properties for the aurora theme. Modify in `css/main.css`:

```css
:root {
  /* Aurora Colors */
  --color-aurora-cyan: #00f5ff;
  --color-aurora-magenta: #ff00ff;
  --color-aurora-yellow: #ffaa00;
  --color-aurora-green: #00ff88;
  
  /* Neon Accents */
  --neon-cyan: #00f0ff;
  --neon-magenta: #ff006e;
  --neon-purple: #bf5af2;
  
  /* Glass Effects */
  --glass-bg: rgba(10, 10, 30, 0.5);
  --glass-border: rgba(255, 255, 255, 0.15);
}
```

### Adding Custom Animations
The aurora background uses keyframe animations:
```css
@keyframes aurora-shift {
  /* Create your custom gradient shifts */
}
```

## 🔧 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (limited support, no CSS variables)

## 📱 Responsive Breakpoints

- Desktop: ≥ 700px
- Tablet: 576px - 699px
- Mobile: ≤ 575px

## 🎯 Use Cases

This project demonstrates:
- **Vue.js Mastery** - Component logic, reactivity, lifecycle hooks
- **API Integration** - YouTube Data API, SoundCloud Widget API
- **State Management** - Complex multi-source state handling
- **Modern CSS** - Glass morphism, gradients, animations
- **Web APIs** - Audio API, localStorage, keyboard events
- **UI/UX Design** - Eye-catching holographic interface
- **Accessibility** - WCAG compliance, ARIA implementation
- **Responsive Design** - Mobile-first approach
- **Error Handling** - Robust error management
- **Clean Code** - Maintainable, well-documented structure

## 🌟 What Makes AuraPlay Special

✨ **Unique Design** - Unlike typical music players, AuraPlay features a stunning holographic aurora theme that stands out

🎵 **Multi-Source** - Seamlessly switch between local files, YouTube, and SoundCloud

🎨 **Modern Tech** - Glass morphism, neon effects, and smooth animations

⚡ **Performance** - Optimized animations and efficient API usage

🔧 **Well-Architected** - Clean separation of concerns with dedicated player classes

## 🔮 Implemented Features

- ✅ YouTube streaming with search
- ✅ SoundCloud streaming with search
- ✅ Local MP3 playback
- ✅ Holographic aurora UI theme
- ✅ Glass morphism design
- ✅ Neon glow effects
- ✅ Accurate seeking/progress bar
- ✅ Multi-source playlist management
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Error handling
- ✅ localStorage persistence

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sanchi Sisodia**
- GitHub: [@sanchi1905](https://github.com/sanchi1905)
- Project: [AuraPlay](https://github.com/sanchi1905/AuraPlay)

## 🙏 Acknowledgments

- Album artwork and music from respective artists
- YouTube Data API by Google
- SoundCloud Widget API
- Vue.js community for excellent documentation
- Inspiration from modern streaming platforms
- Design inspiration from aurora borealis and cyberpunk aesthetics

---

**Made with ❤️ by Sanchi Sisodia**

⭐ **Star this repo** if you love the holographic aurora theme!

---

## 📞 Contact

- GitHub: [@sanchi1905](https://github.com/sanchi1905)
- Project Link: [AuraPlay](https://github.com/sanchi1905/AuraPlay)

---

*AuraPlay - Experience music in a holographic aurora*