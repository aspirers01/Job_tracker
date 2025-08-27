import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';

function SettingsScreen(props) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          const user = JSON.parse(userData);
          setName(user.name); // 👈 store user name
        }
      } catch (err) {
        console.log('Error loading user:', err);
      }
    };

    loadUser();
  }, []);

  async function logout() {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('user');
      props.navigation.replace('LoginScreen');
    } catch (err) {
      console.log('Error logging out:', err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Settings
      </Text>
      <View style={styles.loginButton}>
        <Button
          title="Logout"
          loading={loading}
          onPress={() => {
            logout();
          }}
        />
      </View>
    </View>
  );
}

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
