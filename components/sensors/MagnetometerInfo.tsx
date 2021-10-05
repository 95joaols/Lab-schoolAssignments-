import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "../../style/SensorsStyles";
import { MagnetometerContext } from "../../contexts/sensors/MagnetometerContext";

export default function MagnetometerInfo() {
  const magnetometer = useContext(MagnetometerContext)

  if (magnetometer.barometerInfo) {
    const { x, y, z } = magnetometer.barometerInfo;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Magnetometer:</Text>
        <Text style={styles.paragraph}>Permissions:{magnetometer.granted?.status}</Text>
        <Text style={styles.paragraph}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Magnetometer:</Text>
        <Text style={styles.paragraph}>Permissions:{magnetometer.granted?.status}</Text>
        <Text style={styles.paragraph}>
          No Data
        </Text>
      </View>
    );
  }
}

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

