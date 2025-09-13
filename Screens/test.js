// App.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const applications = [
  {
    id: '1',
    company: 'Google',
    position: 'Senior Frontend Developer',
    status: 'Interview',
    statusColor: '#22c55e', // green
    applied: 'Applied 2 days ago',
  },
  {
    id: '2',
    company: 'Meta',
    position: 'Full Stack Engineer',
    status: 'Applied',
    statusColor: '#3b82f6', // blue
    applied: 'Applied 1 week ago',
  },
];

export default function Test() {
  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.company[0]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.position}>{item.position}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.applied}>{item.applied}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: item.statusColor }]}>
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.appTitle}>Job Tracker</Text>
            <Text style={styles.subtitle}>8 Applications</Text>
          </View>
          <View style={styles.profileCircle} />
        </View>

        {/* Search */}
        <TextInput
          placeholder="Search applications..."
          placeholderTextColor="#999"
          style={styles.searchBar}
        />
      </LinearGradient>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
          <Text style={styles.statNumber}>3</Text>
          <Text>Applied</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#dcfce7' }]}>
          <Text style={styles.statNumber}>2</Text>
          <Text>Interviews</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#fef9c3' }]}>
          <Text style={styles.statNumber}>1</Text>
          <Text>Offers</Text>
        </View>
      </View>

      {/* Recent Applications */}
      <Text style={styles.sectionTitle}>Recent Applications</Text>
      <Text style={styles.sectionSubtitle}>
        Track your job application progress
      </Text>

      <FlatList
        data={applications}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="document-text-outline" size={22} color="#2563eb" />
          <Text style={[styles.navText, { color: '#2563eb' }]}>
            Applications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar-outline" size={22} color="#666" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="stats-chart-outline" size={22} color="#666" />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person-outline" size={22} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#e5e7eb', marginTop: 4 },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statCard: {
    width: 100,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  position: { fontSize: 15, fontWeight: '600' },
  company: { fontSize: 13, color: '#6b7280' },
  applied: { fontSize: 12, color: '#9ca3af', marginTop: 4 },
  badge: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#7c3aed',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
});
