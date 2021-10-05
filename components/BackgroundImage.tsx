import React, { FC, useContext } from "react";
import { Image } from "react-native";
import { styles } from "../style/Styles";
import { BackgroundImageContext } from "../contexts/BackgroundImageContext";

const BackgroundImage: FC = () => {
  const { backgroundImage } = useContext(BackgroundImageContext);

  return (
    <Image source={{ uri: backgroundImage }} style={styles.backgroundImage} />
  );
};

export default BackgroundImage;
