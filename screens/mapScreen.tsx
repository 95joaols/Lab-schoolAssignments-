import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  SafeAreaView,
} from "react-native";
import { useState } from "react";

interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface Props {
  onGoBack: () => void;
}

function MapScreen ({ onGoBack }: Props) {
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 57.72107,
    longitude: 12.93982,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.03,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
      <View style={styles.buttonsContainer}>
        <Button title="Go back" onPress={onGoBack} />
      </View>
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "90%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
  },
});

export default MapScreen;
