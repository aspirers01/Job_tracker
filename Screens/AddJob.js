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
import { useRoute } from '@react-navigation/native';
import { JobsContext } from '../context/JobContext';
import { useContext, useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function AddJobScreen(props) {
  const route = useRoute();
  const jobToEdit = route.params?.jobToEdit;
  const { addOrUpdateJob } = useContext(JobsContext);

  const [company, setCompany] = useState('');
  const [jobtitle, setJobtitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Applied');
  const [link, setLink] = useState('');
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (jobToEdit) {
      setCompany(jobToEdit.company || '');
      setJobtitle(jobToEdit.jobtitle || '');
      setStatus(jobToEdit.status || 'Applied');
      setLink(jobToEdit.link || '');
      setDate(jobToEdit.date ? new Date(jobToEdit.date) : null);
      setNote(jobToEdit.note || '');
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

  const handleSave = async () => {
    if (!company || !jobtitle || !status || !date) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    await addOrUpdateJob(
      { company, jobtitle, status, date, link, note },
      jobToEdit?._id,
    );
    props.navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="work" size={28} color="#007AFF" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.headerTitle}>Job Application</Text>
            <Text style={styles.headerSubtitle}>
              Track your application progress
            </Text>
          </View>
        </View>

        {/* Company Name */}
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          value={company}
          onChangeText={setCompany}
          placeholder="e.g. Google, Apple, Microsoft"
          placeholderTextColor="#aaa"
        />

        {/* Job Title */}
        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          value={jobtitle}
          onChangeText={setJobtitle}
          placeholder="e.g. Senior Frontend Developer"
          placeholderTextColor="#aaa"
        />

        {/* Application Date */}
        <Text style={styles.label}>Application Date</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.input}>
          <Text style={{ fontSize: 16, color: date ? '#000' : '#aaa' }}>
            {date ? formatDate(date) : 'dd/mm/yyyy'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display="spinner"
        />

        {/* Status */}
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {['Applied', 'Interview', 'Offer', 'Rejected'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.statusButton,
                status === option && styles.statusButtonActive,
              ]}
              onPress={() => setStatus(option)}
            >
              <Text
                style={[
                  styles.statusText,
                  status === option && styles.statusTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Link */}
        <Text style={styles.label}>Link to Job Posting (Optional)</Text>
        <TextInput
          style={styles.input}
          value={link}
          onChangeText={setLink}
          placeholder="https://company.com/jobs/frontend-dev"
          placeholderTextColor="#aaa"
        />

        {/* Notes */}
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          value={note}
          onChangeText={setNote}
          placeholder="Add any relevant notes here..."
          placeholderTextColor="#aaa"
          multiline={true}
        />
      </ScrollView>

      {/* Add Button Fixed at Bottom */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleSave}>
          <MaterialIcons name="work" size={20} color="#fff" />
          <Text style={styles.addButtonText}>
            {loading
              ? 'Please wait...'
              : jobToEdit
              ? 'Update Job'
              : 'Add Job Application'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default AddJobScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9fafb' },
  container: { padding: 20, paddingBottom: 120 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerSubtitle: { fontSize: 14, color: '#666' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  statusRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    marginBottom: 10,
  },
  statusButtonActive: {
    backgroundColor: '#e0edff',
    borderColor: '#007AFF',
  },
  statusText: { color: '#444', fontWeight: '500' },
  statusTextActive: { color: '#007AFF', fontWeight: '600' },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
