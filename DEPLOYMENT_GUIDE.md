# HydroApp Deployment Guide

## Overview
This guide will help you deploy the HydroApp React Native application to TestFlight for iOS testing.

## Prerequisites
- Apple Developer Account
- Expo CLI installed
- EAS CLI installed
- Node.js and npm installed

## Setup Steps

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```

### 3. Configure EAS Build
Set the following environment variables (locally or in your CI) so credentials are not stored in source control:
- `APPLE_ID`
- `APP_STORE_CONNECT_APP_ID`
- `APPLE_TEAM_ID`

They map to the `${...}` placeholders in `eas.json`. You can set them temporarily when building:
```bash
export APPLE_ID="name@example.com"
export APP_STORE_CONNECT_APP_ID="1234567890"
export APPLE_TEAM_ID="ABCDE12345"
```

### 4. Build for iOS
```bash
eas build --platform ios
```

### 5. Submit to TestFlight
```bash
eas submit --platform ios
```

## Backend Deployment

### Local Development
```bash
# Start backend server
npm run backend

# Start frontend and backend together
npm run dev
```

### Production Backend
For production deployment, consider using:
- Heroku
- Vercel
- AWS
- Digital Ocean

Set `EXPO_PUBLIC_API_BASE_URL` in your build environment (or `.env.production`) to point to your production backend. The mobile app reads this value automatically.

## Configuration Files

### Environment Variables
Configure `.env` in the project root:
```
PORT=3000
NODE_ENV=production
EXPO_PUBLIC_API_PORT=3001
EXPO_PUBLIC_API_BASE_URL=https://api.example.com/api
CORS_ALLOWED_ORIGINS=https://app.example.com,https://studio.expo.dev
```

### iOS Specific Configuration
Provide app identifiers either via `.env` or by editing `app.config.ts`:
- `EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER`
- `EXPO_PUBLIC_ANDROID_PACKAGE`
- `EXPO_PUBLIC_APP_NAME`
- `EXPO_PUBLIC_APP_SLUG`
- `EXPO_PUBLIC_APP_VERSION`

## Testing

### Local Testing
1. Start the backend: `npm run backend`
2. Start the frontend: `npm start`
3. Test on iOS Simulator or Android Emulator

### TestFlight Testing
1. Build and submit using EAS
2. Invite testers through App Store Connect
3. Monitor crash reports and feedback

## Troubleshooting

### Common Issues
1. **Backend Connection Issues**: Ensure the backend URL is accessible from the device
2. **Build Failures**: Check iOS certificates and provisioning profiles
3. **Submission Issues**: Verify all required metadata is provided

### Support
For issues with:
- Expo/EAS: Check Expo documentation
- React Native: Check React Native documentation
- Backend: Check Express.js documentation
