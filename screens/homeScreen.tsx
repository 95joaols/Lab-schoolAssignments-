import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../constants/Styles";

interface Props {
  onSetPage: (page: string) => void;
}

function HomeScreen({ onSetPage }: Props) {
  return (
    <View style={styles.root}>
      <Pressable onPress={() => onSetPage("camera")} style={styles.button}>
        <Text style={styles.buttonText}>Kamera</Text>
      </Pressable>
      <Pressable onPress={() => onSetPage("info")} style={styles.button}>
        <Text style={styles.buttonText}>Info</Text>
      </Pressable>
      <Pressable onPress={() => onSetPage("background")} style={styles.button}>
        <Text style={styles.buttonText}>Bakgrundsbild</Text>
      </Pressable>
      <Pressable onPress={() => onSetPage("map")} style={styles.button}>
        <Text style={styles.buttonText}>Karta</Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;
