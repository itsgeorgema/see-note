# SeeNote - Guitar Note Detection App

A desktop application that utilizes computer vision to detect guitar notes in real-time, with debug-style indicators on the live camera feed. The app translates visual information (finger positions on a fretboard) into musical data (specific notes) using advanced computer vision techniques.

## 📥 Download & Installation Onto Your Desktop/PC

### For End Users (No Building Required)

#### Step 1: Download the App
1. Go to the [Releases](https://github.com/itsgeorgema/see-note/releases) page on GitHub
2. Download the ZIP file for your operating system:
   - **Windows**: `see-note-win-x.x.x.zip`
   - **macOS**: `see-note-mac-x.x.x.zip`
   - **Linux**: `see-note-linux-x.x.x.zip`

#### Step 2: Extract and Install

**Windows:**
1. Extract the ZIP file to a folder of your choice
2. Double-click `see-note.exe` to run the app
3. If you see a "Windows protected your PC" warning:
   - Click "More info"
   - Click "Run anyway"

**macOS:**
1. Extract the ZIP file
2. Drag the `see-note.app` to your Applications folder
3. Right-click the app and select "Open" (first time only)
4. If you see a security warning:
   - Go to System Preferences > Security & Privacy
   - Click "Open Anyway" next to the blocked app

**Linux:**
1. Extract the ZIP file
2. Make the AppImage executable: `chmod +x see-note-*.AppImage`
3. Double-click the AppImage to run

### System Requirements

- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Camera**: Webcam required for guitar detection
- **Internet**: Required for initial setup and updates

### First Run Setup

1. **Camera Permission**: The app will request camera access - click "Allow"
2. **Guitar Setup**: Position your guitar so the fretboard is clearly visible
3. **Lighting**: Ensure good lighting for accurate detection
4. **Calibration**: The app may need a few seconds to detect your fretboard

### Troubleshooting Installation

**App won't start:**
- Ensure you have the correct version for your OS
- Check that your system meets the minimum requirements
- Try running as administrator (Windows) or with sudo (Linux)

**Camera not working:**
- Check camera permissions in your system settings
- Ensure no other apps are using the camera
- Try restarting the app

**Performance issues:**
- Close other applications to free up RAM
- Ensure good lighting conditions
- Check that your webcam is working properly

### Updating the App

1. Download the latest release from GitHub
2. Extract the new version to a different folder
3. Copy your settings/config files if needed
4. Replace the old version with the new one
## 🎸 Features

- **Real-time Guitar Note Detection** - Detects which notes are being played based on finger positions
- **Live Camera Feed** - Webcam integration for real-time analysis
- **Computer Vision Processing** - Advanced hand tracking and fretboard detection
- **Debug Overlays** - Visual indicators showing hand landmarks, fret lines, and detected notes
- **Cross-platform Desktop App** - Works on Windows, macOS, and Linux
- **Modern UI** - interface built with React and Tailwind CSS

## How It Works

The core challenge is translating visual information (finger positions on a fretboard) into musical data (a specific note). This involves several computer vision tasks:

1. **Guitar Detection** - Identifies the guitar and locates the fretboard
2. **Hand Tracking** - Uses MediaPipe to track hand and finger landmarks
3. **Fretboard Mapping** - Creates a geometric model of the fretboard using OpenCV
4. **Note Calculation** - Maps finger positions to musical notes based on standard tuning

## 🛠️ Tech Stack

- **Application Framework**: Electron.js - Cross-platform desktop app
- **Frontend**: React.js with Tailwind CSS - Modern, responsive UI
- **Computer Vision**: 
  - MediaPipe Hands - Hand and finger tracking
  - OpenCV.js - Image processing and fretboard detection
- **Build Tools**: electron-builder for distribution
- **State Management**: React hooks for app state

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Webcam for guitar detection

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd see-note
```

2. Install dependencies:
```bash
npm install
```

### Development

To run the app in development mode:

```bash
npm start
```

This will:
- Start the React development server
- Wait for it to be ready
- Launch the Electron app with camera access

### Building

To build the app for distribution:

```bash
# Build React app only
npm run build

# Build React app and create Electron distributable
npm run electron:build

# Alternative: Create a development build
npm run electron:pack

# Alternative: Create a production build
npm run electron:dist
```

The built app will be available in the `dist` folder.

## 🎯 Core Components

### GuitarDetector Component
- **Webcam Integration** - Accesses user's camera via `navigator.mediaDevices.getUserMedia()`
- **Canvas Overlay** - HTML5 canvas for drawing debug indicators
- **MediaPipe Hands** - Real-time hand landmark detection
- **OpenCV Processing** - Fretboard detection using edge detection and line detection

### Computer Vision Pipeline
1. **Pre-processing** - Grayscale conversion and noise reduction
2. **Edge Detection** - Canny edge detector for sharp edges
3. **Line Detection** - Hough Line Transform for fret and string detection
4. **Coordinate Mapping** - Creates grid system for fretboard
5. **Finger Mapping** - Maps hand landmarks to fretboard coordinates
6. **Note Calculation** - Converts coordinates to musical notes

### Note Calculation
```javascript
const tuning = {
  1: 'E4', // High E
  2: 'B3',
  3: 'G3', 
  4: 'D3',
  5: 'A2',
  6: 'E2', // Low E
};

// Each fret represents one semitone
// Formula: (baseNoteIndex + fretNumber) % 12
```

## 📁 Project Structure

```
see-note/
├── public/
│   ├── main.js          # Electron main process
│   ├── preload.js       # Preload script for secure IPC
│   └── index.html       # HTML template
├── src/
│   ├── App.js           # Main React component
│   ├── components/      # React components
│   │   ├── GuitarDetector.js    # Main CV component
│   │   ├── CameraFeed.js        # Video feed component
│   │   └── NoteDisplay.js       # Note output display
│   ├── index.js         # React entry point
│   └── index.css        # Global styles with Tailwind
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies and scripts
```

## 🎮 Available Scripts

- `npm start` - Start React development server and launch Electron app
- `npm run build` - Build React app and create Electron distributable
- `npm test` - Run React tests
- `npm run eject` - Eject from Create React App (one-way operation)
- `npm run electron` - Run Electron app only (requires built React app)
- `npm run electron:dev` - Alternative to npm start (same functionality)
- `npm run electron:pack` - Create development build
- `npm run electron:dist` - Create production build
- `npm run electron:serve` - Serve built React app with Electron

## Development Notes

### Computer Vision Implementation
- **Hand Tracking**: MediaPipe provides 21 hand landmarks with x, y, z coordinates
- **Fretboard Detection**: OpenCV.js handles edge detection, line detection, and geometric transformations
- **Performance**: Uses `requestAnimationFrame` for smooth real-time processing
- **Debug Visualization**: Canvas 2D context for drawing overlays and indicators

### Security Features
- **Context Isolation**: Prevents renderer from accessing Node.js directly
- **Secure IPC**: Communication through preload script only
- **Camera Permissions**: Proper webcam access handling

## 🚀 Deployment

### Building for Distribution
```bash
npm run electron:build
```

This creates platform-specific packages:
- **Windows**: ZIP file with .exe
- **macOS**: ZIP file with .app  
- **Linux**: ZIP file with AppImage

### GitHub Releases
1. Build the application: `npm run build`
2. Create a new GitHub release with version tag (e.g., `v1.0.0`)
3. Upload the generated ZIP files from the `dist` folder
4. Users can download and run directly

## 🎵 Musical Theory Integration

The app handles:
- **Standard Tuning**: E2, A2, D3, G3, B3, E4
- **Note Calculation**: Semitone-based progression
- **Octave Handling**: Proper octave transitions
- **Accidentals**: Sharp (#) and flat (b) notes

## 🔍 Debug Features

- **Hand Landmarks**: Visual representation of detected hand points
- **Fret Lines**: Detected vertical fret lines
- **String Lines**: Detected horizontal string lines
- **Finger Press Indicators**: Circles showing which fingers are pressing strings
- **Note Display**: Real-time note output
- **Coordinate Grid**: Visual fretboard mapping

## 📝 License

This project is licensed under the MIT License.


## 🎯 Roadmap

- [ ] Multiple tuning support (Drop D, Open G, etc.)
- [ ] Chord detection
- [ ] Recording and playback
- [ ] MIDI output
- [ ] Custom fretboard configurations
- [ ] Machine learning improvements for accuracy

---

**Note**: This app requires camera access and works best with good lighting conditions and a clearly visible guitar fretboard.
