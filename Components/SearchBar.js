import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, TextInput, StyleSheet } from 'react-native';

function SearchBar(props) {
  return (
    <Pressable style={styles.container}>
      <Ionicons name="search" size={22} color="black" />
      <TextInput
        style={{ padding: 5, fontSize: 20 }}
        placeholder="Search job here.."
        value={props.value}
        onChangeText={text => props.setValue(text)}
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
