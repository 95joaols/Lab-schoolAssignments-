import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import BackgroundImage from "./components/BackgroundImage";
import BackgroundImageProvider from "./contexts/BackgroundImageContext";
import BackgroundSelectorScreen from "./screens/BackgroundSelectorScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <BackgroundImageProvider>
        <BackgroundImage />
        <StatusBar style="auto" />
        <BackgroundSelectorScreen />
      </BackgroundImageProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
