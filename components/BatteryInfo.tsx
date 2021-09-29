import * as Battery from "expo-battery";
import { BatteryState, Subscription } from "expo-battery";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../constants/SensorsStyles";
import UseObjectState from "../hooks/UseObjectState";

export default function BatteryInfo() {
  const [powerState, setPowerState] = UseObjectState({
    batteryLevel: -1,
    batteryState: BatteryState.UNKNOWN,
    lowPowerMode: false,
  });
  const [batteryStateSubscriptions, setBatteryStateSubscriptions] = useState<
    Subscription[]
  >();

  const subscribe = useCallback(() => {
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
  }, []);

  const unsubscribe = useCallback(() => {
    batteryStateSubscriptions &&
      batteryStateSubscriptions[0] &&
      batteryStateSubscriptions[0].remove();

    batteryStateSubscriptions &&
      batteryStateSubscriptions[1] &&
      batteryStateSubscriptions[1].remove();

    batteryStateSubscriptions &&
      batteryStateSubscriptions[2] &&
      batteryStateSubscriptions[2].remove();

    setBatteryStateSubscriptions(undefined);
  }, []);

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, [subscribe, unsubscribe]);

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
