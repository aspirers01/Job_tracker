import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  View,
  Button,
} from 'react-native';
import LoginWithInput from '../Components/LoginwithInput';

function LoginScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View>
          <Text style={styles.headingtext}>Job Tracker</Text>
        </View>
        <View style={styles.motto}>
          <Text style={styles.subheadingtext}>
            Manage your job applications
          </Text>
          <Text style={styles.subheadingtext}>effortlessly</Text>
        </View>
        <View style={styles.maincontainer}>
          <LoginWithInput
            iconname="email"
            placeholder="Username"
            // setValue={setEmail}
          />
          <LoginWithInput
            iconname="lock"
            placeholder="Password"
            // setValue={setPassword}
          />
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: '#007fff' }}>Forget Password</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headingtext: {
    fontSize: 30,
    fontWeight: 400,
    fontFamily: 'Lavishly Yours',
    marginTop: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  motto: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 10,
  },
  subheadingtext: {
    fontSize: 20,
    fontWeight: 400,
    fontFamily: 'Lavishly Yours',
    color: 'black',
    marginBottom: 20,
  },
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
