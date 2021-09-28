import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Barometer, BarometerMeasurement } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { styles } from "../../constants/SensorsStyles";

export default function BarometerInfo() {
  const [data, setData] = useState<BarometerMeasurement>({
    pressure: 0,
  });

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    subscribe();
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  const subscribe = () => {
    setSubscription(
      Barometer.addListener((barometerData) => {
        setData(barometerData);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const { pressure, relativeAltitude } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barometer:</Text>
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

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.abs(Math.floor(n * 100) / 100);
}
