import { Orientation } from "expo-screen-orientation";
import React, { useContext, useState } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { ScreenOrientationContext } from "../contexts/ScreenOrientationContext";
import { LocationContext } from "../contexts/sensors/locationContext";
import { styles } from "../style/Styles";

function MapScreen() {
  const Location = useContext(LocationContext);

  const { screenOrientation } = useContext(ScreenOrientationContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 57.72107,
    longitude: 12.93982,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const getLocation = () => {
    if (Location.location) {
      setRegion({
        latitude: Location.location?.coords.latitude,
        longitude: Location.location?.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  if (!Location.location) {
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
                {Location.errorMsg || !Location.grantedForeground ? (
                  <Text style={styles.buttonText}>{Location.errorMsg}</Text>
                ) : (
                  <Text style={styles.buttonText}>
                    Map needs permission to access Device Location. {"\n\n"}
                    Go to Settings {">"} Apps & notifications {">"} Expo Go{" "}
                    {">"} Permissions. Allow "Location".
                  </Text>
                )}
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

  if (Location.location) {
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
            <Text style={styles.buttonText}>Get Location</Text>
          </TouchableHighlight>
        </Callout>
      </View>
    );
  }

  return (
    <View>
      <Text>Something Went Wrong</Text>
    </View>
  )
}

export default MapScreen;
