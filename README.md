# Unique Pod

[![CodeQL](https://github.com/jongan69/kudos/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jongan69/kudos/actions/workflows/codeql-analysis.yml)

-----

A full stack monorepo with

- React Native
- Nextjs
- Nhost SDK

built under The XRP NFT 2022 Hackathon

Mobile: <https://expo.dev/@jongan69/uniquepod>

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
- [x] Nhost - React Native SDK
- [ ] Mobile App Screens
        1. Onboard Screen ✅
        2. Login Screen -> Nhost ✅ (GUEST)
        3. Sign Up Screen -> Nhost ✅ (GUEST)
        4. Homescreen 1 -> Display Owned -> getNfts()
        5. Homescreen 2 -> Display Available -> All Brokered NFTs
        6. Featured Screen
        7. Payment Screen
        8. About screen
        9. Purchase Screen
        10. Mint Screen ✅

Note: Do not use `--updateSnapshot` from to enable proper jest testing.

ideas for release: <https://www.obytes.com/blog/react-native-ci-cd-github-action>
