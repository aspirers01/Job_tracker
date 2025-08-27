import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../Components/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Components/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ApplicationsScreen(props) {
  const [jobs, setJobs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        const baseURL =
          Platform.OS === 'android'
            ? 'http://10.0.2.2:8080/api/v1/jobs'
            : 'http://localhost:8080/api/v1/jobs';

        const res = await axios.get(`${baseURL}/getjobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);

  const FILTERS = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];
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

  const onjobclick = job => {
    console.log('Selected job:', job);
    props.navigation.navigate('AddJobScreen', { jobToEdit: job });
    // Navigate to job details screen or perform any action
  };

  const filteredJobs =
    selectedFilter === 'All'
      ? jobs
      : jobs.filter(job => job.status === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searcharea}>
        <SearchBar />
      </View>
      <View style={styles.addbutton}>
        <Button
          title="+ Add Job"
          onPress={() => props.navigation.navigate('AddJobScreen')}
        />
      </View>
      <View style={styles.filterRow}>
        {FILTERS.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
            <Text style={{ fontSize: 16, color: '#666' }}>No data to show</Text>
          </View>
        }
        data={filteredJobs}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onjobclick(item)}
            style={styles.jobCard}
          >
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.role}>{item.jobtitle}</Text>
            <Text style={[styles.status, { color: getTagColor(item.status) }]}>
              {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export default ApplicationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searcharea: {
    backgroundColor: '#0896ddff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#ddd',
    borderColor: '#888',
  },
  filterText: {
    color: '#555',
  },
  filterTextActive: {
    fontWeight: 'bold',
    color: '#000',
  },
  jobCard: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  company: { fontWeight: 'bold', fontSize: 16 },
  role: { color: '#666' },
  status: { color: '#999', fontSize: 12 },

  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  addbutton: {
    backgroundColor: '#109bfeff',
    padding: 10,
    width: 100,
    marginEnd: 10,
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
});
