import { PermissionResponse } from "expo-camera";
import { Barometer, BarometerMeasurement } from "expo-sensors";
import React, { useEffect, useState } from "react";
import {
  Platform, Text, View
} from "react-native";
import { styles } from "../../constants/SensorsStyles";

export default function BarometerInfo() {
  const [data, setData] = useState<BarometerMeasurement>({
    pressure: 0,
  });
  const [granted, setGranted] = useState<PermissionResponse>()

  useEffect(() => {
    (async () => {
      const respond = await Barometer.requestPermissionsAsync()
      setGranted(respond);
      Barometer.addListener((barometerData) => {
        setData(barometerData);
      });
    })();
    return Barometer.removeAllListeners;
  }, []);

  const { pressure, relativeAltitude } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barometer:</Text>
      <Text style={styles.paragraph}>Permissions:{granted?.status}</Text>

      <Text style={styles.paragraph}>Pressure: {round(pressure)} hPa</Text>
      <Text style={styles.paragraph}>
        Relative Altitude:{" "}
        {Platform.OS === "ios"
          ? `${relativeAltitude} m`
          : `Only available on iOS`}
      </Text>
    </View>
  );
}

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.abs(Math.floor(n * 100) / 100);
}
