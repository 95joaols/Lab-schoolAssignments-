import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, Alert, Text, View } from "react-native";
import * as Library from "expo-media-library";
import Slider from "@react-native-community/slider";
import { styles } from "../constants/cameraStyles";

const CameraScreen: FC = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [libraryPermission, setLibraryPermission] = useState<boolean>(false);
  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.front
  );
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [cameraZoom, setCameraZoom] = useState<number>(0);
  let camera: Camera | null;

  const takePicture = async () => {
    if (cameraReady) {
      const picture = await camera?.takePictureAsync();
      if (picture) {
        await Library.createAssetAsync(picture.uri);
        Alert.alert("Picture saved to photos");
      }
    }
  };

  useEffect(() => {
    (async () => {
      const libraryPermissionResponse = await Library.requestPermissionsAsync();
      setLibraryPermission(libraryPermissionResponse.status === "granted");
      const cameraPermissionResponse = await Camera.requestPermissionsAsync();
      setCameraPermission(cameraPermissionResponse.status === "granted");
    })();
  }, [cameraPermission, libraryPermission]);

  if (!cameraPermission || !libraryPermission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: Needs permission to access "Camera" and/or "Files and media". {'\n\n'}
          Go to Settings {'>'} Apps & notifications {'>'} Expo Go {'>'} Permissions. Allow "Files and media" and "Camera".
        </Text>
      </View>
    );
  }

  return (
    <Camera
      ratio={"16:9"}
      zoom={cameraZoom}
      type={cameraType}
      ref={(reference) => {
        camera = reference;
      }}
      style={styles.camera}
      useCamera2Api
      onCameraReady={() => {
        setCameraReady(true);
      }}
    >
      <View style={styles.sliderDiv}>
        <Slider
          onSlidingComplete={(f) => {
            setCameraZoom(f);
          }}
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={0}
          minimumTrackTintColor="#ffffff"
          thumbTintColor="#8E9080"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View style={styles.buttonsDiv}>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => {
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={takePicture}
        />
      </View>
    </Camera>
  );
};

export default CameraScreen;
