import { Text, View, StyleSheet } from "react-native";

export default function Mesocycles() {
  return (
    <View style={styles.container}>
      <Text>Mesocycles</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
