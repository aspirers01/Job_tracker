import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
function DashboardsmallCard(props) {
  return (
    <TouchableOpacity
      style={[
        styles.statsCard,
        { backgroundColor: props.bgcolor }, // default bg
      ]}
      onPress={props.onPress}
    >
      <MaterialIcons name={props.icon} size={24} color={props.iconcolor} />
      <Text style={styles.statNumber}>{props.count}</Text>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
}

export default DashboardsmallCard;
const styles = StyleSheet.create({
  statsCard: {
    width: '30%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  label: { fontSize: 16, color: '#fff' },
});
