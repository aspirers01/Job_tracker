import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import Card from '../Components/Card';
import CardActivity from '../Components/CardActivity';
function DashboardScreen(props) {
  const cardtitle = ['total', 'interviews', 'offer', 'rejected'];
  const cardcontent = ['10', '5', '2', '3'];
  const colorCodes = ['black', 'blue', 'green', 'red'];
  const recentActivities = [
    { title: 'Applied for Job A', date: '2023-10-01', tag: 'offer' },
    { title: 'Interviewed at Company B', date: '2023-10-02', tag: 'interview' },
    {
      title: 'Received Offer from Company C',
      date: '2023-10-03',
      tag: 'offer',
    },
    { title: 'Rejected by Company D', date: '2023-10-04', tag: 'rejected' },

    { title: 'Applied for Job E', date: '2023-10-05', tag: 'offer' },
    { title: 'Interviewed at Company F', date: '2023-10-06', tag: 'interview' },
    {
      title: 'Received Offer from Company G',
      date: '2023-10-07',
      tag: 'offer',
    },
    { title: 'Rejected by Company H', date: '2023-10-08', tag: 'rejected' },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridContainer}>
        <FlatList
          data={cardtitle}
          renderItem={({ item, index }) => (
            <Card
              title={item}
              content={cardcontent[index]}
              color={colorCodes[index]}
            />
          )}
          keyExtractor={item => item}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
      <View>
        <Text
          style={{ fontSize: 24, fontWeight: 'bold', margin: 10, padding: 5 }}
        >
          Recent Activities
        </Text>
      </View>
      <View style={styles.activitiesContainer}>
        <FlatList
          data={recentActivities}
          renderItem={({ item }) => (
            <CardActivity title={item.title} date={item.date} tag={item.tag} />
          )}
          keyExtractor={item => item.title}
        />
      </View>
    </SafeAreaView>
  );
}

export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  gridContainer: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  activitiesContainer: {
    height: 300, // Fixed height - adjust as needed
    marginTop: 10,
  },
});
