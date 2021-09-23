import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Device from "expo-device";

export default function DeviceInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DeviceInfo:</Text>
      <Text style={styles.paragraph}>IsDevice: {Device.isDevice} </Text>
      <Text style={styles.paragraph}>brand: {Device.brand} </Text>
      <Text style={styles.paragraph}>manufacturer: {Device.manufacturer} </Text>
      <Text style={styles.paragraph}>modelName: {Device.modelName} </Text>
      {Platform.OS === "ios" && (
        <Text style={styles.paragraph}>modelId: {Device.modelId} </Text>
      )}
      {Platform.OS === "ios" && (
        <Text style={styles.paragraph}>productName: {Device.productName} </Text>
      )}
      <Text style={styles.paragraph}>osName: {Device.osName} </Text>
      <Text style={styles.paragraph}>osVersion: {Device.osVersion} </Text>
      {Platform.OS === "android" && (
        <Text style={styles.paragraph}>
          platformApiLevel: {Device.platformApiLevel}{" "}
        </Text>
      )}
      <Text style={styles.paragraph}>deviceName: {Device.deviceName} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "left",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "left",
  },
});
