import { createContext, FC, useEffect, useState } from "react";
import React from "react";
import { PermissionResponse } from "expo-camera";
import { Accelerometer, ThreeAxisMeasurement } from "expo-sensors";

interface ContextValue {
    accelerometerInfo: ThreeAxisMeasurement | undefined;
    granted: PermissionResponse | undefined;
}

export const AccelerometerContext = createContext<ContextValue>({
    accelerometerInfo: undefined,
    granted: undefined
});

const AccelerometerProvider: FC = (props) => {
    const [accelerometerInfo, setAccelerometerInfo] = useState<ThreeAxisMeasurement>();
    const [granted, setGranted] = useState<PermissionResponse>()

    useEffect(() => {
        (async () => {
            const respond = await Accelerometer.requestPermissionsAsync()
            setGranted(respond);
            if (respond.granted) {
                Accelerometer.setUpdateInterval(50);
                Accelerometer.addListener((accelerometerData) => {
                    setAccelerometerInfo(accelerometerData);
                });
            }
        })();
        return Accelerometer.removeAllListeners;
    }, []);

    return (
        <AccelerometerContext.Provider
            value={{
                accelerometerInfo,
                granted
            }}
        >
            {props.children}
        </AccelerometerContext.Provider>
    );
};

export default AccelerometerProvider;