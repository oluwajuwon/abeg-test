/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TaskComponent from '../components/TaskComponent';
import AddTaskModal from '../components/AddTaskModal';
import HomePurple from '../assets/images/home-purple.svg'
import HomeGrey from '../assets/images/home-grey.svg'
import SettingsPurple from '../assets/images/settings-purple.svg'
import SettingsGrey from '../assets/images/settings-grey.svg'

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const iconProps = {
    height: 20,
    width: 20,
  }
  return (
      <Tab.Navigator
      tabBarOptions={{ style: { borderTopWidth: 0 }}}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconName;

          if (route.name === 'Home') {
            IconName = focused
              ? <HomePurple {...iconProps} />
              : <HomeGrey {...iconProps} />;
          } else if (route.name === 'Settings') {
            IconName = focused 
            ? <SettingsPurple {...iconProps} /> 
            : <SettingsGrey {...iconProps} />;
          }
          return IconName
        },
        tabBarLabel: '',
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen 
          name="Task" 
          component={TaskComponent}
          options={{
            tabBarButton: () => <AddTaskModal />
          }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
});

export default Navigation;
