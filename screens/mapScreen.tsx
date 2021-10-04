import React, { useState, useContext } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Text, View, TouchableHighlight } from "react-native";
import { styles } from "../constants/Styles";
import { ScreenOrientationContext } from "../contexts/ScreenOrientationContext";
import { Orientation } from "expo-screen-orientation";
import { LocationContext } from "../contexts/sensors/locationContext";

function MapScreen() {
  const Location = useContext(LocationContext);

  const { screenOrientation } = useContext(ScreenOrientationContext);

  const [errorMsg, setErrorMsg] = useState(Location.errorMsg);
  const [region, setRegion] = useState({
    latitude: 57.72107,
    longitude: 12.93982,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  if (Location.grantedForeground?.status !== "granted") {
    setErrorMsg("Disabled, No Permission");
    return;
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (Location.location !== undefined) {
    text = "Se Din Position";
  }

  const getLocation = () => {
    if (Location.grantedForeground?.status === "granted") {
      if (Location.location !== undefined) {
        setRegion({
          latitude: Location.location?.coords.latitude,
          longitude: Location.location?.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else if (Location.location === undefined) {
        text = "Location not available";
      }
    }
  };

  return (
    <View style={styles.root}>
      <MapView
        style={
          screenOrientation === Orientation.LANDSCAPE_RIGHT ||
          screenOrientation === Orientation.LANDSCAPE_LEFT
            ? styles.mapLandscape
            : styles.map
        }
        region={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
      <Callout style={styles.buttonsContainer}>
        <TouchableHighlight
          onPress={getLocation}
          style={styles.button}
          underlayColor={"#B6B8A8"}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableHighlight>
      </Callout>
    </View>
  );
}

export default MapScreen;
