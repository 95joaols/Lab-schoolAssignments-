import { Subscription } from "@unimodules/react-native-adapter";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { LocationObject, LocationPermissionResponse } from "expo-location";
import React, { createContext, FC, useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

interface ContextValue {
    location: LocationObject | undefined;
    errorMsg: string | undefined;
    grantedForeground: LocationPermissionResponse | undefined;
    grantedBackground: LocationPermissionResponse | undefined;
}

export const LocationContext = createContext<ContextValue>({
    location: undefined,
    errorMsg: undefined,
    grantedForeground: undefined,
    grantedBackground: undefined
});

const LocationProvider: FC = (props) => {
    const [location, setLocation] = useState<LocationObject>();
    const [errorMsg, setErrorMsg] = useState<string>();
    const [grantedForeground, setGrantedForeground] = useState<LocationPermissionResponse>()
    const [grantedBackground, setGrantedBackground] = useState<LocationPermissionResponse>()

    const [subscription, setSubscription] = useState<Subscription>();

    const Setup = useCallback(() => {
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
                Location.watchPositionAsync({}, (location) => {
                    setLocation(location);
                }).then((sub) => { setSubscription(sub); })
                    .catch((error) => { setErrorMsg(String(error)); });

            }
        })();
    }, []);

    useEffect(() => {
        Setup();

        return () => {
            Location.stopLocationUpdatesAsync("LocationUpdates");

            subscription && subscription.remove();
            setSubscription(undefined);
        };
    }, [Setup]);

    return (
        <LocationContext.Provider
            value={{
                location,
                errorMsg,
                grantedForeground,
                grantedBackground
            }}
        >
            {props.children}
        </LocationContext.Provider>
    );
};

export default LocationProvider;