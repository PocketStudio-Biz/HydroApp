# Apple App Store Deployment Guide

## Prerequisites Checklist

### 1. Apple Developer Account ✅
- [ ] Enroll in Apple Developer Program ($99/year)
- [ ] Create App Store Connect account
- [ ] Set up Two-Factor Authentication

### 2. App Configuration ✅
- [ ] Update `app.json` with your app details
- [ ] Set unique bundle identifier
- [ ] Configure app icons and splash screens
- [ ] Set app name and version

### 3. Certificates & Provisioning ✅
- [ ] Create iOS Distribution Certificate
- [ ] Create App Store Provisioning Profile
- [ ] Configure App Store Connect app record

## Step-by-Step Deployment Process

### Step 1: Configure Your App Details

1. **Update app.json**:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    }
  }
}
```

2. **Update eas.json** with your Apple credentials:
```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@icloud.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCD123456"
      }
    }
  }
}
```

### Step 2: Install Required Tools

```bash
# Install EAS CLI (already done)
npm install -g eas-cli

# Login to Expo
eas login

# Configure your project
eas build:configure
```

### Step 3: Create App Store Connect Record

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click "My Apps" → "+" → "New App"
3. Fill in app details:
   - **Name**: Your app name
   - **Bundle ID**: com.yourcompany.yourapp
   - **SKU**: Unique identifier
   - **Primary Language**: English

### Step 4: Build for Production

```bash
# Build for iOS App Store
eas build --platform ios --profile production

# Or use the production build
eas build --platform ios --non-interactive
```

### Step 5: Submit to App Store

```bash
# Submit to App Store for review
eas submit --platform ios

# Or submit with specific profile
eas submit --platform ios --profile production
```

### Step 6: App Store Connect Configuration

After submission, complete these in App Store Connect:

1. **App Information**:
   - App Name
   - Subtitle
   - Primary Category
   - Secondary Category
   - Privacy Policy URL
   - Terms of Service URL

2. **Pricing and Availability**:
   - Price Tier (Free or Paid)
   - Availability by country
   - Business Model (Free, Freemium, Paid)

3. **App Privacy**:
   - Data Collection Declaration
   - Privacy Practices
   - Required if collecting user data

4. **App Store Screenshots**:
   - iPhone 6.7" Display (1290x2796)
   - iPhone 6.5" Display (1242x2688)
   - iPhone 5.5" Display (1242x2208)
   - iPad Pro (12.9") (2048x2732)

5. **App Preview Video** (Optional but recommended)

### Step 7: Upload App Store Assets

Create these assets before submission:

1. **App Icon**: 1024x1024px PNG
2. **Screenshots**: Multiple device sizes
3. **Description**: 4000 character limit
4. **Keywords**: 100 character limit
5. **Support URL**: Your support website
6. **Marketing URL**: Your marketing website (optional)

## Post-Submission Process

### Review Timeline
- **Standard Review**: 1-7 days
- **Expedited Review**: Available for critical fixes
- **Rejection**: Common reasons and fixes provided

### Common Rejection Reasons
1. **Performance Issues**: App crashes or slow loading
2. **Design Issues**: Poor UI/UX design
3. **Content Issues**: Inappropriate or misleading content
4. **Legal Issues**: Missing privacy policy or terms
5. **Technical Issues**: Non-compliant APIs or features

### After Approval
1. **Release Options**:
   - Manual Release (you control when)
   - Automatic Release (immediate)
   - Scheduled Release (specific date/time)

2. **Marketing**:
   - App Store Optimization (ASO)
   - Social media promotion
   - Press release
   - User acquisition campaigns

## Troubleshooting

### Build Issues
```bash
# Clean build cache
eas build --platform ios --clear-cache

# Check build logs
eas build:view --build-id YOUR_BUILD_ID
```

### Certificate Issues
- Regenerate certificates in Apple Developer Portal
- Update provisioning profiles
- Check bundle identifier matches

### Submission Issues
- Verify all required fields in App Store Connect
- Check app meets App Store Review Guidelines
- Ensure proper app categorization

## Important Notes

1. **Apple Review Guidelines**: Read and follow Apple's App Store Review Guidelines
2. **Privacy**: Include privacy policy if collecting user data
3. **Age Rating**: Accurately rate your app content
4. **Testing**: Test on multiple devices before submission
5. **Backup**: Keep backups of all certificates and keys

## Support Resources

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Expo EAS Documentation](https://docs.expo.dev/build/introduction/)
- [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)