import * as Battery from "expo-battery";
import { BatteryState, Subscription } from "expo-battery";
import React, { createContext, FC, useCallback, useEffect, useState } from "react";
import UseObjectState from "../../hooks/UseObjectState";

interface ContextValue {
    powerState: Battery.PowerState;
}

export const BatteryContext = createContext<ContextValue>({
    powerState: {
        batteryLevel: -1,
        batteryState: BatteryState.UNKNOWN,
        lowPowerMode: false,
    },
});

const BatteryProvider: FC = (props) => {
    const [powerState, setPowerState] = UseObjectState<Battery.PowerState>({
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

    return (
        <BatteryContext.Provider
            value={{
                powerState,
            }}
        >
            {props.children}
        </BatteryContext.Provider>
    );
};

export default BatteryProvider;