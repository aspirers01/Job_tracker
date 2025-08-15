

import { StatusBar, StyleSheet, useColorScheme, View,Text } from 'react-native';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import TestScreen from './Screens/test';
import DashboardScreen from './Screens/Dashboard';
import SettingsScreen from './Screens/Settings';
import ApplicationsScreen from './Screens/Applications';

function App() {
 

  return (
   <>
    <ApplicationsScreen />
   </>
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});

export default App;
