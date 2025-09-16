import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { JobsContext } from '../context/JobContext';
import { useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DashboardsmallCard from '../Components/DashboardsmallCard';
import JobCard from '../Components/JobCard';
import ModalScreen from './ModalScreen';
function DashboardScreen(props) {
  const { jobs } = useContext(JobsContext); // 👈 get jobs globally
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState('All');
  const onjobclick = job => {
    props.navigation.navigate('JobInfoScreen', { job: job });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ModalScreen
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={jobs}
        selectedCard={selectedCard}
        navigation={props.navigation}
      />
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{ fontSize: 24, fontWeight: 'bold', margin: 10, padding: 5 }}
        >
          Dashboard
        </Text>
      </View>
      <View style={styles.gridContainer}>
        <View style={[styles.row]}>
          <TouchableOpacity
            style={[styles.upperCard, { backgroundColor: '#CBDCEB' }]}
            onPress={() => {
              setSelectedCard('All');
              setModalVisible(true);
            }}
          >
            <MaterialIcons
              style={{
                padding: 6,
                marginStart: 8,
                fontSize: 24,
                fontWeight: 'bold',
              }}
              name="work"
              size={24}
              color="#637AB9"
            />
            <Text
              style={{
                paddingHorizontal: 6,
                marginStart: 8,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {jobs.length}
            </Text>
            <Text
              style={{
                paddingHorizontal: 6,
                marginStart: 8,
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.upperCard, { backgroundColor: '#6D94C5' }]}
            onPress={() => {
              setSelectedCard('Applied');
              setModalVisible(true);
            }}
          >
            <MaterialIcons
              style={{
                padding: 6,
                marginStart: 8,
                fontSize: 24,
                fontWeight: 'bold',
              }}
              name="check-circle"
              size={24}
              color="#2563eb"
            />

            <Text
              style={{
                paddingHorizontal: 6,
                marginStart: 8,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {jobs.filter(job => job.status === 'Applied').length}
            </Text>
            <Text
              style={{
                padding: 6,
                marginStart: 8,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              Applied
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.row]}>
          <DashboardsmallCard
            onPress={() => {
              setSelectedCard('Interview');
              setModalVisible(true);
            }}
            label="Interview"
            count={jobs.filter(job => job.status === 'Interview').length}
            bgcolor={'#eda069ff'}
            iconcolor={'#f66d0bff'}
            icon={'check-circle'}
          />
          <DashboardsmallCard
            onPress={() => {
              setSelectedCard('Offer');
              setModalVisible(true);
            }}
            label="Offer"
            count={jobs.filter(job => job.status === 'Offer').length}
            bgcolor={'#83ca9bff'}
            iconcolor={'#16a34a'}
            icon={'emoji-events'}
          />
          <DashboardsmallCard
            onPress={() => {
              setSelectedCard('Rejected');
              setModalVisible(true);
            }}
            label="Rejected"
            count={jobs.filter(job => job.status === 'Rejected').length}
            iconcolor={'#db1c1cff'}
            bgcolor={'#f4ababff'}
            icon={'sentiment-dissatisfied'}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            margin: 10,
            paddingHorizontal: 5,
          }}
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
                marginTop: '30%',
              }}
            >
              <Text style={{ fontSize: 16, color: '#666' }}>
                No data to show
              </Text>
            </View>
          }
          data={jobs.slice(0, 10)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onjobclick(item)}>
              <JobCard job={item} />
            </TouchableOpacity>
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
    backgroundColor: '#e3e8f4ff',
  },
  gridContainer: {
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 5,
    padding: 5,
  },
  upperCard: {
    width: '48%',
    height: 130,
    borderRadius: 12,
    justifyContent: 'start',
    padding: 5,
    marginTop: 10,
  },

  activitiesContainer: {
    flex: 1,
  },
});
