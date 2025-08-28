import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';

import { JobsContext } from '../context/JobContext';
import { useContext } from 'react';

import Card from '../Components/Card';
import CardActivity from '../Components/CardActivity';
function DashboardScreen(props) {
  const { jobs } = useContext(JobsContext); // 👈 get jobs globally

  const cardtitle = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];
  const colorCodes = ['black', 'blue', 'green', 'red', 'orange']; // make sure length matches

  // Count jobs by status
  const cardcontent = cardtitle.map(status => {
    if (status === 'All') {
      return jobs.length;
    } else {
      return jobs.filter(job => job.status === status).length;
    }
  });
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
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              <Text style={{ fontSize: 16, color: '#666' }}>
                No data to show
              </Text>
            </View>
          }
          data={jobs.slice(0, 10)}
          renderItem={({ item }) => (
            <CardActivity
              title={item.company}
              date={item.date.toString().slice(0, 10)}
              tag={item.status}
            />
          )}
          keyExtractor={item => item._id.toString()}
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
