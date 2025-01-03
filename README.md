# react native app created with expo

- created using the command:

npx create-expo-app lucky_number_react_native

- to run use:

npx expo start

# Android platform

- create a build on Eas Cloud:

eas build -p android --profile preview

- Generate native Android files

npx expo prebuild

-----

- First, install the EAS CLI globally:

npm install -g eas-cli

- Login to your Expo account:

eas login

- Initialize EAS Build in your project:

eas build:configure

- Build the APK: on the cloud:

eas build -p android --profile preview

- The build process will start in the Expo cloud servers. Once completed, you'll receive a URL to download your APK file.

# Alternative local build method using Expo:

- Install expo-dev-client:

npx expo install expo-dev-client

- Generate native Android files:

npx expo prebuild

- Build on the cloud

eas build --platform android

- Build locally:

cd android && ./gradlew assembleRelease

The APK will be available at: android/app/build/outputs/apk/release/app-release.apk

Key points:

The cloud build (EAS) is recommended for production builds
Local builds are great for testing
Make sure to configure proper signing keys for release builds
The build process might take several minutes