
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function TodoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODOアプリ</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
});