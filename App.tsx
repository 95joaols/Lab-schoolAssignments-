import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationTheme, navigatorTheme } from './style/NavigationStyles';
import BackgroundImageProvider from './contexts/BackgroundImageContext';
import BackgroundImage from './components/BackgroundImage';
import HomeScreen from './screens/homeScreen';
import CameraScreen from './screens/cameraScreen';
import InfoScreen from './screens/InfoScreen';
import BackgroundSelectorScreen from "./screens/BackgroundSelectorScreen";
import MapScreen from './screens/mapScreen';
import ScreenOrientationProvider from "./contexts/ScreenOrientationContext";
import { SensorsProviderGroup } from './contexts/sensors/SensorsProviderGroup';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ScreenOrientationProvider>
      <BackgroundImageProvider>
        <SensorsProviderGroup>
          <NavigationContainer theme={navigationTheme}>
            <BackgroundImage />
            <Stack.Navigator screenOptions={navigatorTheme} >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen name="Info" component={InfoScreen} />
              <Stack.Screen name="Background" component={BackgroundSelectorScreen} />
              <Stack.Screen name="Map" component={MapScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SensorsProviderGroup>
      </BackgroundImageProvider>
    </ScreenOrientationProvider>
  );
}
