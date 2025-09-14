import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function FilterCard(props) {
  return (
    <TouchableOpacity
      style={[
        styles.statsCard,
        { backgroundColor: props.bgcolor }, // default bg
        props.selected && styles.selectedCard, // highlight if active
      ]}
      onPress={props.onPress}
    >
      <MaterialIcons name={props.name} size={20} color={props.color} />
      <Text style={styles.statNumber}>{props.count}</Text>
      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
}

export default FilterCard;
const styles = StyleSheet.create({
  statsCard: {
    width: '25%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    marginHorizontal: 5,
    marginVertical: 20,
  },
  statNumber: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#6366f1', // Indigo border to highlight selection
    transform: [{ scale: 1.08 }], // Slight zoom effect
  },
});
