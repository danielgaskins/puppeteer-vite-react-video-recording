## Vite React Video Recorder

This project is a Vite React app that randomly loads hardcoded videos from a local server and plays captions delivered to it via URL parameters. Puppeteer is then used to record the video along with the HTML captioning.

**Note:** This project is set up to emulate an iPhone 15 for recording. You can change the emulated device in `recordVideo.ts`.

**Note:** Without an videos prepared ahead of time, this will not work. You will need to download video and put it into the public folder, and then hardcode the paths to said video in src/pages/index.jsx as videoUrls: string[].

### Features

- Randomly selects and plays videos from a local server.
- Displays captions based on data passed through URL parameters.
- Uses Puppeteer to record the screen, capturing both video and captions.
- Employs ffmpeg for video post-processing, including removing the first second and adding audio.

### Demo

Here's a quick demonstration of the app in action:

![Demo GIF](./demo.gif)

### Prerequisites

- Node.js and npm (or yarn)
- Google Chrome (installed and in your PATH)
- ffmpeg (installed and in your PATH)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/danielgaskins/puppeteer-vite-react-video-recording
   ```
2. Navigate to the project directory:
   ```bash
   cd puppeteer-vite-react-video-recording
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Usage

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   This will start the Vite development server, typically at `http://localhost:8080/`.

2. **Open a new terminal and run the recording script:**
   ```bash
   npm run record
   ```
   This will execute the `recordVideo.cjs` script.

3. **Provide captions via URL parameters:**
   - When the app loads in the browser, provide the captions as a JSON-encoded string in the `captions` URL parameter. 
   - Each caption object should have `word`, `startTime`, and `endTime` properties.
   - Example URL: `http://localhost:5173/?captions=[{"word": "Hello", "startTime": 0, "endTime": 1}, {"word": "world", "startTime": 1, "endTime": 2}]`

4. **The recording will start automatically** and save the output video file to the `./videos` directory.

### Configuration

You can customize the recording settings in the `Config` object within `recordVideo.cjs`. This includes:

- `device`: Emulated device for recording.
- `fps`: Frames per second for the recording.
- `ffmpeg_Path`: Path to the ffmpeg executable (if not in PATH).
- `videoFrame`: Dimensions of the recorded video.
- `videoCrf`: Video quality (lower value means higher quality).
- `videoCodec`: Video codec to use.
- `videoPreset`: Encoding speed preset.
- `videoBitrate`: Target video bitrate.
- `aspectRatio`: Aspect ratio of the output video.

### License

MIT
