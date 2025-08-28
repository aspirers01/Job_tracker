import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseURL =
  Platform.OS === 'android'
    ? 'https://job-trackerbackendapi.onrender.com/api/v1'
    : 'https://job-trackerbackendapi.onrender.com/api/v1';
async function validateToken() {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    return false;
  } else {
    const res = await axios.get(`${baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      return false;
    }
  }

  return true;
}

export default validateToken;
