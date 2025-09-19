import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, TextInput, StyleSheet } from 'react-native';

function LoginWithInput(props) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={props.iconname} size={22} color="#6B7280" />
      <TextInput
        style={styles.textInput}
        placeholder={props.placeholder}
        placeholderTextColor="#9CA3AF"
        value={props.value}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        keyboardType={props.title === 'Username' ? 'email-address' : 'default'}
        secureTextEntry={
          props.placeholder === 'Password' ||
          props.placeholder === 'Confirm Password'
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
    borderWidth: 1,
    borderColor: '#E5E7EB', // light gray border
    backgroundColor: '#FFFFFF', // white input field
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 12, // less spacing between fields
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2, // subtle shadow for Android
  },
  textInput: {
    flex: 1,
    color: '#111827', // dark text
    fontSize: 16,
    marginLeft: 8,
  },
});
