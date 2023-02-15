// import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen'


const Stack = createNativeStackNavigator();

function App () {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name = "Home"
                component={HomeScreen}
                />
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({

})

export default App;

