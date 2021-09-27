import { Orientation } from "expo-screen-orientation";
import React, { useContext } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { styles } from "../constants/Styles";
import { ScreenOrientationContext } from "../contexts/ScreenOrientationContext";

interface Props {
  onSetPage: (page: string) => void;
}

function HomeScreen({ onSetPage }: Props) {
  const { screenOrientation } = useContext(ScreenOrientationContext);

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
        <TouchableHighlight
          onPress={() => onSetPage("camera")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Kamera</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => onSetPage("info")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Info</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.subView}>
        <TouchableHighlight
          onPress={() => onSetPage("background")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Bakgrundsbild</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => onSetPage("map")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Karta</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default HomeScreen;
