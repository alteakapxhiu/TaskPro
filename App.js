import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './Components/task';
import { NavigationContainer,DefaultTheme, DarkTheme, } from '@react-navigation/native';
import {Provider as PaperProvider,DarkTheme as PaperDarkTheme} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Portfolio, Profile, Settings, EditProfile } from './screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider, useTheme } from './Components/ThemeProvider'
import {useColorScheme} from 'react-native';
import { darkColors,lightTheme } from './Components/theme';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './assets/i18n/i18n.config.js';

enableScreens();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 90,
    backgroundColor: '#fff',
  },
};

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Kryesore"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name="home" size={24} color={focused ? "#71E3DD" : "#111"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Portofoli"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="bookmarks" size={24} color={focused ? "#71E3DD" : "#111"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Ndrysho"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="settings-outline" size={24} color={focused ? "#71E3DD" : "#111"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profili"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="person-circle-outline" size={24} color={focused ? "#71E3DD" : "#111"} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const scheme = useColorScheme();
    const MyTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
const {t}=useTranslation();
  return (
    <ThemeProvider theme={scheme === 'dark' ? darkColors : lightTheme}>
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer></ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FCFB',
  },
  tasksWrapper: {
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    borderColor: '#71E3DD',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#71E3DD',
    borderWidth: 1,
  },
  addText: {},
});
