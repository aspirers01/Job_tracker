

import { StatusBar, StyleSheet, useColorScheme, View,Text } from 'react-native';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import TestScreen from './Screens/test';
import DashboardScreen from './Screens/Dashboard';

function App() {
 

  return (
   <>
    <DashboardScreen />
   </>
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});

export default App;
