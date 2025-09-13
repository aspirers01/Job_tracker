

import {  StyleSheet } from 'react-native';

import MyStackNavigator from './Navigation/StackNavigator';
import { JobsProvider } from './context/JobContext';
import Test from './Screens/test';

function App() {
 

  return (
   <>
    <JobsProvider>
   <MyStackNavigator />
    </JobsProvider>
   
    
   </>
     
    
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});

export default App;
// 