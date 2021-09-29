import { Gyroscope } from "expo-sensors";
import { PermissionResponse } from "expo-sensors/build/Pedometer";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../constants/SensorsStyles";

export default function GyroscopeInfo() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [granted, setGranted] = useState<PermissionResponse>()

  useEffect(() => {
    (async () => {
      const respond = await Gyroscope.requestPermissionsAsync()
      setGranted(respond);
      if (respond.granted) {
        Gyroscope.addListener((gyroscopeData) => {
          setData(gyroscopeData);
        });
      }
    })();
    return Gyroscope.removeAllListeners;
  }, []);

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gyroscope:</Text>
      <Text style={styles.paragraph}>Permissions:{granted?.status}</Text>

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
