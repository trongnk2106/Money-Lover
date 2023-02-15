import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeScreen(){
    return(
        <View>
            <Text> Home Screen </Text>
        </View>
    )
}

export default HomeScreen;