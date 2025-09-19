import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

function Button({ onPress, title, loading, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={[styles.button, (loading || disabled) && styles.disabled]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563EB', // primary blue
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // takes full width of parent
    marginVertical: 10,
  },
  disabled: {
    backgroundColor: '#9CA3AF', // gray when disabled
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
