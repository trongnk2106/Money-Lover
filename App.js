import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from './src/Screen/Home/Home'
import TransactionWallet from './src/Screen/Home/TransactionWallet';

import AddNewStatus from './src/Screen/Create/NoteStatus'
import ReminderApp from './src/Screen/Home/Remid'; 

  const Tab = createBottomTabNavigator();
  
  export default function App() {
    return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Wallet') {
                  iconName = focused ? 'wallet' : 'wallet-outline';
                } else if (route.name === 'Add') {
                  iconName = focused ? 'add-circle' : 'add-circle-outline'
                } else if (route.name === 'Schedule') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline'
                  }
               
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={Home} options={{headerShown:false, unmountOnBlur: true}} />
            <Tab.Screen name="Wallet" component={TransactionWallet} options={{headerShown:false, unmountOnBlur: true}} />
            <Tab.Screen name= "Add" component={AddNewStatus} options={{headerShown:false, unmountOnBlur: true}} />
            <Tab.Screen name= "Schedule" component={ReminderApp} options={{headerShown:false, unmountOnBlur: true}} />
          </Tab.Navigator>
        </NavigationContainer>
      );
  }

  