import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
function JobinfoScreen(props) {
  const jobdata = props.route.params.job;

  function editjob() {
    props.navigation.navigate('AddJobScreen', { jobToEdit: jobdata });
  }
  const deleteJob = async jobId => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const baseURL = 'https://job-trackerbackendapi.onrender.com/api/v1/jobs';
      const res = await axios.delete(`${baseURL}/delete/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Job deleted successfully');
      return res.data; // returns { message: "Job deleted successfully", job }
    } catch (error) {
      console.error(
        'Error deleting job:',
        error.response?.data || error.message,
      );
      alert('Failed to delete job. Please try again.');
      throw error;
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.container}
      >
        <Text style={styles.header}>Job Application Details</Text>
        <View style={styles.jobCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.jobTitle}>{jobdata.company}</Text>
            <Text style={styles.company}>{jobdata.jobtitle}</Text>
          </View>
        </View>
        <View style={styles.statusWrapper}>
          <Text style={styles.status}>{jobdata.status}</Text>
          <Text style={styles.appliedDate}>
            Applied on {jobdata.date.slice(0, 10)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job link</Text>
          <Text style={styles.description}>
            {jobdata.link ? jobdata.link : 'No job link available'}
          </Text>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Notes</Text>
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              {jobdata.note ? jobdata.note : 'No notes available'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.editBtn} onPress={editjob}>
          <MaterialIcons name="edit" size={20} color="#fff" />
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this job application?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await deleteJob(jobdata._id);
                      props.navigation.navigate('Main');
                    } catch (error) {
                      // Error handling is done in deleteJob
                    }
                  },
                },
              ],
            );
          }}
        >
          <MaterialIcons name="delete" size={20} color="#fff" />
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default JobinfoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3e8f4ff' },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginTop: 30,
    elevation: 2,
  },
  jobTitle: { fontSize: 18, fontWeight: 'bold' },
  company: { fontSize: 14, color: '#555', marginTop: 4 },
  statusWrapper: { margin: 16 },
  status: {
    backgroundColor: '#22c55e',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    color: '#fff',
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  appliedDate: { marginTop: 6, color: '#555' },
  section: { marginHorizontal: 16, marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  description: { color: '#444', lineHeight: 20 },
  noteBox: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
  },
  noteText: { color: '#444' },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    marginBottom: 80,
  },
  editBtn: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteBtn: {
    flexDirection: 'row',
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', marginLeft: 6, fontWeight: '600' },
});
