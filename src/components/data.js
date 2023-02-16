import React, { Component , useEffect, useState} from 'react'
// import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, TextInput, Button, Alert, 
    TouchableOpacity, Modal, Pressable} from 'react-native'
// import SQLite from 'react-native-sqlite-storage'
import { openDatabase } from 'react-native-sqlite-storage';
// import SQLite from 'react-native-sqlite-storage'
// SQLite.enablePromise(true);

// const db = SQLite.openDatabase(
//     {
//     name: 'data.db',
//     createFromLocation: '/data',
//     },
//     ()=>{},
//     error => {console.log('ERROR')}
// );

function TestBD(){


    const db =  openDatabase({ name: 'data.db', createFromLocation : 1})
    // const [ID, setID] = useState('')
    // const [Money, setMoney] = useState('')
    // const [ID, setID] = useState('')

    // useEffect(()=>{
    //     getData()r
    // }, [])
    
    // const setData = async () => {

    // }
    return(
        <View>
            <Text>Test db ajoshdfjhasdfhkaj hkjashdfk h</Text>
        </View>
    )
}
export default TestBD;