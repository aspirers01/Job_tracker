import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import { useCallback, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { JobsContext } from '../context/JobContext';
import CustomSearchBar from '../Components/SearchBar';
import FilterCard from '../Components/FilterCard';
import JobCard from '../Components/JobCard';

function ApplicationsScreen(props) {
  const { jobs, fetchJobs } = useContext(JobsContext);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, [fetchJobs]),
  );

  const onjobclick = job => {
    props.navigation.navigate('JobInfoScreen', { job: job });
  };

  // Filters config
  const filters = [
    { label: 'All', color: '#637AB9', bgcolor: '#CBDCEB', icon: 'work' },
    {
      label: 'Applied',
      color: '#2563eb',
      bgcolor: '#cae3feff',
      icon: 'schedule',
    },
    {
      label: 'Interview',
      color: '#f66d0bff',
      bgcolor: '#eda069ff',
      icon: 'check-circle',
    },
    {
      label: 'Offer',
      color: '#16a34a',
      bgcolor: '#d7fab1ff',
      icon: 'emoji-events',
    },
    {
      label: 'Rejected',
      color: '#db1c1cff',
      bgcolor: '#FFEAEA',
      icon: 'sentiment-dissatisfied',
    },
  ];

  // Apply filter + search
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={['#3059FB', '#9419F9', '#5C36F6']}
        angle={45}
        useAngle={true}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Job Applications</Text>
            <Text style={styles.headerSubtitle}>
              {filteredJobs.length} applications
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => props.navigation.navigate('AddJobScreen')}
          >
            <Text style={styles.addButtonText}>+ Add Job</Text>
          </TouchableOpacity>
        </View>
        <CustomSearchBar value={searchQuery} setValue={setSearchQuery} />
      </LinearGradient>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={filters}
        keyExtractor={item => item.label}
        renderItem={({ item }) => (
          <View style={{ marginRight: 12 }}>
            <FilterCard
              bgcolor={item.bgcolor}
              name={item.icon}
              color={item.color}
              count={
                item.label === 'All'
                  ? jobs.length
                  : jobs.filter(job => job.status === item.label).length
              }
              label={item.label}
              selected={selectedFilter === item.label}
              onPress={() => setSelectedFilter(item.label)}
            />
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Recent Applications</Text>
      <Text style={styles.sectionSubtitle}>
        Track your job application progress
      </Text>

      <View style={{ paddingBottom: 40 }}>
        {filteredJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 16, color: '#666' }}>No data to show</Text>
          </View>
        ) : (
          filteredJobs.map(item => (
            <TouchableOpacity key={item.id} onPress={() => onjobclick(item)}>
              <JobCard job={item} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

export default ApplicationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e8f4ff',
  },
  headerTop: {
    marginTop: 100,
    marginBottom: 20,
    marginStart: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e5e7eb',
    marginTop: 4,
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 20,
    marginBottom: 10,
  },
  emptyState: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    paddingEnd: 15,
    marginEnd: 20,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#3059FB',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
