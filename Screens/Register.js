import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoginWithInput from '../Components/LoginwithInput';
import Button from '../Components/Button';
import { useState } from 'react';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        'https://job-trackerbackendapi.onrender.com/api/v1/users/register';
      const { data } = await axios.post(baseURL, {
        name,
        email,
        password,
      });
      setLoading(false);
      if (data) {
        alert('Registration Successful');
        props.navigation.replace('LoginScreen');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('Registration Failed');
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
            {/* Header / Logo */}
            <View style={styles.header}>
              <MaterialIcons name="work" size={64} color="white" />
              <Text style={styles.title}>Join Job Tracker</Text>
              <Text style={styles.subtitle}>
                Create an account and manage your job applications easily
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.form}>
              <LoginWithInput
                iconname="person"
                placeholder="Name"
                setValue={setName}
              />
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
              <LoginWithInput
                iconname="lock"
                placeholder="Confirm Password"
                setValue={setConfirmPassword}
              />

              <View style={{ marginTop: 20 }}>
                <Button
                  title="Register"
                  onPress={handleRegister}
                  loading={loading}
                />
              </View>
            </View>

            {/* Footer */}
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => props.navigation.replace('LoginScreen')}
              >
                Login
              </Text>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default RegisterScreen;

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
  footerText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    color: 'white',
  },
  link: {
    color: '#FFD700', // golden accent
    fontWeight: '600',
  },
});
