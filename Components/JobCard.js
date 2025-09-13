import { View, StyleSheet } from 'react-native';

export default function JobCard({ job, getTagColor }) {
  return (
    <View>
      <Text>
        {job.position} at {job.company}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
