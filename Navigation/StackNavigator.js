import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import ApplicationsScreen from '../Screens/Applications';
import DashboardScreen from '../Screens/Dashboard';
import SettingsScreen from '../Screens/Settings';
import Ionicons from '@react-native-vector-icons/ionicons';

import AddJobScreen from '../Screens/AddJob';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyStackNavigator = () => {
  function BottomTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTab} />
        <Stack.Screen name="AddJobScreen" component={AddJobScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStackNavigator;
