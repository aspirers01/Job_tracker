import { View, StyleSheet, Text } from 'react-native';

// const FILTERS = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];
const getTagColor = tag => {
  switch (tag) {
    case 'Offer':
      return '#16a34a';
    case 'Interview':
      return '#f66d0bff';
    case 'Rejected':
      return '#db1c1cff';
    case 'Applied':
      return '#2563eb';
    default:
      return '#999'; // default gray color
  }
};

function JobCard({ job }) {
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.position}>{job.jobtitle}</Text>
        <Text style={styles.date}>{job.date.slice(0, 10)}</Text>
      </View>
      <View
        style={[styles.badge, { backgroundColor: getTagColor(job.status) }]}
      >
        <Text style={styles.badgeText}>{job.status}</Text>
      </View>
    </View>
  );
}

export default JobCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
  },
  subcontainer: {
    padding: 5,
    marginStart: 5,
  },
  position: { fontSize: 16, fontWeight: '600' },
  company: { fontSize: 20, color: '#6b7280' },
  date: { fontSize: 12, color: '#9ca3af', marginTop: 4 },
  badge: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,

    marginHorizontal: 8,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
