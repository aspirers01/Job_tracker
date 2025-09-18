import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import ApplicationsScreen from '../Screens/Applications';
import DashboardScreen from '../Screens/Dashboard';
import SettingsScreen from '../Screens/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddJobScreen from '../Screens/AddJob';
import JobinfoScreen from '../Screens/JobInfoScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';
import ForgotPasswordScreen from '../Screens/ForgetPasswordScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const linking = {
  prefixes: ['jobtracker://'],
  config: {
    screens: {
      ForgotPasswordScreen: 'forgot-password',
      ResetPasswordScreen: 'reset-password/:token',
    },
  },
};

const MyStackNavigator = () => {
  function BottomTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="ApplicationsScreen"
          component={ApplicationsScreen}
          options={{
            tabBarLabel: 'Applications',

            tabBarStyle: { backgroundColor: 'white' },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="file-tray-full-outline"
                  size={24}
                  color="black"
                />
              ) : (
                <Ionicons
                  name="file-tray-full-outline"
                  size={24}
                  color="gray"
                />
              ),
          }}
        />
        <Tab.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarStyle: { backgroundColor: 'white' },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="grid-outline" size={24} color="black" />
              ) : (
                <Ionicons name="grid-outline" size={24} color="gray" />
              ),
          }}
        />
        <Tab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Applications',
            tabBarStyle: { backgroundColor: 'white' },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="settings-outline" size={24} color="black" />
              ) : (
                <Ionicons name="settings-outline" size={24} color="gray" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTab} />
        <Stack.Screen
          name="AddJobScreen"
          component={AddJobScreen}
          options={{
            headerBackVisible: true,
            headerShown: true,
            title: 'Add New Job',
          }}
        />
        <Stack.Screen
          name="JobInfoScreen"
          component={JobinfoScreen}
          options={{
            headerBackVisible: true,
            headerShown: true,
            title: '',
          }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{
            headerBackVisible: true,
            headerShown: true,
            title: '',
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            headerBackVisible: true,
            headerShown: true,
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStackNavigator;
