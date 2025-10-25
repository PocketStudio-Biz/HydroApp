import { ConfigContext, ExpoConfig } from 'expo/config';
import 'dotenv/config';

const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME || 'HydroApp';
const APP_SLUG = process.env.EXPO_PUBLIC_APP_SLUG || 'hydroapp';
const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0';
const IOS_BUNDLE_IDENTIFIER =
  process.env.EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER ||
  process.env.IOS_BUNDLE_IDENTIFIER ||
  'com.yourcompany.hydroapp';
const IOS_BUILD_NUMBER = process.env.EXPO_PUBLIC_IOS_BUILD_NUMBER || '1.0.0';
const ANDROID_PACKAGE =
  process.env.EXPO_PUBLIC_ANDROID_PACKAGE ||
  process.env.ANDROID_PACKAGE ||
  'com.yourcompany.hydroapp';
const PROJECT_ID = process.env.EAS_PROJECT_ID || process.env.EXPO_PROJECT_ID || undefined;
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  null;
const ENVIRONMENT = process.env.APP_ENV || process.env.NODE_ENV || 'development';

const createConfig = (config: Partial<ExpoConfig>): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: APP_SLUG,
  version: APP_VERSION,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: IOS_BUNDLE_IDENTIFIER,
    buildNumber: IOS_BUILD_NUMBER,
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
        NSAllowsLocalNetworking: true
      },
      UILaunchStoryboardName: 'SplashScreen'
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: ANDROID_PACKAGE
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: ['expo-localization'],
  extra: {
    ...(config.extra || {}),
    environment: ENVIRONMENT,
    apiBaseUrl: API_BASE_URL,
    eas: {
      ...(config.extra?.eas || {}),
      projectId: PROJECT_ID
    }
  }
});

export default ({ config }: ConfigContext): ExpoConfig => createConfig(config);
