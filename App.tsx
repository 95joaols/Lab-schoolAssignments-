import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import BackgroundImage from "./components/BackgroundImage";
import BackgroundImageProvider from "./contexts/BackgroundImageContext";
import BackgroundSelectorScreen from "./screens/BackgroundSelectorScreen";
import React, { useState } from 'react';
import HomeScreen from './screens/homeScreen';
import MapScreen from './screens/mapScreen';
import InfoScreen from './screens/InfoScreen';
import CameraScreen from './screens/cameraScreen';
import { styles } from "./constants/Styles";
import ScreenOrientationProvider from "./contexts/ScreenOrientationContext";


export default function App() {
  const [page, setPage] = useState("home");

  const goHome = () => setPage("home");

  const selectedPage = () => {
    switch (page) {
      case "camera":
        return <CameraScreen />;
      case "info":
        return <InfoScreen />;
      case "background":
        return <BackgroundSelectorScreen onSetPage={setPage} />;
      case "map":
        return <MapScreen onGoBack={goHome} />;
      case "home":
        return <HomeScreen onSetPage={setPage} />;
    }
  };

  return (
    <View style={styles.flex}>
      <ScreenOrientationProvider>
        <BackgroundImageProvider>
          <BackgroundImage />
          <StatusBar style="auto" />
          {selectedPage()}
        </BackgroundImageProvider>
      </ScreenOrientationProvider>
    </View>
  );
}
