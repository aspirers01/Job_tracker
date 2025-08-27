import Ionicons from '@react-native-vector-icons/ionicons';
import { View, TextInput, StyleSheet } from 'react-native';

function LoginWithInput(props) {
  return (
    <View style={styles.container}>
      <Ionicons name={props.iconname} size={24} color="gray" />
      <TextInput
        style={styles.textInput}
        placeholder={props.placeholder}
        value={props.value}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        keyboardType={props.title === 'Username' ? 'email-address' : 'default'}
        secureTextEntry={
          props.placeholder === ('Password' || 'Confirm Password')
            ? true
            : false
        }
        onChangeText={text => props.setValue(text)}
      />
    </View>
  );
}

export default LoginWithInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#D0D0D0',
    borderRadius: 10,
    padding: 10,
    margintop: 30,
    marginBottom: 20,
  },
  textInput: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
