import { View, Text, StyleSheet } from 'react-native';

function CardActivity({ title, date, tag }) {
  // Function to get color based on tag
  const getTagColor = tag => {
    switch (tag) {
      case 'Offer':
        return 'green';
      case 'Interview':
        return 'blue';
      case 'Rejected':
        return 'red';
      case 'Applied':
        return 'orange';
      default:
        return '#999'; // default gray color
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Text style={[styles.tag, { color: getTagColor(tag) }]}>{tag}</Text>
    </View>
  );
}

export default CardActivity;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingStart: 10,
    margin: 5,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  tag: {
    fontSize: 12,
    color: '#999',
  },
});
