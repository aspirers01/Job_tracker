import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, TextInput, StyleSheet } from 'react-native';

function CustomSearchBar(props) {
  return (
    <TextInput
      placeholder="Search applications..."
      placeholderTextColor="#999"
      style={styles.searchBar}
      value={props.value}
      onChangeText={text => props.setValue(text)}
      clearButtonMode="while-editing"
      returnKeyType="search"
    />
  );
}
export default CustomSearchBar;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    fontSize: 20,
    marginBottom: 50,
    marginHorizontal: 20,
  },
});
