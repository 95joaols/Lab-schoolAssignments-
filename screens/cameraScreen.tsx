import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, Alert, Text, View } from "react-native";
import { requestPermissionsAsync, createAssetAsync } from "expo-media-library";
import Slider from "@react-native-community/slider";
import { styles } from "../constants/cameraStyles";

const CameraScreen: FC = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | undefined>(
    undefined
  );
  const [libraryPermission, setLibraryPermission] = useState<
    boolean | undefined
  >(undefined);
  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.front
  );
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [cameraZoom, setCameraZoom] = useState<number>(0);
  let camera: Camera | null;

  const takePicture = async () => {
    if (cameraReady) {
      const picture = await camera?.takePictureAsync();
      if (picture && libraryPermission) {
        await createAssetAsync(picture.uri);
        Alert.alert("Picture saved to picture album");
      } else Alert.alert("No permissions!");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await requestPermissionsAsync();
      setLibraryPermission(status === "granted");
    })();
  }, [libraryPermission]);

  useEffect(() => {
    (async () => {
      if (!cameraPermission) {
        const { status } = await Camera.requestPermissionsAsync();
        setCameraPermission(status === "granted");
      }
    })();
  }, [cameraPermission]);

  if (!cameraPermission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: "red" }}>
          Error: Needs permission to access camera
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
        <TouchableOpacity
          style={styles.cameraFlipButton}
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
          style={styles.cameraRoundButton}
          onPress={takePicture}
        />
      </View>
    </Camera>
  );
};

export default CameraScreen;
