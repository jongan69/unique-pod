import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';

import HomeScreen from '../HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import PaymentScreen from '../PaymentScreen';
import MintScreen from '../MintScreen';
import FeaturedScreen from '../FeaturedScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeStack = () => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Featured"
        component={FeaturedScreen}
        options={({route}) => ({
          title: 'Featured Podcasts',
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: colors.border},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: colors.primary,
      }}>
      <Tab.Screen
        name="Available"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: colors.border,
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Mint"
        component={MintScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarBadge: 0,
          tabBarBadgeStyle: {backgroundColor: colors.notification},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="wallet" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route: Partial<Route<string, object | undefined>>) => {
  console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  console.log(routeName);

  if( routeName == 'Featured' ) {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
