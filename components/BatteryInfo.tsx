import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "../style/SensorsStyles";
import { BatteryContext } from "../contexts/sensors/BatteryContext";

export default function BatteryInfo() {
  const Battery = useContext(BatteryContext)


  const { batteryLevel, batteryState, lowPowerMode } = Battery.powerState;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PowerState:</Text>
      <Text style={styles.paragraph}>
        batteryLevel: {round(batteryLevel * 100)}
      </Text>
      <Text style={styles.paragraph}>batteryState: {batteryState}</Text>
      <Text style={styles.paragraph}>lowPowerMode: {String(lowPowerMode)}</Text>
    </View>
  );
}

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.abs(Math.floor(n * 100) / 100);
}
