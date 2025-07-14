# CalKick Workout Tracker 🥊💪

A modern, interactive web application for tracking your 4-Day Calisthenics + Kickboxing workout plan designed for fat loss and cholesterol reduction.

## 🌟 Features

- **7-Day Interactive Tabs** - Navigate through your weekly workout schedule
- **Smart Day Detection** - Automatically highlights today's workout
- **Progress Tracking** - Visual progress bar and streak counter
- **LocalStorage Persistence** - Your progress is automatically saved
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Comprehensive Workouts** - Detailed exercise lists with descriptions
- **YouTube Integration** - Video tutorials for every exercise with popup modal
- **Smooth Animations** - Engaging user experience with celebration effects

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd calkick-workout-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   The app will automatically open at `http://localhost:3000`

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with live reload |
| `npm run dev` | Same as start, with file watching |
| `npm run serve` | Serve using http-server |
| `npm run build` | Build minified production files |
| `npm run lint` | Run ESLint for code quality |
| `npm run format` | Format code with Prettier |
| `npm run clean` | Clean build directory |
| `npm run add-youtube` | Add YouTube buttons to all exercises |
| `npm run fix-youtube` | Fix YouTube video IDs with working tutorials |
| `npm run deploy` | Deploy to GitHub Pages |

## 🏋️ Workout Schedule

| Day | Workout | Duration | Calories |
|-----|---------|----------|----------|
| **Monday** | HIIT Boxing Burn | 35-40 min | 400-500 |
| **Tuesday** | Explosive Leg & Kick Blaster | 40-45 min | 450-550 |
| **Wednesday** | Active Recovery | 20 min | Light Activity |
| **Thursday** | Full Body Fat Annihilator | 45-50 min | 500-600 |
| **Friday** | Core Shredder & Cardio Finisher | 35-40 min | 400-500 |
| **Saturday** | Rest Day | - | Recovery |
| **Sunday** | Light Activity | 20-30 min | Low Intensity |

## 🎯 How to Use

1. **Navigate Days**: Click on day tabs or use keyboard shortcuts (1-7)
2. **Track Exercises**: Check off exercises as you complete them
3. **Watch Tutorials**: Click red YouTube buttons to view exercise tutorials
4. **Monitor Progress**: Watch your weekly progress bar and streak counter
5. **Stay Motivated**: Enjoy celebration animations when completing exercises
6. **Reset if Needed**: Use the reset button to start fresh

## 🎬 YouTube Integration

- **Video Tutorials**: Every exercise has a dedicated YouTube tutorial
- **Popup Modal**: Videos open in a beautiful, responsive modal
- **Direct Links**: Open videos directly in YouTube app/website
- **Share Function**: Share exercise tutorials with friends
- **Keyboard Controls**: Use Escape key to close video modal
- **Auto-play**: Videos start automatically when opened

## 📱 Mobile Features

- **Touch Gestures**: Swipe left/right to navigate between days
- **Responsive Layout**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets for easy interaction

## 🔧 Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser LocalStorage for persistence
- **Icons**: Font Awesome 6
- **Server**: Live-server for development
- **Build Tools**: Clean-CSS, UglifyJS for production

## 📊 Progress Tracking

The app automatically tracks:
- ✅ Individual exercise completion
- 📈 Daily workout completion
- 🔥 Consecutive day streaks
- 📊 Weekly progress percentage

## 🎨 Customization

### Themes
The app uses CSS custom properties for easy theming. Modify the color variables in `styles.css`:

```css
:root {
  --primary-color: #4CAF50;
  --secondary-color: #ff6b6b;
  --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adding Exercises
To add new exercises, modify the HTML structure in `index.html` and ensure the JavaScript handles the new exercise IDs.

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Manual Deployment
1. Run `npm run build` to create minified files
2. Upload all files to your web server
3. Ensure your server serves the `index.html` file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Workout plan based on proven calisthenics and kickboxing principles
- Icons provided by [Font Awesome](https://fontawesome.com/)
- Inspired by modern fitness tracking applications

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/calkick-workout-tracker/issues) page
2. Create a new issue with detailed information
3. Include your browser version and operating system

---

**Start your fitness journey today! 💪🔥**

*Remember: Consistency is key. Listen to your body and stay hydrated!*