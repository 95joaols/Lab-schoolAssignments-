import { PermissionResponse } from "expo-camera";
import { BarometerMeasurement, Barometer } from "expo-sensors";
import React,{ createContext, FC, useState, useEffect } from "react";

interface ContextValue {
    barometerInfo: BarometerMeasurement | undefined;
    granted: PermissionResponse | undefined;
}

export const BarometerContext = createContext<ContextValue>({
    barometerInfo: undefined,
    granted: undefined
});

const BarometerProvider: FC = (props) => {
    const [barometerInfo, setBarometerInfo] = useState<BarometerMeasurement>();
    const [granted, setGranted] = useState<PermissionResponse>()

    useEffect(() => {
        (async () => {
            const respond = await Barometer.requestPermissionsAsync()
            setGranted(respond);
            Barometer.setUpdateInterval(50);
            Barometer.addListener((barometerData) => {
                setBarometerInfo(barometerData);
            });
        })();
        return Barometer.removeAllListeners;
    }, []);

    return (
        <BarometerContext.Provider
            value={{
                barometerInfo,
                granted
            }}
        >
            {props.children}
        </BarometerContext.Provider>
    );
};

export default BarometerProvider;