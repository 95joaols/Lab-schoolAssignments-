import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cameraSlider: {
      width: 200,
      height: 50,
      marginRight: -75,
      transform: [{ rotate: "-90deg" }],
    },
    camera: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    sliderDiv: {
      height: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    buttonsDiv: {
      display: "flex",
      minHeight: 100,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 5,
    },
    errorContainer: {
      flex: 1,
      backgroundColor: "#ffffff",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "#ffffff",
    },
    cameraFlipButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
      borderRadius: 100,
      marginRight: 190,
      backgroundColor: "#8E9080",
    },
    cameraRoundButton: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: "#8E9080",
    },
  });