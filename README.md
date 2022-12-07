# Unique Pod

[![CodeQL](https://github.com/jongan69/kudos/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jongan69/kudos/actions/workflows/codeql-analysis.yml)

-----

A full stack monorepo with

- React Native
- Nextjs
- Nhost SDK

built under The XRP NFT 2022 Hackathon

Mobile:

Web:

## Usage

`yarn ios` - Run iOS App

`yarn android` - Run Android App

`yarn web` - Start Nextjs app

### Features

- Has nhost for Graph QL DB if needed
- Has Nextjs App for API
- File Reading Functions

in a new `.env`
   backendUrl: "YOUR_NHOST_BACKEND_URL",

in `App.js`
  clientStorageType: "expo-secure-storage",

To Run Nextjs App:
  `yarn web` in root directory

### To do

- [x] Expo React Native XRP Mobile App
- [x] Figma Screen Designs
- [x] Lucid Charts User Journey Diagram
- [ ] Nextjs App + Thirdwebjs Auth - Nextjs SDK
- [ ] Nhost - React Native SDK
- [ ] Mobile App Screens
        1. Onboard Screen
        2. Login Screen -> Nhost
        3. Sign Up Screen -> Nhost
        4. Homescreen 1
        5. Swap Crypto Screen
        6. About screen
        7. Purchase Screen
        8. Mint Screen
