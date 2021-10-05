import React, { FC, useContext, useEffect } from "react";
import { Platform, View, Text, TouchableHighlight, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BackgroundImageContext } from "../contexts/BackgroundImageContext";
import { styles } from "../style/Styles";
import { ScreenOrientationContext } from "../contexts/ScreenOrientationContext";
import { Orientation } from "expo-screen-orientation";

const BackgroundSelectorScreen: FC = () => {
  const { backgroundImage, setBackgroundImage } = useContext(
    BackgroundImageContext
  );
  const { screenOrientation } = useContext(ScreenOrientationContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.cancelled) {
      setBackgroundImage(result.uri);
    }
  };

  const ifLandscape =
    screenOrientation === Orientation.LANDSCAPE_LEFT ||
    screenOrientation === Orientation.LANDSCAPE_RIGHT
      ? true
      : false;

  return (
    <View style={styles.root}>
      {backgroundImage && (
        <View
          style={
            ifLandscape
              ? styles.backgroundImagePreviewContainerLandscape
              : styles.backgroundImagePreviewContainer
          }
        >
          <Image
            source={{ uri: backgroundImage }}
            style={
              ifLandscape
                ? styles.backgroundImagePreviewLandscape
                : styles.backgroundImagePreview
            }
          />
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          onPress={pickImage}
          style={styles.button}
          underlayColor={"#B6B8A8"}
        >
          <Text style={styles.buttonText}>Välj bakgrundsbild</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default BackgroundSelectorScreen;
