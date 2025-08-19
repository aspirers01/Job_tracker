import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';

function AddJobScreen({ navigation }) {
  const route = useRoute();
  const jobToEdit = route.params?.job; // coming from FlatList item press

  // States
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

  const [status, setStatus] = useState('applied');
  const [link, setLink] = useState('');
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Pre-fill if editing
  useEffect(() => {
    if (jobToEdit) {
      setCompany(jobToEdit.company || '');
      setPosition(jobToEdit.position || '');

      setStatus(jobToEdit.status || 'applied');
      setLink(jobToEdit.link || '');
      setDate(jobToEdit.date ? new Date(jobToEdit.date) : null);
    }
  }, [jobToEdit]);

  // Date Picker Handlers
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    hideDatePicker();
  };
  const formatDate = date => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Save / Update Job
  const handleSave = () => {
    const jobData = {
      company,
      position,
      status,
      date: date ? formatDate(date) : null,
      link,
    };

    if (jobToEdit) {
      // 🔹 Update existing job
      console.log('Updating Job:', { id: jobToEdit.id, ...jobData });
      // TODO: Update in database with jobToEdit.id
    } else {
      // 🔹 Add new job
      console.log('Adding New Job:', jobData);
      // TODO: Save new job in database
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          value={company}
          onChangeText={setCompany}
          placeholder="Enter company"
        />

        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          value={position}
          onChangeText={setPosition}
          placeholder="Enter job title"
        />

        <Text style={styles.label}>Application Date</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Text style={styles.dateText}>
            {date ? formatDate(date) : 'Select a Date'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display="spinner"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={status} onValueChange={setStatus}>
            <Picker.Item label="Applied" value="applied" />
            <Picker.Item label="Interview" value="interview" />
            <Picker.Item label="Offer" value="offer" />
            <Picker.Item label="Rejected" value="rejected" />
          </Picker>
        </View>

        <Text style={styles.label}>Link to Job Posting (Optional)</Text>
        <TextInput
          style={styles.input}
          value={link}
          onChangeText={setLink}
          placeholder="Enter job link"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleSave}>
          <Text style={styles.addButtonText}>
            {jobToEdit ? 'Update Job' : 'Add Job'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
export default AddJobScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  dateText: { fontSize: 16, color: '#333' },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
