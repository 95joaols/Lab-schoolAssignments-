import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity, Alert, Button, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({  
  errorContainer: {  
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  camera: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff'
  },
  roundButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  div: {
    display: 'flex',
    flexDirection: 'row'
  }
})

const CameraScreen: FC = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | undefined> (undefined);
  const [cameraType, setCameraType] = useState<CameraType> (Camera.Constants.Type.front);
  const [cameraReady, setCameraReady] = useState<boolean> (false);
  let camera: Camera | null;

  const statusCameraReady = () => {
    setCameraReady(true)
    if(cameraReady)
      Alert.alert('READY');
    else
      Alert.alert('NOT READY');
  }

  const onError = () => {
    Alert.alert('ERROR');
  }

  const takePicture = () => {
    if (cameraReady) {
      camera?.takePictureAsync()
        .then(() => Alert.alert('PIC TAKEN'));
    }
    else
      Alert.alert('NO PICTURE');
  }

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
    <Camera ratio={'16:9'} type={cameraType} ref={(reference) => {camera = reference}} style={styles.camera} useCamera2Api onCameraReady={statusCameraReady} onMountError={onError}>
      {cameraType === Camera.Constants.Type.front ? <Text style={styles.text}>Selfie mode</Text> : <Text style={styles.text}>Boring mode</Text>}
      <View style={styles.div}>
        <Button title="Flip" onPress={() => {setCameraType (cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}} />
        <TouchableOpacity style={styles.roundButton} onPress={takePicture} />
      </View>
    </Camera>
  );
};

export default CameraScreen;
