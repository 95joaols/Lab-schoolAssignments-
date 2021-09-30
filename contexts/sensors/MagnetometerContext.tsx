import { PermissionResponse } from "expo-camera";
import { Magnetometer, ThreeAxisMeasurement } from "expo-sensors";
import React, { createContext, FC, useEffect, useState } from "react";

interface ContextValue {
    barometerInfo: ThreeAxisMeasurement | undefined;
    granted: PermissionResponse | undefined;
}

export const MagnetometerContext = createContext<ContextValue>({
    barometerInfo: undefined,
    granted: undefined
});

const MagnetometerProvider: FC = (props) => {
    const [barometerInfo, setBarometerInfo] = useState<ThreeAxisMeasurement>();
    const [granted, setGranted] = useState<PermissionResponse>()

    useEffect(() => {
        (async () => {
            const respond = await Magnetometer.requestPermissionsAsync()
            setGranted(respond);
            if (respond.granted) {
                Magnetometer.setUpdateInterval(50);
                Magnetometer.addListener((result) => {
                    setBarometerInfo(result);
                });
            }
        })();
        return Magnetometer.removeAllListeners;
    }, []);

    return (
        <MagnetometerContext.Provider
            value={{
                barometerInfo,
                granted
            }}
        >
            {props.children}
        </MagnetometerContext.Provider>
    );
};

export default MagnetometerProvider;