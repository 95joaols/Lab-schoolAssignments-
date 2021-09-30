import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "../../constants/SensorsStyles";
import { GyroscopeContext } from "../../contexts/sensors/GyroscopeContext";

export default function GyroscopeInfo() {
  const gyroscope = useContext(GyroscopeContext)


  if (gyroscope.gyroscopeInfo) {
    const { x, y, z } = gyroscope.gyroscopeInfo;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gyroscope:</Text>
        <Text style={styles.paragraph}>Permissions:{gyroscope.granted?.status}</Text>

        <Text style={styles.paragraph}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gyroscope:</Text>
        <Text style={styles.paragraph}>Permissions:{gyroscope.granted?.status}</Text>
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
