import { View, Text, StyleSheet } from 'react-native';

function Card(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.content}>
        <Text style={{ color: props.color }}>{props.content}</Text>
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: 150,
    backgroundColor: '#e4e0e0ff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    borderBlockColor: '#d26060ff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    fontSize: 14,
    color: '#333',
  },
});
