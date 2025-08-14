import { Text, View, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
function TestScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Ionicons name="home" size={30} color="black" />
    </View>
  );
}

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
