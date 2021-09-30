import { PermissionResponse } from "expo-camera";
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import React, { createContext, FC, useEffect, useState } from "react";

interface ContextValue {
    deviceMotionInfo: DeviceMotionMeasurement | undefined;
    granted: PermissionResponse | undefined;
}

export const DeviceMotionContext = createContext<ContextValue>({
    deviceMotionInfo: undefined,
    granted: undefined
});

const DeviceMotionProvider: FC = (props) => {
    const [deviceMotionInfo, setDeviceMotionInfo] = useState<DeviceMotionMeasurement>();
    const [granted, setGranted] = useState<PermissionResponse>()

    useEffect(() => {
        (async () => {
            const respond = await DeviceMotion.requestPermissionsAsync()
            setGranted(respond);
            if (respond.granted) {
                DeviceMotion.setUpdateInterval(50)
                DeviceMotion.addListener((device) => { setDeviceMotionInfo(device) })
            }
        })();
        return DeviceMotion.removeAllListeners;
    }, []);

    return (
        <DeviceMotionContext.Provider
            value={{
                deviceMotionInfo,
                granted
            }}
        >
            {props.children}
        </DeviceMotionContext.Provider>
    );
};

export default DeviceMotionProvider;