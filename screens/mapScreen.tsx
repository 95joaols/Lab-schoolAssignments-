import React, { useState, useContext } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  Text,
  View,
  TouchableHighlight,
  Modal
} from "react-native";
import { styles } from "../constants/Styles";
import { ScreenOrientationContext } from "../contexts/ScreenOrientationContext";
import { Orientation } from "expo-screen-orientation";
import { LocationContext } from "../contexts/sensors/locationContext";

function MapScreen() {
  const Location = useContext(LocationContext);

  const { screenOrientation } = useContext(ScreenOrientationContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(Location.errorMsg);
  const [region, setRegion] = useState({
    latitude: 57.72107,
    longitude: 12.93982,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  if (Location.errorMsg) {
    setErrorMsg(Location.errorMsg);
  }

  if (Location.grantedForeground?.status !== "granted") {
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.root}>
              <View style={styles.modalView}>
                <Text style={styles.buttonText}>
                  Map needs permission to access Device Location. {"\n\n"}
                  Go to Settings {">"} Apps & notifications {">"} Expo Go {">"}{" "}
                  Permissions. Allow "Location".
                </Text>
                <TouchableHighlight
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.button}
                  underlayColor={"#B6B8A8"}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <TouchableHighlight
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.button}
            underlayColor={"#B6B8A8"}
          >
            <Text style={styles.buttonText}>Get Location</Text>
          </TouchableHighlight>
        </Callout>
      </View>
    );
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (Location.location !== undefined) {
    text = "Se Din Position";
  }

  const getLocation = () => {
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
};

export default MapScreen;
