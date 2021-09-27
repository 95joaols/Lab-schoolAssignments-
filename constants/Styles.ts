import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    subView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "50%",
        paddingLeft: 8,
        paddingRight: 8
    },
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonsContainer: {
        alignItems: "center",
        bottom: 10,
        backgroundColor: "transparent",
        position: 'absolute',
        width: "100%"
      },
    button: {
        backgroundColor: "#8E9080",
        padding: 8,
        margin: 8,
        borderRadius: 20,
        width: "100%"
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "600"
    },
    backgroundImage: {
        height: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        resizeMode: "cover",
        zIndex: -1,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      },
});