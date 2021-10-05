import { DefaultTheme } from '@react-navigation/native';

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgba(255, 255, 225, 0.05)'
  },
};

export const navigatorTheme = {
  headerTintColor: '#ffffff',
  headerStyle: { backgroundColor: '#8E9080' }
}
