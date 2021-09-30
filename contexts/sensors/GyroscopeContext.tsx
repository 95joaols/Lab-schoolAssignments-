import { createContext, FC, useEffect, useState } from "react";
import React from "react";
import { PermissionResponse } from "expo-camera";
import { Gyroscope, ThreeAxisMeasurement } from "expo-sensors";

interface ContextValue {
    gyroscopeInfo: ThreeAxisMeasurement | undefined;
    granted: PermissionResponse | undefined;
}

export const GyroscopeContext = createContext<ContextValue>({
    gyroscopeInfo: undefined,
    granted: undefined
});

const GyroscopeProvider: FC = (props) => {
    const [gyroscopeInfo, setGyroscopeInfo] = useState<ThreeAxisMeasurement>();
    const [granted, setGranted] = useState<PermissionResponse>()

    useEffect(() => {
        (async () => {
            const respond = await Gyroscope.requestPermissionsAsync()
            setGranted(respond);
            if (respond.granted) {
                Gyroscope.setUpdateInterval(50);
                Gyroscope.addListener((gyroscopeData) => {
                    setGyroscopeInfo(gyroscopeData);
                });
            }
        })();
        return Gyroscope.removeAllListeners;
    }, []);

    return (
        <GyroscopeContext.Provider
            value={{
                gyroscopeInfo,
                granted
            }}
        >
            {props.children}
        </GyroscopeContext.Provider>
    );
};

export default GyroscopeProvider;