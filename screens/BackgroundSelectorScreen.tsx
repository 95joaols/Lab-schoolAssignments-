import React, { FC, useContext, useEffect } from "react";
import { Button, Platform, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BackgroundImageContext } from "../contexts/BackgroundImageContext";

const BackgroundSelectorScreen: FC = () => {
  const { setBackgroundImage } = useContext(
    BackgroundImageContext
  );

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
    <View style={styles.root}>
      <Button title="Välj bakgrundsbild" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default BackgroundSelectorScreen;
