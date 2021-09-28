import React, { useEffect, useState } from "react";
import * as Battery from "expo-battery";
import { BatteryState, Subscription } from "expo-battery";
import { StyleSheet, Text, View } from "react-native";
import UseObjectState from "../hooks/UseObjectState";

export default function BatteryInfo() {
  const forceUpdate = useForceUpdate();
  const [powerState, setPowerState] = UseObjectState({
    batteryLevel: -1,
    batteryState: BatteryState.UNKNOWN,
    lowPowerMode: false,
  });
  const [batteryStateSubscriptions, setBatteryStateSubscriptions] = useState<
    Subscription[] | null
  >(null);

  const subscribe = () => {
    Battery.getPowerStateAsync().then((State) => setPowerState(State));

    setBatteryStateSubscriptions([
      Battery.addBatteryLevelListener((batteryLevel) => {
        setPowerState(batteryLevel);
      }),
      Battery.addBatteryStateListener((batteryState) => {
        setPowerState(batteryState);
      }),
      Battery.addLowPowerModeListener((lowPowerMode) => {
        setPowerState(lowPowerMode);
      }),
    ]);
  };

  const unsubscribe = () => {
    batteryStateSubscriptions &&
      batteryStateSubscriptions[0] &&
      batteryStateSubscriptions[0].remove();

    batteryStateSubscriptions &&
      batteryStateSubscriptions[1] &&
      batteryStateSubscriptions[1].remove();

    batteryStateSubscriptions &&
      batteryStateSubscriptions[2] &&
      batteryStateSubscriptions[2].remove();

    setBatteryStateSubscriptions(null);
  };

  //create your forceUpdate hook
  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const { batteryLevel, batteryState, lowPowerMode } = powerState;
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
