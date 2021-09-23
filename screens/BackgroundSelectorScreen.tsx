import React, { FC, useContext, useEffect } from "react";
import { Platform, View, Pressable, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BackgroundImageContext } from "../contexts/BackgroundImageContext";
import { styles } from "../constants/Styles";

interface Props {
  onSetPage: (page: string) => void;
}

const BackgroundSelectorScreen: FC<Props> = ({ onSetPage }) => {
  const { setBackgroundImage } = useContext(BackgroundImageContext);

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
      <Pressable onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Välj bakgrundsbild</Text>
      </Pressable>
      <Pressable onPress={() => onSetPage("home")} style={styles.button}>
        <Text style={styles.buttonText}>Tillbaka</Text>
      </Pressable>
    </View>
  );
};

export default BackgroundSelectorScreen;
