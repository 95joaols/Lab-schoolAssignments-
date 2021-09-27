import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import { styles } from "../constants/Styles";

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
    <View style={mapStyles.mapContainer}>
      <MapView
        style={mapStyles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
      <TouchableHighlight onPress={onGoBack} style={styles.button}>
        <Text style={styles.buttonText}>Tillbaka</Text>
      </TouchableHighlight>
    </View>
  );
};

const mapStyles = StyleSheet.create({
  mapContainer: {
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
