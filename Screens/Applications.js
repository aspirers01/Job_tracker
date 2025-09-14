import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { useCallback, useEffect, useState } from 'react';
import { JobsContext } from '../context/JobContext';
import { useContext } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSearchBar from '../Components/SearchBar';
import FilterCard from '../Components/FilterCard';
import JobCard from '../Components/JobCard';
function ApplicationsScreen(props) {
  const { jobs, loading, fetchJobs } = useContext(JobsContext);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchJobs(); // will always refetch on focus
    }, [fetchJobs]),
  );

  const onjobclick = job => {
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
    <FlatList
      style={styles.container}
      data={filteredJobs}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onjobclick(item)}>
          <JobCard job={item} />
        </TouchableOpacity>
      )}
      ListHeaderComponent={
        <>
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
                  {filteredJobs.length} total applications
                </Text>
              </View>
            </View>
            <CustomSearchBar value={searchQuery} setValue={setSearchQuery} />
          </LinearGradient>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.statsRow}
          >
            <FilterCard
              bgcolor={'#cae3feff'}
              name={'work'}
              color="#2563eb"
              count={jobs.length}
              label="All"
              selected={selectedFilter === 'All'}
              onPress={() => setSelectedFilter('All')}
            />
            <FilterCard
              bgcolor={'#cae3feff'}
              name={'schedule'}
              color="#2563eb"
              count={jobs.filter(job => job.status === 'Applied').length}
              label="Applied"
              selected={selectedFilter === 'Applied'}
              onPress={() => setSelectedFilter('Applied')}
            />
            <FilterCard
              bgcolor={'#fdffc9ff'}
              name={'check-circle'}
              color="rgba(244, 244, 10, 1)"
              count={jobs.filter(job => job.status === 'Interview').length}
              label="Interview"
              selected={selectedFilter === 'Interview'}
              onPress={() => setSelectedFilter('Interview')}
            />
            <FilterCard
              bgcolor={'#d7fab1ff'}
              name={'emoji-events'}
              color="#16a34a"
              count={jobs.filter(job => job.status === 'Offer').length}
              label="Offer"
              selected={selectedFilter === 'Offer'}
              onPress={() => setSelectedFilter('Offer')}
            />
            <FilterCard
              bgcolor={'#FFEAEA'}
              name={'sentiment-dissatisfied'}
              color="#db1c1cff"
              count={jobs.filter(job => job.status === 'Rejected').length}
              label="Rejected"
              selected={selectedFilter === 'Rejected'}
              onPress={() => setSelectedFilter('Rejected')}
            />
          </ScrollView>

          <Text style={styles.sectionTitle}>Recent Applications</Text>
          <Text style={styles.sectionSubtitle}>
            Track your job application progress
          </Text>
        </>
      }
    />
  );
}
export default ApplicationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e8f4ff',
  },
  // gradient and header styles
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
  headerSubtitle: { color: '#e5e7eb', marginTop: 4, fontSize: 18 },

  // Job application statistics
  statsRow: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
  },
  // Section
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
});
