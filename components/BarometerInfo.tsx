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

export default function BarometerInfo() {
  const [data, setData] = useState<BarometerMeasurement>({
    pressure: 0,
  });

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    toggle();
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  const toggle = () => {
    if (subscription) {
      unsubscribe();
    } else {
      subscribe();
    }
  };

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
    <View style={styles.sensor}>
      <Text>Barometer:</Text>
      <Text>Pressure: {round(pressure)} hPa</Text>
      <Text>
        Relative Altitude:{" "}
        {Platform.OS === "ios"
          ? `${relativeAltitude} m`
          : `Only available on iOS`}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggle} style={styles.button}>
          <Text>Toggle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.abs(Math.floor(n * 100) / 100);
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
});
