# 🎵 Multi-Source Music Player Setup Guide

## Overview

Your music player now supports **4 music sources**:
1. **Local MP3 Files** (works offline)
2. **YouTube** (requires API key)
3. **Spotify** (requires Premium account + API credentials)
4. **SoundCloud** (requires API client ID)

---

## 📦 Quick Start

### Option 1: Use Local Files Only (No Setup Required)
- Works immediately
- Just add MP3 files to `/mp3` folder
- Add cover images to `/img` folder
- Update tracks array in `script.js`

### Option 2: Enable Streaming (Requires API Keys)
Follow the setup guides below for each service.

---

## 🔑 API Setup Instructions

### 1. YouTube Setup

**Get Your API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **YouTube Data API v3**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

**Configure:**
1. Open `config.js`
2. Replace `YOUR_YOUTUBE_API_KEY` with your actual key:
   ```javascript
   youtube: {
     apiKey: 'AIzaSyC_your_actual_api_key_here',
     maxResults: 20
   }
   ```

**Usage:**
- Click **YouTube** tab
- Search for any song
- Click to play instantly
- Add to playlist for later

**Limitations:**
- 10,000 quota units per day (about 200-400 searches)
- Cannot download or play in background
- Requires internet connection

---

### 2. Spotify Setup

**Prerequisites:**
- Spotify account (free or Premium)
- **Premium required for playback**

