import React from "react";
import { ScrollView } from "react-native";
import DeviceInfo from "../components/DeviceInfo";
import AccelerometerInfo from "../components/sensors/AccelerometerInfo";
import BarometerInfo from "../components/sensors/BarometerInfo";
import GyroscopeInfo from "../components/sensors/GyroscopeInfo";
import LocationInfo from "../components/sensors/locationInfo";
import MagnetometerInfo from "../components/sensors/MagnetometerInfo";
import PedometerInfo from "../components/sensors/PedometerInfo";

export default function InfoScreen() {
  return (
    <ScrollView>
      <DeviceInfo />
      <LocationInfo />
      <MagnetometerInfo />
      <AccelerometerInfo />
      <GyroscopeInfo />
      <BarometerInfo />
      <PedometerInfo />
    </ScrollView>
  );
}
