import "./src/constants/global";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/screens/navigation";
import { NhostClient, NhostReactProvider } from "@nhost/react";
import * as SecureStore from "expo-secure-store";
import React from "react";
import AppProvider from "./src/context/AppProvider";

// For Nhost DB
import { NHOST_BACKEND_URL } from "@env";
import { Toasts } from '@backpackapp-io/react-native-toast';

const nhost = new NhostClient({
  backendUrl: NHOST_BACKEND_URL,
  clientStorageType: "expo-secure-storage",
  clientStorage: SecureStore,
});

// In Development, remove and test before PROD
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppProvider>
        <NhostReactProvider nhost={nhost}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
            <Toasts />
          </SafeAreaProvider>
        </NhostReactProvider>
      </AppProvider>
    );
  }
}