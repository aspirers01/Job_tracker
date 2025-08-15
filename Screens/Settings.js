import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

import Button from '../Components/Button';

function SettingsScreen(props) {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Settings
      </Text>
      <View style={styles.loginButton}>
        <Button
          title="Logout"
          loading={loading}
          onPress={() => {
            setLoading(!loading);
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
