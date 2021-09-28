import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gyroscope } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";

export default function GyroscopeInfo() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<Subscription | null>(null);


  const subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gyroscope:</Text>
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
