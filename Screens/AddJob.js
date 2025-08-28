import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
function AddJobScreen(props) {
  const route = useRoute();
  const jobToEdit = route.params?.jobToEdit; // coming from FlatList item press

  // States
  const [company, setCompany] = useState('');
  const [jobtitle, setJobtitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Applied');
  const [link, setLink] = useState('');
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [note, setNote] = useState('');

  async function jobHandler() {
    // Make API call to save job

    try {
      setLoading(true);
      const baseURL =
        Platform.OS === 'android'
          ? 'http://10.0.2.2:8080/api/v1/jobs'
          : 'http://localhost:8080/api/v1/jobs';
      const token = await AsyncStorage.getItem('accessToken');
      // console.log(token);
      const jobdata = { company, jobtitle, status, date, link, note };
      let res;
      if (jobToEdit) {
        res = await axios.put(`${baseURL}/update/${jobToEdit._id}`, jobdata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // console.log('Creating new job:', jobdata);
        res = await axios.post(`${baseURL}/create`, jobdata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log('Job saved successfully:', res.data);
      }
    } catch (error) {
      console.error(
        'Error saving job:',
        error.response?.data || error.message, // ✅ show actual backend error
        error.response?.status, // ✅ show status code
      );
      Alert.alert('Error', 'Failed to save job. Please try again.');
    }
  }
  // Pre-fill if editing
  useEffect(() => {
    if (jobToEdit) {
      console.log('jobToEdit:', jobToEdit);
      setCompany(jobToEdit.company || '');
      setJobtitle(jobToEdit.jobtitle || '');

      setStatus(jobToEdit.status || 'Applied');
      setLink(jobToEdit.link || '');
      setDate(jobToEdit.date ? new Date(jobToEdit.date) : null);
      setNote(jobToEdit.note || '');
    } else {
      console.log('job id no found ');
    }
  }, [jobToEdit]);

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
    jobHandler();
    props.navigation.replace('Main');
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
          value={jobtitle}
          onChangeText={setJobtitle}
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
            <Picker.Item label="Applied" value="Applied" />
            <Picker.Item label="Interview" value="Interview" />
            <Picker.Item label="Offer" value="Offer" />
            <Picker.Item label="Rejected" value="Rejected" />
          </Picker>
        </View>

        <Text style={styles.label}>Link to Job Posting (Optional)</Text>
        <TextInput
          style={styles.input}
          value={link}
          onChangeText={setLink}
          placeholder="Enter job link"
        />
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
          value={note}
          onChangeText={setNote}
          placeholder="Add any relevant notes here..."
          multiline={true}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleSave}>
          <Text style={styles.addButtonText}>
            {loading ? 'Please wait...' : jobToEdit ? 'Update Job' : 'Add Job'}
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
