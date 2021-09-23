import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";

export default function PedometerInfo() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState({
    isPedometerAvailable: "checking",
  });
  const [pastStepCount, setPastStepCount] = useState({
    steps: 0,
  });
  const [currentStepCount, setCurrentStepCount] = useState({
    steps: 0,
  });

  const subscribe = () => {
    setSubscription(
      Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result);
      })
    );
  };
  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

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

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 1);
  Pedometer.getStepCountAsync(start, end).then(
    (result) => {
      setPastStepCount(result);
    },
    (error) => {
      setPastStepCount({ steps: -1 });
    }
  );

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
