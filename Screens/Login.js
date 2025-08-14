import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import LoginWithInput from '../Components/LoginwithInput';
import Button from '../Components/Button';

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
          <View style={styles.loginButton}>
            <Button title="Login" />
          </View>
          <View>
            <Text style={styles.logintext}>
              Don't have an account? <Text style={styles.link}>Register</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
const styles = StyleSheet.create({
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
  },
  link: {
    color: '#f4511e',
    alignItems: 'center',
  },
  logintext: {
    textAlign: 'center',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#febe10',
    padding: 10,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
});
