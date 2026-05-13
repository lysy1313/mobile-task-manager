import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Task Manager</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0F172A',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 12,
  },
});
