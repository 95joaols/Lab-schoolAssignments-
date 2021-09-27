import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { styles } from "../constants/Styles";

interface Props {
  onSetPage: (page: string) => void;
}

function HomeScreen({ onSetPage }: Props) {

  return (
    <View style={styles.root}>
      <TouchableHighlight onPress={() => onSetPage("camera")} style={styles.button}>
        <Text style={styles.buttonText}>Kamera</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => onSetPage("info")} style={styles.button}>
        <Text style={styles.buttonText}>Info</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => onSetPage("background")} style={styles.button}>
        <Text style={styles.buttonText}>Bakgrundsbild</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => onSetPage("map")} style={styles.button}>
        <Text style={styles.buttonText}>Karta</Text>
      </TouchableHighlight>
    </View>
  );
}

export default HomeScreen;