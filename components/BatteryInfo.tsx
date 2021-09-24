import React, { useEffect, useState } from "react";
import * as Battery from "expo-battery";
import { BatteryState, Subscription } from "expo-battery";

import { StyleSheet, Text, View } from "react-native";

export default function BatteryInfo() {
  const forceUpdate = useForceUpdate();
  const [powerState, setPowerState] = useState({
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
        setPowerState((prev) => {
          let updating = prev;
          console.log("batteryLevel", batteryLevel.batteryLevel);
          updating.batteryLevel = batteryLevel.batteryLevel;
          forceUpdate();
          return updating;
        });
      }),
      Battery.addBatteryStateListener((batteryState) => {
        setPowerState((prev) => {
          console.log(
            "batteryStatePrev",
            prev.batteryState,
            "batteryStateUpdate",
            batteryState.batteryState
          );
          let updating = prev;

          updating.batteryState = batteryState.batteryState;
          forceUpdate();
          return updating;
        });
      }),
      Battery.addLowPowerModeListener((lowPowerMode) => {
        setPowerState((prev) => {
          let updating = prev;
          updating.lowPowerMode = lowPowerMode.lowPowerMode;
          forceUpdate();
          return updating;
        });
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
      <Text style={styles.text}>PowerState:</Text>
      <Text style={styles.text}>batteryLevel: {round(batteryLevel * 100)}</Text>
      <Text style={styles.text}>batteryState: {batteryState}</Text>
      <Text style={styles.text}>lowPowerMode: {String(lowPowerMode)}</Text>
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
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
});
