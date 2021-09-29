import { PermissionResponse } from "expo-camera";
import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../constants/SensorsStyles";

export default function AccelerometerInfo() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [granted, setGranted] = useState<PermissionResponse | null>(null)


  const Setup = () => {
    (async () => {
      const respond = await Accelerometer.requestPermissionsAsync()
      setGranted(respond);
      if (respond.granted) {
        Accelerometer.addListener((accelerometerData) => {
          setData(accelerometerData);
        });
      }
    })();
  };

  const Remove = () => {
    Accelerometer.removeAllListeners();
  };

  useEffect(() => {
    Setup();
    return () => Remove();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
      </Text>
      <Text style={styles.paragraph}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <Text style={styles.paragraph}>Permissions:{granted?.status}</Text>

    </View>
  );
}

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.abs(Math.floor(n * 100) / 100);
}
