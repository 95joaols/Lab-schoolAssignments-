import React, { FC, useContext } from "react";
import { StyleSheet, Image } from "react-native";
import { BackgroundImageContext } from "../contexts/BackgroundImageContext";

const BackgroundImage: FC = () => {
  const { backgroundImage } = useContext(BackgroundImageContext);

  return <Image source={{ uri: backgroundImage }} style={styles.background} />;
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: "cover",
    zIndex: -1,
  },
});

export default BackgroundImage;
