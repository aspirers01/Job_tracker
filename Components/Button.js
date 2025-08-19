import { Pressable, Text, TouchableOpacity } from 'react-native';

function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.loading ? 'Please wait...' : props.title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
