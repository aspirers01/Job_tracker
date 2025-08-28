import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../Components/SearchBar';
import Button from '../Components/Button';
import { useCallback, useEffect, useState } from 'react';
import { JobsContext } from '../context/JobContext';
import { useContext } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
function ApplicationsScreen(props) {
  const { jobs, loading, fetchJobs } = useContext(JobsContext);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchJobs(); // will always refetch on focus
    }, [fetchJobs]),
  );

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

  const filteredJobs = jobs.filter(job => {
    const matchesFilter =
      selectedFilter === 'All' || job.status === selectedFilter;

    const matchesSearch =
      searchQuery.trim() === '' ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobtitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searcharea}>
        <SearchBar value={searchQuery} setValue={setSearchQuery} />
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
