import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../constants/Styles";
import * as Location from "expo-location";
import Geolocation from 'react-native-geolocation-service';

interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface Props {
  onGoBack: () => void;
}

function MapScreen({ onGoBack }: Props) {

  const [location, setLocation] = useState<Location.LocationObject>();
  const [region, setRegion] = useState({
    latitude: 57.72107,
    longitude: 12.93982,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // React.useEffect (() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setLocation({
  //         latitude,
  //         longitude,
  //       });
  //     },
  //     error => {
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // }, []);

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
      console.log(userLocation);
      setLocation(userLocation);
    })();
  }, []);

  const getLocation = () => {
    let userLatitude = location.coords.latitude;
    let userLongitude = location.coords.longitude;
    setRegion({
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
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
        <TouchableHighlight onPress={onGoBack} style={styles.button}>
          <Text style={styles.buttonText}>Tillbaka</Text>
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
