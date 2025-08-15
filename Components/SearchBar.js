import Ionicons from '@react-native-vector-icons/ionicons';
import { Pressable, TextInput, StyleSheet } from 'react-native';

function SearchBar() {
  return (
    <Pressable style={styles.container}>
      <Ionicons name="search" size={22} color="black" />
      <TextInput
        style={{ padding: 5, fontSize: 20 }}
        placeholder="Search job here.."
      />
    </Pressable>
  );
}
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    flex: 1,
    padding: 8,
  },
});
