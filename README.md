# 🌐 Ion Browser

A modern, fast, and minimal mobile browser built using **React Native Expo** with support for **WebView**, smooth **animations (Moti)**, and **utility-first styling (NativeWind)**.

---

## 🚀 Features

- 📱 Built with [Expo SDK 52+](https://docs.expo.dev/)
- 🧭 File-based navigation via [expo-router](https://expo.dev/router)
- 🌐 Embedded web browsing using `react-native-webview`
- 💨 Tailwind-like styling with [NativeWind](https://www.nativewind.dev/)
- 🎯 Smooth micro-interactions with [Moti](https://moti.fyi/)
- 📑 Bookmarks & browsing history (AsyncStorage)
- ⚡ Fast and responsive UI

---

## 🗂️ Folder Structure

```
ionbrowser/
├── app/
│   ├── (adons)/
│   │   └── welcome.tsx
│   ├── (tabs)/
│   │   └── home.tsx
│   └── _layout.tsx
│   └── +not-found.tsx
│   └── index.tsx
├── assets/
│   └── images/
│       └── icon.png
├── components/
│   └── SplashBackground.tsx
├── utils/
│   └── storage.js
├── node_modules/
├── package.json
├── README.md
└── ...
```

---

## 🛠️ Tech Stack

- **React Native** (with Expo SDK)
- **expo-router** (file-based navigation)
- **react-native-webview** (web browsing)
- **NativeWind** (Tailwind CSS for React Native)
- **Moti** (animations & micro-interactions)
- **AsyncStorage** (local storage)
- **TypeScript** (recommended)

---

## 📦 Getting Started

1. Clone the repo
2. Run `npm install` or `yarn install`
3. Create a prebuild `npx expo prebuild`
4. Start the app with `npx expo start`

---

## 📄 License

This project is open source.
