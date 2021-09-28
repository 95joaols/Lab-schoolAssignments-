import React from "react";
import { ScrollView } from "react-native";
import BatteryInfo from "../components/BatteryInfo";
import DeviceInfo from "../components/DeviceInfo";
import AccelerometerInfo from "../components/sensors/AccelerometerInfo";
import BarometerInfo from "../components/sensors/BarometerInfo";
import DeviceMotionInfo from "../components/sensors/DeviceMotionInfo";
import GyroscopeInfo from "../components/sensors/GyroscopeInfo";
import LocationInfo from "../components/sensors/locationInfo";
import MagnetometerInfo from "../components/sensors/MagnetometerInfo";
import PedometerInfo from "../components/sensors/PedometerInfo";

export default function InfoScreen() {
  return (
    <ScrollView>
      <DeviceInfo />
      <BatteryInfo />
      <DeviceMotionInfo />
      <LocationInfo />
      <MagnetometerInfo />
      <AccelerometerInfo />
      <GyroscopeInfo />
      <BarometerInfo />
      <PedometerInfo />
    </ScrollView>
  );
}
