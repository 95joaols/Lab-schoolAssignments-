import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Subscription } from "expo-sensors/build/Pedometer";
import { Pedometer } from "expo-sensors";

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
  useEffect(() => {
    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable({ isPedometerAvailable: String(result) });
        console.log("setIsPedometerAvailable", result);
      },
      (error) => {
        setIsPedometerAvailable({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error,
        });
      }
    );
  }, []);
  useEffect(() => {
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
      .catch((error) => {});
  }, [isPedometerAvailable]),
    useEffect(() => {
      subscribe();
      return () => unsubscribe();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PedometerInfo:</Text>
      <Text style={styles.paragraph}>
        Pedometer.isAvailableAsync():{" "}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    paddingTop: 15,
  },
  title: {
    fontSize: 20,
    textAlign: "left",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "left",
  },
});
