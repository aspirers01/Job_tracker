import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../Components/SearchBar';
import React, { useState } from 'react';
import Button from '../Components/Button';

function ApplicationsScreen(props) {
  const FILTERS = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];
  const getTagColor = tag => {
    switch (tag.toLowerCase()) {
      case 'offer':
        return 'green';
      case 'interview':
        return 'blue';
      case 'rejected':
        return 'red';
      case 'applied':
        return 'orange';
      default:
        return '#999'; // default gray color
    }
  };

  const [jobs, setJobs] = useState([
    { id: 1, company: 'Netflix', role: 'Software Engineer', status: 'Applied' },
    { id: 2, company: 'Microsoft', role: 'Product Manager', status: 'Applied' },
    { id: 3, company: 'Apple', role: 'UX Designer', status: 'Applied' },
    { id: 4, company: 'Google', role: 'Data Scientist', status: 'Applied' },
    { id: 5, company: 'Amazon', role: 'Backend Engineer', status: 'Interview' },
    { id: 6, company: 'Meta', role: 'Frontend Engineer', status: 'Offer' },
  ]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredJobs =
    selectedFilter === 'All'
      ? jobs
      : jobs.filter(job => job.status === selectedFilter);

  const handleAddJob = () => {
    // For now, just add a dummy job (later can open a form modal)
    const newJob = {
      id: jobs.length + 1,
      company: 'New Company',
      role: 'New Role',
      status: 'Applied',
    };
    setJobs([newJob, ...jobs]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searcharea}>
        <SearchBar />
      </View>
      <View style={styles.addbutton}>
        <Button title="+ Add Job" onPress={handleAddJob} />
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
        data={filteredJobs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log(`Selected job: ${item.company}`)}
            style={styles.jobCard}
          >
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.role}>{item.role}</Text>
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
