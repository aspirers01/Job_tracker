import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import LoginWithInput from '../Components/LoginwithInput';
import { useState, useEffect } from 'react';
import Button from '../Components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validateToken from '../Utils/ValidationToken';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('user');
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
        'https://job-trackerbackendapi.onrender.com/api/v1/users/login';
      const { data } = await axios.post(baseURL, {
        email,
        password,
      });

      setLoading(false);
      if (data) {
        await AsyncStorage.setItem('accessToken', data.tokens.accessToken);
        await AsyncStorage.setItem('refreshToken', data.tokens.refreshToken);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        alert('Login Successful');
        props.navigation.replace('Main');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        alert(error.response.data.message || 'Login failed');
      } else if (error.request) {
        alert('Network error, try again');
      } else {
        alert('Unexpected error, try again');
      }
    }
  }

  return (
    <LinearGradient colors={['#109bfe', '#2563EB']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <MaterialIcons name="work" size={64} color="white" />
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Login to continue tracking your job applications
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.form}>
              <LoginWithInput
                iconname="email"
                placeholder="Email"
                setValue={setEmail}
              />
              <LoginWithInput
                iconname="lock"
                placeholder="Password"
                setValue={setPassword}
              />

              <View style={styles.row}>
                <Text style={{ color: '#374151' }}>Keep me logged in</Text>
                <Text
                  style={styles.link}
                  onPress={() =>
                    props.navigation.navigate('ForgotPasswordScreen')
                  }
                >
                  Forgot Password?
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Button loading={loading} onPress={handleLogin} title="Login" />
              </View>
            </View>

            {/* Footer */}
            <Text style={styles.footerText}>
              Don’t have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => props.navigation.replace('RegisterScreen')}
              >
                Register
              </Text>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  form: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: '#f97316',
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    color: 'white',
  },
});
