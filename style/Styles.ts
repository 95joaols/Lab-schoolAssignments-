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
        bottom: 10,
        backgroundColor: "transparent",
        position: 'absolute',
        width: "50%"
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
    backgroundImagePreview: {
        height: 400,
        width: 300,
    },
    backgroundImagePreviewLandscape: {
        height: 200,
        width: 200,
    },
    backgroundImagePreviewContainer: {
        borderWidth: 3,
        borderColor: "white"
    },
    backgroundImagePreviewContainerLandscape: {
        top: 10,
        position: "absolute",
        borderWidth: 3,
        borderColor: "white"
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      },
    mapLandscape: {
        width: Dimensions.get("window").height,
        height: Dimensions.get("window").width, 
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});