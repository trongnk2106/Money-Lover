import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from './src/Screen/Home/Home'
import TransactionWallet from './src/Screen/Home/TransactionWallet';
// import AddNewStatus from './src/Screen/Create/AddNewStatus'
import AddNewStatus from './src/Screen/Create/NoteStatus'
// function HomeScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home nguyen thanh trong!</Text>
//       </View>
//     );
//   }
  
//   function SettingsScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     );
//   }
  
//   function Add() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Add!</Text>
//       </View>
//     );
//   }

  function Lapkehoach() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Lap ke hoach!</Text>
        <Ionicons name = 'home-outline' size = {50}/>
      </View>
    );
  }




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
            {/* <Tab.Screen name= "Lap ke hoach" component={Lapkehoach} options={{headerShown:false}} /> */}
          </Tab.Navigator>
        </NavigationContainer>
      );
  }

  