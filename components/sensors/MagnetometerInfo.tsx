import { Magnetometer } from "expo-sensors";
import { PermissionResponse } from "expo-sensors/build/Pedometer";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../constants/SensorsStyles";

export default function MagnetometerInfo() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [granted, setGranted] = useState<PermissionResponse | null>(null)

  const Setup = () => {
    (async () => {
      const respond = await Magnetometer.requestPermissionsAsync()
      setGranted(respond);
      if (respond.granted) {
        Magnetometer.addListener((result) => {
          setData(result);
        });
      }
    })();
  };

  const Remove = () => {
    Magnetometer.removeAllListeners();
  };

  useEffect(() => {
    Setup();
    return () => Remove();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Magnetometer:</Text>
      <Text style={styles.paragraph}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
    </View>
  );
}

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

