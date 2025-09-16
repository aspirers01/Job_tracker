import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { useState } from 'react';
import CustomSearchBar from '../Components/SearchBar';
import JobCard from '../Components/JobCard';

const { height } = Dimensions.get('window');
function ModalScreen({ isVisible, onClose, navigation, data, selectedCard }) {
  const [search, setSearch] = useState('');

  const filteredJobs = data.filter(job => {
    const matchesFilter = selectedCard === 'All' || job.status === selectedCard;

    const matchesSearch =
      search.trim() === '' ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.jobtitle.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && matchesFilter;
  });
  const onjobclick = job => {
    onClose();
    navigation.navigate('JobInfoScreen', { job });
  };
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View>
          <CustomSearchBar value={search} setValue={setSearch} />
        </View>
        <FlatList
          data={filteredJobs}
          keyExtractor={item => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onjobclick(item)}>
              <JobCard job={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ fontSize: 16, color: '#666' }}>
                No data to show
              </Text>
            </View>
          }
        />
      </View>
    </Modal>
  );
}
export default ModalScreen;
const styles = StyleSheet.create({
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    height: height * 0.75,
    backgroundColor: '#e3e8f4ff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});
