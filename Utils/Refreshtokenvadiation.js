import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseURL =
  Platform.OS === 'android'
    ? 'https://job-trackerbackendapi.onrender.com/api/v1'
    : 'https://job-trackerbackendapi.onrender.com/api/v1';
async function refreshAccessToken() {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (!refreshToken) {
    return null;
  }
  const res = await axios.post(`${baseURL}/users/refresh`, {
    refreshToken,
  });
  if (res.status === 200) {
    await AsyncStorage.setItem('accessToken', res.data.accessToken);
    return res.data.accessToken;
  }
  return null;
}

export default refreshAccessToken;
