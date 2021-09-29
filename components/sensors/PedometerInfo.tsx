import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Subscription } from "expo-sensors/build/Pedometer";
import { Pedometer } from "expo-sensors";
import { styles } from "../../constants/SensorsStyles";

export default function PedometerInfo() {
  const [subscription, setSubscription] = useState<Subscription>();
  const [isPedometerAvailable, setIsPedometerAvailable] = useState({
    isPedometerAvailable: "checking",
  });
  const [pastStepCount, setPastStepCount] = useState({
    steps: 0,
  });
  const [currentStepCount, setCurrentStepCount] = useState({
    steps: 0,
  });




  useEffect(() => {
    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable({ isPedometerAvailable: String(result) });
      },
      (error) => {
        setIsPedometerAvailable({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error,
        });
      }
    );
  });

  useEffect(() => {
    if (isPedometerAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);
      Pedometer.getStepCountAsync(start, end)
        .then(
          (result) => {
            setPastStepCount(result);
          },
          (error) => {
            setPastStepCount({ steps: -1 });
          }
        )
        .catch((error) => { });
    }
  }, [isPedometerAvailable]);

  useEffect(() => {
    if (isPedometerAvailable) {
      setSubscription(
        Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result);
        })
      );
    }
    return () => {
      subscription && subscription.remove();
      setSubscription(undefined);
    }
  }, [isPedometerAvailable]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>PedometerInfo:</Text>
      <Text style={styles.paragraph}>
        isAvailable:{" "}
        {isPedometerAvailable.isPedometerAvailable}
      </Text>
      {Platform.OS === "ios" && (
        <Text style={styles.paragraph}>
          Steps taken in the last 24 hours: {pastStepCount.steps}
        </Text>
      )}
      <Text style={styles.paragraph}>
        Walk! And watch this go up: {currentStepCount.steps}
      </Text>
    </View>
  );
}
