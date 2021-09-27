import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

interface Props {
    onSetPage: (page: string) => void;
}

function HomeScreen({ onSetPage }: Props) {
    return (
        <View style={styles.root}>
            <Button title="Camera" onPress={() => onSetPage('camera')}/>
            <Button title="Info" onPress={() => onSetPage('info')}/>
            <Button title="Background" onPress={() => onSetPage('background')}/>
            <Button title="Map" onPress={() => onSetPage('map')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default HomeScreen;