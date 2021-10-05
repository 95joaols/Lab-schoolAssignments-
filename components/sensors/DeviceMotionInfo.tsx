import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "../../style/SensorsStyles";
import { DeviceMotionContext } from "../../contexts/sensors/DeviceMotionContext";


export default function DeviceMotionInfo() {
    const DeviceMotion = useContext(DeviceMotionContext)


    if (DeviceMotion.deviceMotionInfo) {

        const { acceleration, orientation, rotation } = DeviceMotion.deviceMotionInfo;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Device Motion:</Text>
                <Text style={styles.paragraph}>Permissions:{DeviceMotion.granted?.status}</Text>

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
                    X: {round(rotation.alpha)} y: {round(rotation.beta)} z: {round(rotation.gamma)}
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
                    granted: {String(DeviceMotion.granted?.status)}
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