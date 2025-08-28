import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LoginWithInput from '../Components/LoginwithInput';
import Button from '../Components/Button';
import { useState } from 'react';
import axios from 'axios';

function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    try {
      setLoading(true);
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill all the fields');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        setLoading(false);
        return;
      }
      const baseURL =
        Platform.OS === 'android'
          ? 'https://job-trackerbackendapi.onrender.com/api/v1/users/register'
          : 'https://job-trackerbackendapi.onrender.com/api/v1/users/register';
      const { data } = await axios.post(baseURL, {
        name: name,
        email: email,
        password: password,
      });
      console.log(data);
      setLoading(false);
      if (data) {
        alert('Registration Successful');
        props.navigation.replace('LoginScreen');
      }

      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('Registration Failed');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            <Text style={styles.headingtext}>Job Tracker</Text>
          </View>
          <View style={styles.motto}>
            <Text style={styles.subheadingtext}>
              Manage your job applications
            </Text>
            <Text style={styles.subheadingtext}>effortlessly</Text>
          </View>
          <View>
            <LoginWithInput
              iconname="person-outline"
              placeholder="Name"
              setValue={setName}
            />
            <LoginWithInput
              iconname="mail-outline"
              placeholder="UserEmail"
              setValue={setEmail}
            />
            <LoginWithInput
              iconname="lock-closed-outline"
              placeholder="Password"
              setValue={setPassword}
            />
            <LoginWithInput
              iconname="lock-closed-outline"
              placeholder="Confirm Password"
              setValue={setConfirmPassword}
            />
            <View style={styles.registerButton}>
              <Button
                title="Register"
                onPress={handleRegister}
                loading={loading}
              />
            </View>
          </View>
          <View>
            <Text style={styles.registertext}>
              Don't have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => props.navigation.replace('LoginScreen')}
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headingtext: {
    textAlign: 'center',
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
  LogoTextView: {
    alignItems: 'center',
  },
  LogoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#041E42',
    marginTop: 10,
  },
  registertext: {
    textAlign: 'center',
    marginVertical: 20,
  },
  link: {
    color: '#f4511e',
  },
  registerButton: {
    backgroundColor: '#109bfeff',
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
