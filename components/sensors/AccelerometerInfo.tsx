import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "../../style/SensorsStyles";
import { AccelerometerContext } from "../../contexts/sensors/AccelerometerContext";

export default function AccelerometerInfo() {
  const accelerometer = useContext(AccelerometerContext)

  if (accelerometer.accelerometerInfo) {
    const { x, y, z } = accelerometer.accelerometerInfo;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
        </Text>
        <Text style={styles.paragraph}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <Text style={styles.paragraph}>Permissions:{accelerometer.granted?.status}</Text>

      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Accelerometer:
        </Text>
        <Text style={styles.paragraph}>
          No Data
        </Text>
        <Text style={styles.paragraph}>Permissions:{accelerometer.granted?.status}</Text>
      </View>
    )
  }
}

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.abs(Math.floor(n * 100) / 100);
}
