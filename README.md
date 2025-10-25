# HydroApp

A full-stack React Native application built with Expo and an Express.js backend. This README explains setup, development, API usage, and deployment to the Apple App Store (TestFlight/App Store).

## Features
- 📱 React Native (Expo, TypeScript)
- 🔧 Express.js backend with REST API
- 🔄 Simple in-memory data store with CRUD endpoints
- 🎨 UI components via React Native Paper
- 🧭 Navigation via React Navigation stack
- 🌐 Axios-based API client with error handling

## Requirements
- Node.js v16+ (recommended v18+)
- npm (or yarn)
- iOS Simulator (Xcode) or Android Emulator
- Windows 10/11 or macOS 10.15+ for development

## Cross-Platform Compatibility
HydroApp is optimized for both Windows and macOS development environments:

### Windows Development
- Use `npm run dev:windows` for concurrent backend/frontend development
- Windows Subsystem for Linux (WSL) recommended for best experience
- PowerShell or Command Prompt compatible

### macOS Development
- Use `npm run dev:macos` for concurrent backend/frontend development
- Native terminal support with optimized performance
- Xcode required for iOS development

### Mobile Platforms
- **iOS**: iOS Simulator (macOS only) or physical devices
- **Android**: Android Studio Emulator or physical devices
- **Web**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Start backend and frontend (three options)
- Separate processes:
```bash
npm run backend    # starts Express on http://localhost:3000
npm start          # starts Expo dev server
```
- Concurrently in one command (cross-platform):
```bash
npm run dev
```
- Platform-specific concurrent commands:
```bash
npm run dev:windows    # Windows-optimized
npm run dev:macos      # macOS-optimized
```

3) Launch on a device/simulator
- iOS simulator:
```bash
npm run ios
```
- Android emulator:
```bash
npm run android
```
- Web (Expo web):
```bash
npm run web
```

4) Connect Expo Go or simulator
- Scan the QR shown in the terminal (Expo Metro) on a physical device, or press "i"/"a" to open iOS/Android simulators.

## Project Structure
```
HydroApp/
├── App.tsx                # Main app component (frontend)
├── backend/
│   └── server.js          # Express server (backend)
├── assets/                # Icons & images
├── index.ts               # Entry file for Expo
├── app.json               # Expo config (name, bundle id, splash, etc.)
├── eas.json               # EAS build configuration
├── package.json           # Scripts & dependencies
├── .env                   # Backend environment vars
└── tsconfig.json          # TypeScript config
```

## Environment Configuration
Create `.env` in the project root (already created) and ensure values are set:
```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:19000
```
Note: Adjust `CORS_ORIGIN` to match your Expo dev URL when testing on device (e.g., http://<your-local-ip>:19000).

## API Endpoints (Backend)
Base URL: `http://localhost:3000`

- `GET /` → server status
- `GET /api/health` → health check
- `GET /api/data` → list items
- `POST /api/data` → add item

Example usage:
```bash
# Health
curl http://localhost:3000/api/health

# Get data
curl http://localhost:3000/api/data

# Add data
curl -X POST http://localhost:3000/api/data \
  -H 'Content-Type: application/json' \
  -d '{"name":"Item X","value":123}'
```

## Frontend Integration
`App.tsx` uses Axios to call the backend at `http://localhost:3000`. If you test on a physical device, replace `localhost` with your computer’s LAN IP (e.g., `http://192.168.X.X:3000`).

## Deployment (Apple App Store)
We use EAS (Expo Application Services) for building and submission.

1) Log in to Expo
```bash
npx eas login
```

2) Update `app.json`
- Set `ios.bundleIdentifier` to your bundle ID (e.g., `com.yourcompany.hydroapp`)
- Ensure `slug` and other metadata match your App Store Connect app record

3) Build (production)
```bash
npm run build:ios
# or
npx eas build --platform ios --profile production
```

4) Submit to App Store Connect
```bash
npx eas submit --platform ios --profile production
```

Alternatively, run the guided script:
```bash
./deploy-to-app-store.sh
```
It will check EAS, verify login, build, and optionally submit.

For detailed steps, see:
- `APPLE_STORE_DEPLOYMENT.md`
- `DEPLOYMENT_GUIDE.md`
- `DEPLOYMENT_SUMMARY.md`

## Troubleshooting

### Cross-Platform Issues

#### Windows
- **WSL Recommended**: Use Windows Subsystem for Linux for best development experience
- **Path Issues**: If you encounter path-related errors, ensure Node.js is properly installed and accessible
- **Permission Errors**: Run terminal as Administrator if you encounter permission issues
- **Network Issues**: Ensure Windows Firewall allows Node.js and Expo connections

#### macOS
- **Permission Issues**: Allow terminal to access network connections in System Preferences > Security & Privacy
- **Xcode Issues**: Ensure Xcode command line tools are installed: `xcode-select --install`
- **iOS Simulator Issues**: Reset simulator if experiencing persistent issues: `xcodebuild -runFirstLaunch`

#### Common Issues (All Platforms)
- **Port Conflicts**: Ensure port 3000 is available for the backend server
- **Network Issues**: On physical devices, use your computer's LAN IP instead of localhost
- **CORS Issues**: The backend includes enhanced CORS configuration for cross-platform compatibility
- **Expo Issues**: Clear Expo cache if experiencing issues: `npx expo install --fix`
- **Dependency Issues**: Clear npm cache if needed: `npm cache clean --force`

### Development Issues
- Expo warns some packages should be updated for best compatibility. Follow Expo's suggestions for `react-native-safe-area-context`, `react-native-screens`, and `react-native-gesture-handler` versions if needed.
- On device testing, ensure your phone can reach your computer's LAN IP and firewall allows connections to `PORT=3000`.
- If EAS is not found globally, use `npx eas ...` (script handles this).

### Build Issues
- **iOS Build Issues**: Ensure Xcode and iOS Simulator are properly configured
- **Android Build Issues**: Ensure Android Studio and emulators are properly set up
- **Web Build Issues**: Ensure all web dependencies are properly installed

## Technologies
- Frontend: Expo, React Native, TypeScript
- Backend: Node.js, Express
- UI: React Native Paper
- Navigation: React Navigation
- HTTP: Axios
- Build & Deploy: EAS (Expo Application Services)

## Contributing
1. Fork the repo
2. Create a feature branch
3. Implement changes with tests
4. Open a PR

## License
MIT

## Support
Open an issue or contact the team.