**Get API Credentials:**
1. Go to [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **Create an App**
4. Fill in:
   - App name: "Potify Music Player"
   - App description: "Personal music player"
   - Redirect URI: `http://localhost:8080/callback` (or your domain)
5. Save and copy:
   - **Client ID**
   - **Client Secret**

**Configure:**
1. Open `config.js`
2. Update Spotify credentials:
   ```javascript
   spotify: {
     clientId: 'your_client_id_here',
     clientSecret: 'your_client_secret_here',
     redirectUri: 'http://localhost:8080/callback', // Match your app settings
     scopes: [
       'streaming',
       'user-read-email',
       'user-read-private',
       'user-library-read',
       'user-library-modify',
       'user-read-playback-state',
       'user-modify-playback-state'
     ]
   }
   ```

**Important Security Note:**
⚠️ **Client Secret should NEVER be in frontend code!**

For **production**, you need a backend server:
1. Store Client Secret on server
2. Implement OAuth flow on backend
3. Frontend only receives access token

For **development/local** use only, it's okay to have credentials in `config.js`.

**Usage:**
1. Click **Spotify** tab
2. Click "Login" when prompted
3. Authorize the app
4. You'll be redirected back
5. Search and play unlimited music!

**Limitations:**
- Requires Spotify Premium for playback
- Free accounts can browse but not play
- Needs internet connection
- Access token expires after 1 hour

---

### 3. SoundCloud Setup

**Get Client ID:**
1. Go to [SoundCloud for Developers](https://soundcloud.com/you/apps)
2. Create an app:
   - App name: "Potify Player"
   - Redirect URI: Your domain or `http://localhost:8080`
3. Copy your **Client ID**

**Configure:**
1. Open `config.js`
2. Update SoundCloud credentials:
   ```javascript
   soundcloud: {
     clientId: 'your_soundcloud_client_id_here'
   }
   ```

**Usage:**
- Click **SoundCloud** tab
- Search for tracks
- Play and add to playlist

**Limitations:**
- Only plays streamable tracks
- Some tracks may be region-locked
- Requires internet connection

---

## 🚀 Running the Player

### Local Development

**Option 1: Simple File Server**
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve

# PHP
php -S localhost:8080
```

Then open: `http://localhost:8080`

**Option 2: VS Code Live Server**
1. Install **Live Server** extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### Production Deployment

**For Spotify to work in production:**
1. Set up a backend server (Node.js, Python, etc.)
2. Implement OAuth flow
3. Store Client Secret securely
4. Add production redirect URI to Spotify app settings

**Deploy to:**
- **GitHub Pages** (local files + YouTube + SoundCloud only)
- **Netlify/Vercel** (local + YouTube + SoundCloud + Spotify with backend)
- **Your own server** (all features)

---

## 🔧 Troubleshooting

### YouTube Not Working

**Error: "YouTube API key not configured"**
- Solution: Add your API key to `config.js`

**Error: "Daily quota exceeded"**
- Solution: Wait until next day or create new project with different API key
- Limit searches to necessary queries

**Videos not playing**
- Some videos cannot be embedded
- Try different search result

### Spotify Not Working

**Error: "Not authenticated"**
- Solution: Click Spotify tab and login

**Error: "Premium required"**
- Solution: Spotify Premium subscription needed for playback
- Free accounts can search but not play

**Login redirect not working**
- Check redirect URI matches config.js and Spotify dashboard
- Use exact URL (including http/https)

**Songs not playing**
- Check browser console for errors
- Verify Premium subscription active
- Try refreshing access token (logout/login again)

### SoundCloud Not Working

**Error: "Client ID not configured"**
- Solution: Add Client ID to `config.js`

**Track won't play**
- Some tracks not streamable
- Try different result

**Widget not loading**
- Check internet connection
- Clear browser cache

### General Issues

**Player appears broken**
- Open browser console (F12)
- Check for JavaScript errors
- Verify all script files loaded

**No sound playing**
- Check volume slider
- Check if muted
- Check browser audio permissions
- Try different browser

**Search not working**
- Check API keys configured
- Check internet connection
- Verify API credentials valid

**Styles look wrong**
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check `main.css` loaded

---

## 📊 Feature Comparison

| Feature | Local | YouTube | Spotify | SoundCloud |
|---------|-------|---------|---------|------------|
| **Setup Required** | ❌ No | ✅ API Key | ✅ Premium + API | ✅ Client ID |
| **Cost** | Free | Free | $10/month | Free |
| **Offline Playback** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Music Library** | Limited | Huge | Huge | Large |
| **Search** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Audio Quality** | Depends on files | 128kbps | 320kbps | 128-256kbps |
| **Playlist** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Background Play** | ✅ Yes | ❌ No | ⚠️ Limited | ⚠️ Limited |
| **Recommended For** | Offline, Personal | Casual | Best Quality | Indie/Remixes |

---

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in `main.css`:

```css
:root {
  --accent-color: #ff69b4; /* Pink */
  --bg-primary: #fff;
  --text-primary: #000;
}

body[data-theme="dark"] {
  --bg-primary: #1a1a2e;
  --text-primary: #fff;
}
```

### Change Default Source

Edit `script-multi-source.js`:

```javascript
currentSource: 'youtube', // 'local', 'youtube', 'spotify', 'soundcloud'
```

### Adjust Search Results Limit

Edit `config.js`:

```javascript
youtube: {
  apiKey: 'YOUR_KEY',
  maxResults: 50 // Show more results
}
```

---

## 🔐 Security Best Practices

### For Development:
✅ Okay to put API keys in `config.js`  
✅ Test locally on localhost  
✅ Don't commit keys to public GitHub  

### For Production:
❌ Never put API keys in frontend code  
✅ Use environment variables  
✅ Implement backend API proxy  
✅ Use server-side OAuth  

**Example Backend (Node.js/Express):**
```javascript
// server.js
app.get('/api/youtube/search', async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.YOUTUBE_API_KEY; // Secure!
  const url = `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});
```

---

## 📝 License Considerations

### Music Licensing:
- **Local files**: ✅ Okay if you own the music
- **YouTube**: ⚠️ Follows YouTube's terms
- **Spotify**: ✅ Licensed through Spotify
- **SoundCloud**: ⚠️ Depends on track license

### For Public/Commercial Use:
- Get proper music licenses
- Use royalty-free music
- Pay streaming service fees
- Check each platform's terms of service

---

## 🆘 Getting Help

**Check These First:**
1. Browser console (F12) for errors
2. Network tab for failed requests
3. API credentials are correct
4. Internet connection working

**Still Stuck?**
- Check API status pages:
  - [YouTube API Status](https://status.cloud.google.com/)
  - [Spotify Status](https://status.spotify.com/)
  - [SoundCloud Status](https://status.soundcloud.com/)

**Common Issues GitHub Issues:**
- Search for similar problems
- Include:
  - Browser and version
  - Error messages
  - Console log
  - Steps to reproduce

---

## 🎯 Next Steps

1. **Set up your preferred music source** (follow guides above)
2. **Add your API keys** to `config.js`
3. **Test locally** with a simple HTTP server
4. **Search and play** music!
5. **Build playlists** by adding tracks
6. **Customize** themes and styling

Enjoy your multi-source music player! 🎵✨
