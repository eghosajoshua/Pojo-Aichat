# Pojo AI Chat

Pojo AI Chat is a React Native app built with Expo. It lets you chat with Gemini and send images for analysis. The demo limits each local tester profile to 20 Gemini requests per day.

## Requirements

- Node.js 18 or newer
- npm
- Expo Go for quick device testing, or an Expo Application Services (EAS) account for installable tester builds

Install the project dependencies from the project folder:

```bash
npm install
```

## Configure Gemini

1. Copy `.env.example` to `.env`.
2. Set `EXPO_PUBLIC_GEMINI_API_KEY` in `.env` to your Gemini API key.
3. Restart Expo after changing the key.

## Test With Expo Go

Start the Expo development server:

```bash
npm start
```

Open Expo Go on your phone and scan the QR code shown in the terminal or browser. Keep your phone and computer on the same network. If your network blocks the connection, try:

```bash
npx expo start --tunnel
```

This project currently uses Expo SDK 50. Expo Go supports a limited set of SDK versions; if Expo Go reports an SDK version mismatch, use an EAS preview build or upgrade the project SDK before testing with Expo Go.

## Build For Testers With EAS

The `preview` profile is configured for internal distribution and uses the EAS `preview` environment. A local `.env` file is not sent to EAS, so add the API key to the EAS project before building. From the project folder, run:

```bash
npx eas-cli@latest login
npx eas-cli@latest env:set --environment preview --name EXPO_PUBLIC_GEMINI_API_KEY --value "your-gemini-api-key" --visibility sensitive
npx eas-cli@latest build --profile preview --platform android
```

The key is embedded in the app because it uses the `EXPO_PUBLIC_` prefix; treat it as public and restrict it in Google AI Studio. Use the same EAS environment variable for iOS preview builds.

To build for iOS instead:

```bash
npx eas-cli@latest build --profile preview --platform ios
```

When the build finishes, share the installation link provided by EAS with your testers. iOS internal builds may require the testers' devices to be registered. The `production` profile is for release builds, not the usual tester workflow.

## Test The App

On a device or EAS build, check that you can:

- Open a chat and send a text message.
- Choose an image and ask Gemini about it.
- Use the camera, if testing on a device with a camera.
- Confirm the daily demo limit after 20 Gemini requests.

The demo limit is stored locally on the device, so it is intended for basic testing, not as a secure quota. Reinstalling the app or clearing its storage may reset the limit.

## Other Commands

```bash
npm test
npm run lint
```

## Contact

Ehimwinriabe Eghosa - [eghosajosh@gmail.com](mailto:eghosajosh@gmail.com)

Author Portfolio: [https://www.eghosa.site](https://www.eghosa.site)
