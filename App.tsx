

import {  StyleSheet } from 'react-native';

import MyStackNavigator from './Navigation/StackNavigator';
import { JobsProvider } from './context/JobContext';

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