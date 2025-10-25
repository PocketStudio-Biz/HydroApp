#!/bin/bash

# Apple App Store Deployment Script for HydroApp
# This script guides you through the deployment process

echo "🚀 HydroApp Apple App Store Deployment Script"
echo "=============================================="
echo ""

# Resolve EAS CLI command
EAS_CMD="eas"
if ! command -v eas >/dev/null 2>&1; then
    echo "❌ EAS CLI not found. Installing local eas-cli..."
    npm install --save-dev eas-cli || {
        echo "❌ Failed to install local eas-cli. Please install manually: npm i -D eas-cli"; exit 1;
    }
    EAS_CMD="npx eas"
fi

# Check if user is logged in to Expo
echo "🔑 Checking Expo login status..."
$EAS_CMD whoami
if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Expo. Please login first:"
    echo "Run: $EAS_CMD login"
    exit 1
fi

echo "✅ Logged in to Expo"
echo ""

# Configuration Check
echo "📋 Configuration Check"
echo "====================="
echo ""
echo "Please ensure you have updated the following files:"
echo "1. app.json - Update bundle identifier, app name, version"
echo "2. eas.json - Update Apple ID, App Store Connect App ID, Team ID"
echo "3. App Store Connect - Create app record if not exists"
echo ""

read -p "Have you completed the configuration updates? (y/n): " config_ready
if [ "$config_ready" != "y" ]; then
    echo "Please update the configuration files first, then run this script again."
    exit 1
fi

echo ""
echo "🔨 Starting Production Build"
echo "============================"
echo ""

# Build for iOS App Store
echo "Building for iOS App Store..."
$EAS_CMD build --platform ios --profile production

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    
    read -p "Do you want to submit to App Store now? (y/n): " submit_now
    if [ "$submit_now" == "y" ]; then
        echo "📤 Submitting to App Store..."
$EAS_CMD submit --platform ios --profile production
        
        if [ $? -eq 0 ]; then
            echo "✅ App submitted successfully!"
            echo ""
            echo "📱 Next Steps:"
            echo "1. Go to App Store Connect"
            echo "2. Complete app information (description, screenshots, etc.)"
            echo "3. Set pricing and availability"
            echo "4. Submit for review"
            echo ""
            echo "🔗 App Store Connect: https://appstoreconnect.apple.com"
        else
            echo "❌ Submission failed. Please check the error messages above."
            echo "You can manually submit using: eas submit --platform ios"
        fi
    else
        echo "You can submit later using: eas submit --platform ios"
    fi
else
    echo "❌ Build failed. Please check the error messages above."
    echo "Common issues:"
    echo "- Check your Apple Developer certificates"
    echo "- Verify bundle identifier matches App Store Connect"
    echo "- Check for build errors in the logs"
fi

echo ""
echo "🎉 Deployment process completed!"
echo "Check the deployment guides for next steps."