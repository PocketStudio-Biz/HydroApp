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
Update the `eas.json` file with your Apple Developer information:
- Replace `your-apple-id@example.com` with your actual Apple ID
- Replace `your-app-store-connect-app-id` with your App Store Connect App ID
- Replace `your-apple-team-id` with your Apple Team ID

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

Update the `API_BASE_URL` in `App.tsx` to point to your production backend.

## Configuration Files

### Environment Variables
Create a `.env` file in the backend directory:
```
PORT=3000
NODE_ENV=production
DATABASE_URL=your_production_database_url
```

### iOS Specific Configuration
Update `app.json` with your app details:
```json
{
  "expo": {
    "name": "HydroApp",
    "slug": "hydroapp",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.hydroapp"
    }
  }
}
```

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