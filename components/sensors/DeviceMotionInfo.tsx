import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../constants/SensorsStyles";


export default function DeviceMotionInfo() {
    const [deviceMotion, setDeviceMotion] = useState<DeviceMotionMeasurement | null>(null)
    const [granted, setGranted] = useState<boolean>(false)

    const Setup = (() => {
        (async () => {
            console.log("Setup");

            const respond = await DeviceMotion.requestPermissionsAsync()
            setGranted(respond.granted);
            if (respond.granted) {
                DeviceMotion.setUpdateInterval(40)
                DeviceMotion.addListener((device) => { setDeviceMotion(device) })
            }
        })();
    })
    const Remove = (() => {
        DeviceMotion.removeAllListeners();
    })

    useEffect(() => {
        Setup();
        return () => Remove();
    }, []);

    if (deviceMotion) {

        const { acceleration, orientation, rotation } = deviceMotion;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Device Motion:</Text>
                <Text style={styles.paragraph}>
                    granted: {String(granted)}
                </Text>
                <Text style={styles.paragraph}>
                    acceleration:
                </Text>
                <Text style={styles.paragraph}>
                    X: {round(acceleration?.x)}
                </Text>
                <Text style={styles.paragraph}>
                    Y {round(acceleration?.y)}
                </Text>
                <Text style={styles.paragraph}>
                    Z {round(acceleration?.z)}
                </Text>
                <Text style={styles.paragraph}>
                    orientation:{orientation}
                </Text>
                <Text style={styles.paragraph}>
                    rotation:
                </Text>
                <Text style={styles.paragraph}>
                    X: {round(rotation.alpha)}
                </Text>
                <Text style={styles.paragraph}>
                    y: {round(rotation.beta)}
                </Text>
                <Text style={styles.paragraph}>
                    z: {round(rotation.gamma)}
                </Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Device Motion:</Text>
                <Text style={styles.paragraph}>
                    acceleration:
                </Text>
                <Text style={styles.paragraph}>
                    granted: {String(granted)}
                </Text>
                <Text style={styles.paragraph}>
                    No data
                </Text>
            </View>
        )
    }
}
function round(n: number | undefined) {
    if (!n) {
        return 0;
    }
    return Math.floor(n * 100) / 100;
}