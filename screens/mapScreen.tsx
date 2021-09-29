import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Text, View, TouchableHighlight } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../constants/Styles";
import * as Location from "expo-location";
import { ScreenOrientationContext } from "../contexts/ScreenOrientationContext";
import { Orientation } from "expo-screen-orientation";


function MapScreen() {

  const { screenOrientation } = React.useContext(ScreenOrientationContext);

  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [region, setRegion] = useState({
    latitude: 57.72107,
    longitude: 12.93982,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Disabled, No Permission");
        return;
      }
      let userLocation = await Location.getLastKnownPositionAsync({});
      if (userLocation){
      setLocation(userLocation);
      } else if (!userLocation) {
        setErrorMsg("Location Not Available")      
      };
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Se Din Position";
  }

  const getLocation = () => {    
    if (location) {
      let userLatitude = location.coords.latitude;
      let userLongitude = location.coords.longitude;
      setRegion({
        latitude: userLatitude,
        longitude: userLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    };
  };

  return (
    <View style={styles.root}>
      <MapView
        style={
          screenOrientation === Orientation.LANDSCAPE_RIGHT ||
          screenOrientation === Orientation.LANDSCAPE_LEFT
            ? styles.mapLandscape
            : styles.map}
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
        <TouchableHighlight onPress={getLocation} style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableHighlight>
      </Callout>
    </View>
  );
}

export default MapScreen;
