import React, { Component , useEffect, useState} from 'react'
// import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, TextInput, Button, Alert, 
    TouchableOpacity, Modal, Pressable,FlatList } from 'react-native'
// import SQLite from 'react-native-sqlite-storage'
import { openDatabase } from 'react-native-sqlite-storage';

const db =  openDatabase({ name: 'test0.db', readOnly: false,createFromLocation : 1})

function TestBD (){


    
    // const [ID, setID] = useState('')
    const [Money, setMoney] = useState('')
    const [ID, setID] = useState('')
    const [ListData, setListData] = useState([])
    const [sum, setSum] = useState([])
    // const [Month, setSumM] = useState([])
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
            db.transaction((tx) =>{
                tx.executeSql(
                                "SELECT * FROM GIAODICH",
                                [],
                                (tx, results) =>{
                                    var temp = []
                                    // var sumx = []
                                    var summ = [{"THU": 0, "CHI": 0}]
                                    for (let i = 0; i < results.rows.length; i++){
                                        var a = results.rows.item(i)
                                        temp.push(a)
                                        if ( a.Thu == 1){
                                            summ[0]['THU'] = summ[0]['THU'] + a.Money
                                        }
                                        else summ[0]['CHI'] = summ[0]['CHI'] + a.Money
                                        // sumx.push(summ)
                                        // if (results.rows.item(i).DATE.slice(5,7) == "02")
                                        //     tp[0].SUMMONEY = tp[0].SUMMONEY + results.rows.item(i).Money
                                        // console.log(results.rows.item(i).DATE.slice(5,7))
                                    }
                                    // console.log(temp)
                
                                    // setSumM(tp)
                                    setSum(summ)
                                    setListData(temp)
                                }
                            )
            })
    }
    
    useEffect(() => {
        // console.log(1)
        db.transaction((tx) =>{
                tx.executeSql(
                    "SELECT * FROM GIAODICH",
                    [],
                    (tx, results) =>{
                        var temp = []
                        // var sumx = []
                        var arr = ["01","02","03","04","05","06","07","08","09","10","11","12"]
                        
                        var summ = [{"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0},
                        {"THU": 0, "CHI": 0}]
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            temp.push(a)
                            if ( a.Thu == 1){
                                summ[0]['THU'] = summ[0]['THU'] + a.Money
                                for (let k = 0; k <12; k++){
                                    // console.log(a)
                                    if (a.Date.slice(5,7) == arr[k])
                                        summ[k+1]['THU'] = summ[k+1]['THU'] + a.Money
                                }
                            }
                            else {
                                summ[0]['CHI'] = summ[0]['CHI'] + a.Money
                                for (let k = 0; k <12; k++){
                                    // console.log(a)
                                    if (a.Date.slice(5,7) == arr[k])
                                        summ[k+1]['CHI'] = summ[k+1]['CHI'] + a.Money
                                }
                            }
                            // sumx.push(summ)
                            // if (results.rows.item(i).DATE.slice(5,7) == "02")
                            //     tp[0].SUMMONEY = tp[0].SUMMONEY + results.rows.item(i).Money
                            // console.log(results.rows.item(i).DATE.slice(5,7))
                        }
                        // console.log(temp)
    
                        // setSumM(tp)
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
            <Text>Thu: {item.Thu}</Text>
            <Text>Ngày: {item.Date}</Text>
            <Text>Ghi chú: {item.GhiChu}</Text>
          </View>
        );
      };
    let ShowSum = (item) => {
        console.log(item)
        if (item != null)
            return (
                <View 
                //   key={item.user_id}
                style={{backgroundColor: 'white', padding: 20}}>
                {/* <Text>Id: {item.CHI + item.THU}</Text> */}
                </View>
            );
            };
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    {console.log(123)}
                    <FlatList
                        data={ListData}
                        // ItemSeparatorComponent={listViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>listItemView(item)}
                />
        </View>
        
      </View>
      <View>
        <Text>{ShowSum(sum)}</Text>
    </View>
    </SafeAreaView>
        // <View>
        //     <Text>assssd</Text>
        // </View>
    )
}
export default TestBD;