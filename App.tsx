import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import BackgroundImage from "./components/BackgroundImage";
import BackgroundImageProvider from "./contexts/BackgroundImageContext";
import BackgroundSelectorScreen from "./screens/BackgroundSelectorScreen";
import React, { useState } from "react";
import HomeScreen from "./screens/homeScreen";
import MapScreen from "./screens/mapScreen";
import InfoScreen from "./screens/InfoScreen";

export default function App() {
  const [page, setPage] = useState("home");

  const goHome = () => setPage("home");

  const selectedPage = () => {
    switch (page) {
      case "camera":
        return <HomeScreen onSetPage={setPage} />;
      case "info":
        return <InfoScreen />;
      case "background":
        return <BackgroundSelectorScreen onSetPage={setPage} />;
      case "map":
        return <MapScreen />;
      case "home":
        return <HomeScreen onSetPage={setPage} />;
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundImageProvider>
        <BackgroundImage />
        <StatusBar style="auto" />
        {selectedPage()}
      </BackgroundImageProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
