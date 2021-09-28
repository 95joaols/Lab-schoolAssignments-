import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

export default function LocationInfo() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      Location.getCurrentPositionAsync()
        .then((location) => setLocation(location))
        .catch((error) => setErrorMsg(error.message));
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location:</Text>
      <Text style={styles.paragraph}>Permissions:{status}</Text>

      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    paddingTop: 15,
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
