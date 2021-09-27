import { createContext, FC, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";

interface ContextValue {
  screenOrientation: ScreenOrientation.Orientation;
}

export const ScreenOrientationContext = createContext<ContextValue>({
  screenOrientation: ScreenOrientation.Orientation.PORTRAIT_UP,
});

const ScreenOrientationProvider: FC = (props) => {
  const [screenOrientation, setScreenOrientation] =
    useState<ScreenOrientation.Orientation>(
      ScreenOrientation.Orientation.PORTRAIT_UP
    );
  ScreenOrientation.addOrientationChangeListener(async () => {
    const orientationValue = await ScreenOrientation.getOrientationAsync();
    setScreenOrientation(orientationValue);
  });

  return (
    <ScreenOrientationContext.Provider
      value={{
        screenOrientation,
      }}
    >
      {props.children}
    </ScreenOrientationContext.Provider>
  );
};

export default ScreenOrientationProvider;
