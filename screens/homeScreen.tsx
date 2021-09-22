import React from "react";
import { View, Button, Text } from "react-native";

interface Props {
    onSetPage: (page: string) => void;
}

function HomeScreen({ onSetPage }: Props) {
    return (
        <View>
            <Button title="Camera" onPress={() => onSetPage('camera')}/>
            <Button title="Info" onPress={() => onSetPage('info')}/>
            <Button title="Background" onPress={() => onSetPage('background')}/>
        </View>
    )
}

export default HomeScreen;