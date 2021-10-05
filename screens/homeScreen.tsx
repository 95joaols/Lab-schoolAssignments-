import { Orientation } from "expo-screen-orientation";
import React, { useContext } from "react";
import { View, Text, TouchableHighlight } from 'react-native';
import { styles } from '../style/Styles';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenOrientationContext } from "../contexts/ScreenOrientationContext";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

function HomeScreen({ navigation }: Props) {
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
        <TouchableHighlight onPress={() => navigation.navigate("Camera")} style={styles.button}>
          <Text style={styles.buttonText}>Kamera</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate("Info")} style={styles.button}>
          <Text style={styles.buttonText}>Info</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.subView}>
        <TouchableHighlight onPress={() => navigation.navigate("Background")} style={styles.button}>
          <Text style={styles.buttonText}>Bakgrundsbild</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate("Map")} style={styles.button}>
          <Text style={styles.buttonText}>Karta</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default HomeScreen;
