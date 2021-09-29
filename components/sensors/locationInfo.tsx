import { Subscription } from "@unimodules/react-native-adapter";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { LocationObject, LocationOptions, LocationPermissionResponse } from "expo-location";
import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { styles } from "../../constants/SensorsStyles";

export default function LocationInfo() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [grantedForeground, setGrantedForeground] = useState<LocationPermissionResponse | null>(null)
  const [grantedBackground, setGrantedBackground] = useState<LocationPermissionResponse | null>(null)

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const Setup = () => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      const respond = await Location.requestForegroundPermissionsAsync()
      setGrantedForeground(respond);
      if (respond.granted) {
        const respondBackground = await Location.requestBackgroundPermissionsAsync();
        setGrantedBackground(respondBackground);

        if (respondBackground.granted) {
          await Location.startLocationUpdatesAsync("LocationUpdates");
        }


        let test: LocationOptions = {}
        Location.watchPositionAsync(test, (location) => {
          setLocation(location);
        }).then((sub) => { setSubscription(sub) }).
          catch((error) => { setErrorMsg(error) });
      }
    })();
  };

  const Remove = () => {
    Location.stopLocationUpdatesAsync("LocationUpdates");

    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    Setup();
    return () => Remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location:</Text>
      <Text style={styles.paragraph}>Permissions foreground:{grantedForeground?.status}</Text>
      <Text style={styles.paragraph}>Permissions grantedBackground:{grantedBackground?.status}</Text>

      {errorMsg && <Text style={styles.paragraph}>Error:{errorMsg}</Text>}
      {errorMsg == null && <Text style={styles.paragraph}>accuracy:{round(location?.coords.accuracy)}</Text>}
      {errorMsg == null && <Text style={styles.paragraph}>latitude:{round(location?.coords.latitude)}</Text>}
      {errorMsg == null && <Text style={styles.paragraph}>longitude:{round(location?.coords.longitude)}</Text>}
      {errorMsg == null && <Text style={styles.paragraph}>heading:{round(location?.coords.heading)}</Text>}
      {errorMsg == null && <Text style={styles.paragraph}>speed:{round(location?.coords.speed)}</Text>}
      {errorMsg == null && <Text style={styles.paragraph}>altitudeAccuracy:{round(location?.coords.altitudeAccuracy)}</Text>}
      {errorMsg == null && <Text style={styles.paragraph}>altitude:{round(location?.coords.altitude)}</Text>}

    </View>
  );
}

function round(n: number | undefined | null) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}