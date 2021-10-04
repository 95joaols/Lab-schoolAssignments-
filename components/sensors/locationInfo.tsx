import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "../../constants/SensorsStyles";
import { LocationContext } from "../../contexts/sensors/locationContext";

export default function LocationInfo() {
  const Location = useContext(LocationContext)

  if (Location.errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Location:</Text>
        <Text style={styles.paragraph}>Permissions foreground:{Location.grantedForeground?.status}</Text>
        <Text style={styles.paragraph}>Permissions grantedBackground:{Location.grantedBackground?.status}</Text>

        <Text style={styles.paragraph}>Error:{Location.errorMsg}</Text>
      </View>
    );
  }
  if (Location.location) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Location:</Text>
        <Text style={styles.paragraph}>Permissions foreground:{Location.grantedForeground?.status}</Text>
        <Text style={styles.paragraph}>Permissions grantedBackground:{Location.grantedBackground?.status}</Text>

        <Text style={styles.paragraph}>accuracy:{round(Location.location.coords.accuracy)}</Text>
        <Text style={styles.paragraph}>latitude:{round(Location.location.coords.latitude)}</Text>
        <Text style={styles.paragraph}>longitude:{round(Location.location.coords.longitude)}</Text>
        <Text style={styles.paragraph}>heading:{round(Location.location.coords.heading)}</Text>
        <Text style={styles.paragraph}>speed:{round(Location.location.coords.speed)}</Text>
        <Text style={styles.paragraph}>altitudeAccuracy:{round(Location.location.coords.altitudeAccuracy)}</Text>
        <Text style={styles.paragraph}>altitude:{round(Location.location.coords.altitude)}</Text>

      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location:</Text>
      <Text style={styles.paragraph}>Permissions foreground:{Location.grantedForeground?.status}</Text>
      <Text style={styles.paragraph}>Permissions grantedBackground:{Location.grantedBackground?.status}</Text>

      <Text style={styles.paragraph}>No Data</Text>
    </View>
  );


}

function round(n: number | null) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}