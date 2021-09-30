import React, { FC } from "react"
import AccelerometerProvider from "./AccelerometerContext"
import BarometerProvider from "./BarometerContext"
import BatteryProvider from "./BatteryContext"
import DeviceMotionProvider from "./DeviceMotionContext"
import GyroscopeProvider from "./GyroscopeContext"
import LocationProvider from "./locationContext"
import MagnetometerProvider from "./MagnetometerContext"
import PedometerProvider from "./PedometerContext"

export const SensorsProviderGroup: FC = (props) => {
    return (
        <AccelerometerProvider>
            <DeviceMotionProvider>
                <MagnetometerProvider>
                    <GyroscopeProvider>
                        <BarometerProvider>
                            <PedometerProvider>
                                <LocationProvider>
                                    <BatteryProvider>
                                        {props.children}
                                    </BatteryProvider>
                                </LocationProvider>
                            </PedometerProvider>
                        </BarometerProvider>
                    </GyroscopeProvider>
                </MagnetometerProvider>
            </DeviceMotionProvider>
        </AccelerometerProvider>
    )
}
