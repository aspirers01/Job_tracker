import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
function TestScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Testing Different Icon Packs</Text>

      <FontAwesome name="star" size={40} color="gold" />
      <FontAwesome5 name="github" size={40} color="black" />
      <MaterialIcons name="settings" size={40} color="blue" />
      <Entypo name="home" size={40} color="green" />
      <Feather name="camera" size={40} color="purple" />
      <Ionicons name="person-circle" size={40} color="red" />
    </ScrollView>
  );
}

export default TestScreen;
