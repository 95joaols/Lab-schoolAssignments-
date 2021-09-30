import React, { useContext } from "react";
import {
  Platform, Text, View
} from "react-native";
import { styles } from "../../constants/SensorsStyles";
import { BarometerContext } from "../../contexts/sensors/BarometerContext";

export default function BarometerInfo() {
  const barometer = useContext(BarometerContext);

  if (barometer.barometerInfo) {
    const { pressure, relativeAltitude } = barometer.barometerInfo;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Barometer:</Text>
        <Text style={styles.paragraph}>Permissions:{barometer.granted?.status}</Text>

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
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Barometer:</Text>
        <Text style={styles.paragraph}>Permissions:{barometer.granted?.status}</Text>
        <Text style={styles.paragraph}>No Data</Text>
      </View>
    );
  }

  function round(n: number) {
    if (!n) {
      return 0;
    }
    return Math.abs(Math.floor(n * 100) / 100);
  }
}
