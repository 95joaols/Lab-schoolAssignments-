import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/homeScreen';
import MapScreen from './screens/mapScreen';

export default function App() {

  const [page, setPage] = useState('home');

  const goHome = () => setPage('home');

  const selectedPage = () => {
    switch (page) {
      case 'camera': return <HomeScreen onSetPage={setPage} />;
      case 'info': return <HomeScreen onSetPage={setPage} />;
      case 'background': return <HomeScreen onSetPage={setPage} />;
      case 'map': return <MapScreen onGoBack={goHome} />;
      case 'home': return <HomeScreen onSetPage={setPage} />;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {selectedPage()}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
