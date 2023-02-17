import React, { Component , useEffect, useState} from 'react'
// import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, TextInput, Button, Alert, 
    TouchableOpacity, Modal, Pressable,FlatList } from 'react-native'
// import SQLite from 'react-native-sqlite-storage'
import { openDatabase } from 'react-native-sqlite-storage';

const db =  openDatabase({ name: 'test.db', readOnly: false,createFromLocation : 1})

function TestBD(){


    
    // const [ID, setID] = useState('')
    const [Money, setMoney] = useState('')
    const [ID, setID] = useState('')
    const [ListData, setListData] = useState([])
    const [sum, setSum] = useState(0)
    const [sumM, setSumM] = useState([])
    const setData = async () =>{
        console.log(123)
        await db.transaction(async (tx)=> {
            await tx.executeSql(
              "INSERT INTO GIAODICH (ID, Money, Thu, Date) VALUES(?,?,?,?)",
              [1,3,1,'123']
            )
         })
    }

    const getData = () =>{
        try {
            db.transaction((tx) =>{
                tx.executeSql(
                    "SELECT * FROM GIAODICH",
                    [],
                    (tx, results) =>{
                        var temp = []
                        console.log(123) 
                        for (let i = 0; i < 15; i++)
                            temp.push(results.rows.item(i))
                        // console.log(temp)
                        setListData(temp)
                        
                    }
                )
            })
        }catch (error){
            console.log(error)
        }
    }
    useEffect(() => {
        db.transaction((tx) =>{
            tx.executeSql(
                "SELECT * FROM GIAODICH",
                [],
                (tx, results) =>{
                    var temp = []
                    var summ = 0
                    var tp = [{"MONTH": 2, "SUMMONEY": 0}]
                    for (let i = 0; i < results.rows.length; i++){
                        temp.push(results.rows.item(i))
                        summ = summ + results.rows.item(i).Money
                        // if (results.rows.item(i).DATE.slice(5,7) == "02")
                        //     tp[0].SUMMONEY = tp[0].SUMMONEY + 600
                        // console.log(results.rows.item(i).DATE.slice(5,7))
                    }
                    console.log(temp)
                    console.log(summ)
                    console.log(tp)
                    setSumM(tp)
                    setSum(summ)
                    setListData(temp)
                    
                }
            )
        })
      }, []); 
    const getID = () =>{
            db.transaction((tx) =>{
                tx.executeSql(
                    "SELECT * FROM GIAODICH",
                    [],
                    (tx, results) =>{
                        var len = results.rows.length;
                        setID(len + 1)
                    }
                )
            })
    }
    // getData()
    let listItemView = (item) => {
        return (
          <View 
            key={item.user_id}
            style={{backgroundColor: 'white', padding: 20}}>
            <Text>Id: {item.ID}</Text>
            <Text>Money: {item.Money}</Text>
            <Text>Thu: {item.THU}</Text>
            <Text>Ngày: {item.DATE}</Text>
          </View>
        );
      }; 
    return(
        
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <FlatList
                        data={ListData}
                        // ItemSeparatorComponent={listViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => listItemView(item)}
                />
        </View>
        
      </View>
      <View>
        <Text>{sum}</Text>
        {/* <Text>123</Text> */}
    </View>
    </SafeAreaView>
        // <View>
        //     <Text>assssd</Text>
        // </View>
    )
}
export default TestBD;