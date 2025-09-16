import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import LoginWithInput from '../Components/LoginwithInput';
import { use, useState } from 'react';
import Button from '../Components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import validateToken from '../Utils/ValidationToken';
function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        const isvalid = await validateToken();
        if (isvalid) {
          props.navigation.replace('Main');
        } else {
          const newtoken = await refreshAccessToken();
          if (newtoken) {
            props.navigation.replace('Main');
          } else {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('user');
          }
        }
      }
    };
    checkLogin();
  }, []);
  async function handleLogin() {
    try {
      setLoading(true);
      if (!email || !password) {
        alert('Please fill all the fields');
        setLoading(false);
        return;
      }
      const baseURL =
        Platform.OS === 'android'
          ? 'https://job-trackerbackendapi.onrender.com/api/v1/users/login'
          : 'https://job-trackerbackendapi.onrender.com/api/v1/users/login';
      const { data } = await axios.post(baseURL, {
        email: email,
        password: password,
      });

      setLoading(false);
      console.log('data is this ', data);
      if (data) {
        await AsyncStorage.setItem('accessToken', data.tokens.accessToken);
        await AsyncStorage.setItem('refreshToken', data.tokens.refreshToken);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        alert('Login Successful');
        props.navigation.replace('Main');
      }

      return;
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log('Backend responded with error:', error.response.data);
        alert(error.response.data.message || 'Login failed');
      } else if (error.request) {
        console.log('No response received:', error.request);
        alert('Network error, try again');
      } else {
        console.log('Axios error:', error.message);
        alert('Unexpected error, try again');
      }
    }
  }
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
            iconname="mail-outline"
            placeholder="Username"
            setValue={setEmail}
          />
          <LoginWithInput
            iconname="lock-closed-outline"
            placeholder="Password"
            setValue={setPassword}
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
            <Button loading={loading} onPress={handleLogin} title="Login" />
          </View>
          <View>
            <Text style={styles.logintext}>
              Don't have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => props.navigation.replace('RegisterScreen')}
              >
                Register
              </Text>
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
