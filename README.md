# 🎵 AuraPlay - Multi-Source Music Player

A modern, feature-rich music player built with **Vue.js 2**, **HTML5**, and **CSS3**. This project showcases advanced frontend development skills including state management, accessibility, and responsive design with support for **YouTube** and **SoundCloud** streaming.

![Music Player Preview](https://github.com/developerrahulofficial/Potify-mini-Music-Player/assets/83329806/315cf8f8-9998-43c2-b5f8-36e530536f7c)

## ✨ Features

### 🎮 Core Playback Controls
- **Play/Pause** - Seamless audio playback control
- **Next/Previous Track** - Navigate through your playlist
- **Progress Bar** - Click to seek to any position
- **Real-time Duration Display** - See current and total time

### 🔊 Advanced Audio Controls
- **Volume Control** with visual slider (0-100%)
- **Mute/Unmute** toggle functionality
- **Volume Persistence** - Remembers your volume settings

### 🎲 Playback Modes
- **Shuffle Mode** - Randomize track order
- **Repeat Modes** - None, Repeat All, Repeat One
- **Queue Management** - View and manage upcoming tracks

### 🎨 User Interface
- **Dark/Light Theme Toggle** - Switch between themes with animations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Album Cover Animations** - Smooth transitions between tracks
- **Loading States** - Visual feedback during audio loading
- **Toast Notifications** - User-friendly feedback messages

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
- **Styling**: CSS3 with custom properties (CSS variables)
- **Audio**: HTML5 Audio API
- **Storage**: localStorage API
- **Icons**: Custom SVG sprite system
- **Transitions**: Vue transitions & CSS animations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/developerrahulofficial/Potify-mini-Music-Player.git
   cd Potify-mini-Music-Player
   ```

2. **Add your music files**
   - Place MP3 files in the `/mp3` folder
   - Place album cover images in the `/img` folder

3. **Update track list**
   - Edit `scripts/script.js`
   - Modify the `tracks` array with your song information:
   ```javascript
   {
     name: "Song Title",
     artist: "Artist Name",
     cover: "../img/cover.jpg",
     source: "../mp3/song.mp3",
     url: "https://link-to-song",
     favorited: false
   }
   ```

4. **Run the application**
   - Open `index.html` in your browser, or
   - Use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```
   - Navigate to `http://localhost:8000`

## 📁 Project Structure

```
Potify-mini-Music-Player/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Compiled styles
│   └── main.scss          # Source SCSS (if applicable)
├── scripts/
│   └── script.js          # Vue.js application logic
├── img/                   # Album cover images
├── mp3/                   # Audio files
└── README.md             # Documentation
```

## 🎨 Customization

### Themes
The player uses CSS custom properties for easy theming. Modify these in `css/main.css`:

```css
:root {
  --bg-primary: #dfe7ef;
  --bg-secondary: #eef3f7;
  --text-primary: #71829e;
  --accent-color: #532ab9;
  /* ... more variables */
}
```

### Adding New Features
The codebase is well-structured for extensions:
- Audio effects in `methods` section
- New controls in the player UI
- Additional storage options
- API integrations (Spotify, SoundCloud, etc.)

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

## 🎯 Use Cases for Portfolio

This project demonstrates proficiency in:
- **Vue.js** - Component logic, reactivity, lifecycle hooks
- **State Management** - Local state with persistence
- **Web APIs** - Audio API, localStorage, keyboard events
- **UI/UX Design** - Modern interface, smooth animations
- **Accessibility** - WCAG compliance, ARIA implementation
- **Responsive Design** - Mobile-first approach
- **Error Handling** - Graceful degradation
- **Code Organization** - Clean, maintainable structure

## 🔮 Future Enhancements

Potential improvements for advanced versions:
- [ ] Playlist creation and management
- [ ] Audio equalizer with presets
- [ ] Cross-fade between tracks
- [ ] Social sharing functionality
- [ ] Backend integration for user accounts
- [ ] Music visualization/spectrum analyzer
- [ ] Song lyrics display
- [ ] Last.fm scrobbling
- [ ] Spotify/Apple Music integration
- [ ] Drag-and-drop file upload
- [ ] PWA capabilities for offline use

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

**Rahul** - [GitHub Profile](https://github.com/developerrahulofficial)

## 🙏 Acknowledgments

- Album artwork and music from respective artists
- SVG icons custom-designed for this project
- Vue.js community for excellent documentation
- Inspiration from modern music streaming platforms

---

**Note**: This is a demonstration project for portfolio purposes. All music and artwork should be properly licensed for production use.

## 📞 Contact

Have questions or suggestions? Feel free to reach out!

- GitHub: [@developerrahulofficial](https://github.com/developerrahulofficial)
- Project Link: [Potify Mini Music Player](https://github.com/developerrahulofficial/Potify-mini-Music-Player)

---

⭐ **Star this repo** if you find it helpful!

Made with ❤️ and Vue.js
    // Your data properties here
  },
  methods: {
    // Your methods here
  },
  computed: {
    // Your computed properties here
  }
});
```

**Step 5: Adding the Music Player UI**
Replace the content of the `<div class="wrapper" id="app">` with the provided HTML code.

```html
<div class="wrapper" id="app">
  <!-- Provided HTML code here -->
</div>
```

**Step 6: Styling the Music Player**
In the `style.css` file, add styles to make your music player visually appealing. You can use the provided CSS code as a starting point and customize it according to your preferences.

**Step 7: Implementing Vue.js Logic**
In the `script.js` file, fill in the Vue.js data, methods, and computed properties according to the interactions and logic you want to implement. You can use Vue.js directives like `v-if`, `v-for`, and event listeners like `@click` to bind your app's behavior to the UI elements.

**Step 8: Testing Your Music Player**
Open the `index.html` file in a web browser to see your music player interface in action. Make sure to test all the interactions and functionalities you've implemented.

That's it! You've successfully created a music player interface using HTML, CSS, and Vue.js. Remember to customize and enhance the code as needed to fit your design and requirements.



