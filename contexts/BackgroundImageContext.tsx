import { createContext, FC, useState } from "react";
import React from "react";

interface ContextValue {
  backgroundImage: string;
  setBackgroundImage: (image: string) => void;
}

export const BackgroundImageContext = createContext<ContextValue>({
  backgroundImage: 'https://www.fonewalls.com/wp-content/uploads/Blond-Solid-Color-Background-Wallpaper-for-Mobile-Phone-300x533.png',
  setBackgroundImage: () => {}
});

const BackgroundImageProvider: FC = (props) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('https://www.fonewalls.com/wp-content/uploads/Blond-Solid-Color-Background-Wallpaper-for-Mobile-Phone-300x533.png');
  
  return (
    <BackgroundImageContext.Provider
      value={{
        backgroundImage,
        setBackgroundImage
      }}
    >
      {props.children}
    </BackgroundImageContext.Provider>
  );
};

export default BackgroundImageProvider;
