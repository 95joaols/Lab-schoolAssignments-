import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Text, View, TouchableHighlight } from "react-native";
import { useState } from "react";
import { styles } from "../constants/Styles";

interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface Props {
  onGoBack: () => void;
}

function MapScreen({ onGoBack }: Props) {
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 57.72107,
    longitude: 12.93982,
  });

  return (
    <View style={styles.flex}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
      <Callout style={styles.buttonsContainer}>
        <TouchableHighlight onPress={onGoBack} style={styles.button}>
          <Text style={styles.buttonText}>Tillbaka</Text>
        </TouchableHighlight>
      </Callout>
    </View>
  );
}

export default MapScreen;
