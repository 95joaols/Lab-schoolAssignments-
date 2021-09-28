import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity, Alert, Button, Text, View, StyleSheet } from 'react-native';
import { requestPermissionsAsync, createAssetAsync } from 'expo-media-library';
import Slider from '@react-native-community/slider';


const CameraScreen: FC = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | undefined> (undefined);
  const [libraryPermission, setLibraryPermission] = useState<boolean | undefined>(undefined);
  const [cameraType, setCameraType] = useState<CameraType> (Camera.Constants.Type.front);
  const [cameraReady, setCameraReady] = useState<boolean> (false);
  const [cameraZoom, setCameraZoom] = useState<number>(0);
  let camera: Camera | null;

  const takePicture = async () => {
    if (cameraReady) {
      const picture = await camera?.takePictureAsync()
      if (picture && libraryPermission) {
        await createAssetAsync(picture.uri)
        Alert.alert('Picture saved to picture album');
      }
      else
        Alert.alert('No permissions!');
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await requestPermissionsAsync();
      setLibraryPermission(status === 'granted');
    })();
  }, [libraryPermission]);

  useEffect(() => {
    (async () => {
      if (!cameraPermission) {
        const {status} = await Camera.requestPermissionsAsync();
        setCameraPermission(status === 'granted');
      }
    })();
  }, [cameraPermission]);

  if (!cameraPermission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{color: "red"}}>Error: Needs permission to access camera</Text>
      </View>
    )
  }

  return (
    <Camera ratio={'16:9'} zoom={cameraZoom} type={cameraType} ref={(reference) => {camera = reference}} style={styles.camera} useCamera2Api onCameraReady={() => {setCameraReady(true)}}>
      {console.log('zoom: ', cameraZoom)}
      <View style={styles.sliderDiv}>
        <Slider
          onSlidingComplete={(f) => {setCameraZoom(f)}}
          style={styles.cameraSlider}
          minimumValue={0}
          maximumValue={1}
          value={0}
          minimumTrackTintColor="#ffffff"
          thumbTintColor="#8E9080"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View style={styles.buttonsDiv}>
        <TouchableOpacity style={styles.cameraFlipButton} onPress={() => {setCameraType (cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}}>
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraRoundButton} onPress={takePicture} />
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  cameraSlider: {
    width: 200,
    height: 50,
    marginRight: -75,
    transform: [ { rotate: "-90deg" } ]
  },
  camera: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  sliderDiv: {
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonsDiv: {
    display: 'flex',
    minHeight: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff'
  },
  cameraFlipButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 190,
    backgroundColor: '#8E9080',
  },
  cameraRoundButton: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#8E9080',
  }
})

export default CameraScreen;
