import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useState } from 'react';

interface IGeolocation {
  latitude: number;
  longitude: number;
}

// function MapScreen (){
  
  const MapScreen = () => {
    const [location, setLocation] = useState<IGeolocation>({
      latitude: 57.71717,
      longitude: 12.94225,
    });

  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map} 
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;