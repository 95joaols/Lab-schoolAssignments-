import React, { useContext } from "react";
import { Platform, Text, View } from "react-native";
import { styles } from "../../constants/SensorsStyles";
import { PedometerContext } from "../../contexts/sensors/PedometerContext";

export default function PedometerInfo() {
  const Pedometer = useContext(PedometerContext)


  if (Pedometer.isPedometerAvailable !== "true") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>PedometerInfo:</Text>
        <Text style={styles.paragraph}>
          isAvailable:{Pedometer.isPedometerAvailable}
        </Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>PedometerInfo:</Text>
        <Text style={styles.paragraph}>
          isAvailable:{" "}
          {Pedometer.isPedometerAvailable}
        </Text>
        {Platform.OS === "ios" && (
          <Text style={styles.paragraph}>
            Steps taken in the last 24 hours: {Pedometer.pastStepCount}
          </Text>
        )}
        <Text style={styles.paragraph}>
          Walk! And watch this go up: {Pedometer.currentStepCount}
        </Text>
      </View>
    );
  }
}
