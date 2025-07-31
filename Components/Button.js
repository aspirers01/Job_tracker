import { Pressable, Text } from 'react-native';

function Button(props) {
  return (
    <Pressable onPress={props.onPress}>
      <Text>{props.loading ? 'Please wait...' : props.title}</Text>
    </Pressable>
  );
}

export default Button;
