import BackgroundSelectorScreen from "./screens/BackgroundSelectorScreen";
import React from 'react';
import HomeScreen from './screens/homeScreen';
import MapScreen from './screens/mapScreen';
import InfoScreen from './screens/InfoScreen';
import CameraScreen from './screens/cameraScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Background" component={BackgroundSelectorScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
