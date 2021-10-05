import React, { FC, useContext, useEffect } from "react";
import { Platform, View, Text, TouchableHighlight } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BackgroundImageContext } from "../contexts/BackgroundImageContext";
import { styles } from "../style/Styles";
import { ScreenOrientationContext } from "../contexts/ScreenOrientationContext";
import { Orientation } from "expo-screen-orientation";

const BackgroundSelectorScreen: FC = () => {
  const { setBackgroundImage } = useContext(BackgroundImageContext);
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

  return (
    <View
      style={[
        styles.root,
        {
          flexDirection:
            screenOrientation === Orientation.LANDSCAPE_RIGHT ||
            screenOrientation === Orientation.LANDSCAPE_LEFT
              ? "row"
              : "column",
        },
      ]}
    >
      <View style={styles.subView}>
        <TouchableHighlight onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Välj bakgrundsbild</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default BackgroundSelectorScreen;
