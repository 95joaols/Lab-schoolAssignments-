import { Platform, Text } from "react-native";
import Device from "expo-device";

export default function DeviceInfo() {
  return (
    <view>
      <Text>DeviceInfo:</Text>
      <Text>IsDevice: {Device.isDevice} </Text>
      <Text>brand: {Device.brand} </Text>
      <Text>manufacturer: {Device.manufacturer} </Text>
      <Text>modelName: {Device.modelName} </Text>
      {Platform.OS === "ios" && <Text>modelId: {Device.modelId} </Text>}
      {Platform.OS === "ios" && <Text>productName: {Device.productName} </Text>}
      <Text>osName: {Device.osName} </Text>
      <Text>osVersion: {Device.osVersion} </Text>
      {Platform.OS === "android" && (
        <Text>platformApiLevel: {Device.platformApiLevel} </Text>
      )}
      <Text>deviceName: {Device.deviceName} </Text>
    </view>
  );
}
