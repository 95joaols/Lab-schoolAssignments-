import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { styles } from "../constants/Styles";
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <TouchableHighlight onPress={() => navigation.navigate("Camera")} style={styles.button}>
        <Text style={styles.buttonText}>Kamera</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate("Info")} style={styles.button}>
        <Text style={styles.buttonText}>Info</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate("Background")} style={styles.button}>
        <Text style={styles.buttonText}>Bakgrundsbild</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate("Map")} style={styles.button}>
        <Text style={styles.buttonText}>Karta</Text>
      </TouchableHighlight>
    </View>
  );
}

export default HomeScreen;
