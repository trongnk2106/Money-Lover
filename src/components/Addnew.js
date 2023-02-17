import React, { Component , useEffect, useState} from 'react'
// import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, TextInput, Button, Alert, 
    TouchableOpacity, Modal, Pressable} from 'react-native'
// import CalendarPicker from 'react-native-calendar-picker';
// import celender from './calender_test';
// import Mycaledar from './calender_test';
import { Mycaledar, date } from './calender_test';
import { Calendar } from 'react-native-calendars';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { openDatabase } from 'react-native-sqlite-storage';
const db =  openDatabase({ name: 'test.db',createFromLocation : 1})


function Addneww() {
    const [ID, setID] = useState('0')
    const [sotien, setmoney] = useState(0)
    const [nhom, setnhom] = useState('')
    const [ghichu, setghichu] = useState('')
    const [ngay, setngay] = useState('')
    // const [date, setdate] = useState('')

    const [date, setdate] = useState('')
    const [date_show, setDataShow] = useState(1)
    const [ThuChi, setThuChi] = useState('THU')
    

    const Mycaledar = (res) => {
        if (res == 0)
            return (
      
          <View>
              
              <Calendar 
              
              
                  onDayPress={(day) => {
                  
                      setdate(day.dateString)
                      console.log(date)
                  }}
                  onDayLongPress={(day) => console.log('onDayLongPress', day) }
                  onMonthChange={(date) => console.log('onMonthChange', date) }
                  onPressArrowLeft={(goToPreviousMonth) => {
                  console.log('onPressArrowLeft'); goToPreviousMonth();
                  }}
                  onPressArrowRight={(goToNextMonth) => {
                  console.log('onPressArrowRight'); goToNextMonth();
                  }}
                  markedDates={{
                      [date] : {selected: true, marked: true, selectedColor: '#466A8F'}
                  }}
              />
       
          </View>
        );
           
      };
    useEffect(() => {
        var newID = 0
        db.transaction((tx) =>{
            tx.executeSql(
                "SELECT * FROM GIAODICH",
                [],
                (tx, results) =>{
                    newID = results.rows.length
                    setID(newID)
                }
            )
        })
      }, []);
    // useEffect(() => {
    //     setID(123)
    //     console.log(123)
    //   }, []);  
    const setData = async () =>{
        if (date.length == 0 || sotien.length == 0){
            Alert.alert('Vui lòng điền đầy đủ thông tin trước khi thêm giao dịch!!!')
        }
        else {
            // getID()
            var newID = ID + 1
            setID(newID)
            var thu = 1
            if (ThuChi == "CHI"){
                thu = 0
                var newMoney = - sotien
                setmoney(newMoney)
            }
            await db.transaction(async (tx)=> {
                await tx.executeSql(
                "INSERT INTO GIAODICH (ID, Money, Thu, Date) VALUES(?,?,?,?)",
                [newID,newMoney,thu,date]
                )
                console.log(newID,newMoney,thu,date)
            })
            Alert.alert('Giao dịch đã được thêm')
        }
    }
    return(
        <View> 
            <View style = {{flexDirection :'row', justifyContent:'space-between', margin:15}}>
                <Button
                    title="Hủy"
                    style = {{fontSize:20, fontWeight:'bold'}}
                    // style={styles.button}
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />
                <Text style = {{fontSize:20, fontWeight:'bold'}}> Thêm giao dịch</Text>
                <Text style = {{fontSize:20, fontWeight:'bold'}}> {ID}</Text>
                <Button
                    title="Lưu"
                    style = {{fontSize:20, fontWeight:'bold'}}
                    // style={styles.button}
                    onPress={() => {
                        setData()
                        // Alert.alert('Button with adjusted color pressed')
                        }
                    }
                />
            </View>
            <View  style={{
                    borderBottomColor: '#575353',
                    borderBottomWidth: StyleSheet.hairlineWidth
                    }}/>
            <ScrollView>
                <View style={{paddingLeft:50}}>
                    <TextInput
                    keyboardType='numeric'
                        style={{borderColor:"gray", width:"100%", borderBottomWidth:1, padding:10}}
                        placeholder="0"
                        onChangeText={(newMoney) =>  setmoney(newMoney)}
                        defaultValue={sotien}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=> {
                        if (ThuChi == "CHI"){
                            setThuChi("THU")
                        }    
                        else setThuChi("CHI")
                    }}>
                        <Text>{ThuChi}</Text>
                    </TouchableOpacity>
                    {/* <TextInput
                        style={{borderColor:"gray", width:"100%", borderBottomWidth:1, padding:10}}
                        placeholder="Chon nhom"
                        onChangeText={newNhom => setnhom(newNhom)}
                        defaultValue={nhom}
                    /> */}
                    <TextInput
                        style={{borderColor:"gray", width:"100%", borderBottomWidth:1, padding:10}}
                        placeholder="Them ghi chu"
                        onChangeText={newghichu => setghichu(newghichu)}
                        defaultValue={ghichu}
                    />
                    <Text style = {{fontSize:20, fontWeight:'bold'}}> {date}</Text>
                    <View style={styles.container}>
                    <View style={styles.countContainer}>
                        <Text>{Mycaledar(date_show)}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={()=> {
                        if (date_show == 1){
                            setDataShow(0)
                            
                        }    
                        else setDataShow(1)
                    }}>
                        <Text>Chọn ngày</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                
            
            </ScrollView>
            
           
            
            
        </View>
    )


}


const styles = StyleSheet.create({

    body:{
        width: windowWidth,
        height: windowHeight,
        backgroundColor:'blue'
    },

    container: {
        flex: 1,
        justifyContent: 'center'
      },

})

export default Addneww;