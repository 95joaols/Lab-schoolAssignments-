import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../constants/Styles";
import * as Location from "expo-location";


function MapScreen() {

  const [location, setLocation] = useState<Location.LocationObject>();
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
        return (
          <View style={mapStyles.errorContainer}>
            <Text style={{ color: "red" }}>
              Error: Needs permission to access Location
            </Text>
          </View>
        );
      }
      let userLocation = await Location.getLastKnownPositionAsync({});
      if (userLocation){
      setLocation(userLocation);
      };
    })();
  }, []);

  const getLocation = () => {
    if (location) {
      let userLatitude = location.coords.latitude;
      let userLongitude = location.coords.longitude;
      setRegion({
        latitude: userLatitude,
        longitude: userLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }
  };

  return (
    <View style={styles.flex}>
      <MapView
        style={styles.map}
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
          <Text style={styles.buttonText}>Hitta Position</Text>
        </TouchableHighlight>
      </Callout>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default MapScreen;
