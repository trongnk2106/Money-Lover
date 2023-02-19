import React, { Component , useState, useEffect} from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Button, Alert, SectionList, FlatList,
    TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native'

import AntDesign from "react-native-vector-icons/AntDesign";
// import SelectRow from '../../components/SelectRow';
import SelectRow from './components/SelectRow';
import { openDatabase } from 'react-native-sqlite-storage';
// import CategoryRow from '../../test_flatlist';
import CategoryRow from './test_flatlist';
import { Agenda, Calendar } from 'react-native-calendars';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})
import DisplayRow from './components/DisplayRow';

function AddNewStatus() {
    const [ID, setID] = useState(0)
    const [Money, setmoney] = useState(0)
    const [Category, setCategory] = useState('')
    const [ThuChi, setThuChi] = useState('THU')

    const [modalVisible, setModalVisible] = useState(false)
    const [actionTriggered, setActionTriggered] = useState('');
    
    const [ListData, setListData] = useState([])
    
    const getData = async()=>{
        let dd = new Date().getDate()
        if (dd < 10)
          dd = '0' + dd
        var mm = new Date().getMonth() + 1
        if (mm < 10)
          mm = '0' + mm
        var yyyy = new Date().getFullYear()
        var date = yyyy + '-' + mm + '-' + dd
        await db.transaction(async (tx) =>{
          await tx.executeSql(
            "SELECT * FROM GIAODICH ORDER BY GIAODICH.Date",
            [],
            (tx, results) =>{
              var tm = []
              for (let i = 0; i < results.rows.length; i++){
                var a = results.rows.item(i)
                if (a.Date.slice(0,7) == date.slice(0,7)){
                    tm.push(a)
                }
              }
              setListData(tm)
            }
          )
        }) 
      }
      useEffect(()=>{
        getData()
      }, [])
    const ShowGD = (ListData) =>{

        if (ListData != null){
            var data = []
            var k = 0
            for (let  i = ListData.length - 1; i >= 0; i-- ){
                var x = {"Date": ListData[i].Date, "Money": ListData[i].Money, "Category": ListData[i].Category}
                data.push(x)
                k = k + 1 
                if ( k == 3)
                  break
            }
            return(
                <View>
                <DisplayRow data = {data[0]} />
                <DisplayRow data = {data[1]}/>
                <DisplayRow data = {data[2]}/>
            </View>
            )
        }
        
    }
        // getData()
        let listItemView = (item) => {
            return (
              <View 
                key={item.user_id}
                style={{backgroundColor: 'white', padding: 20}}>
                <DisplayRow data = {item} />
              </View>
            );
          };
    const show =()=>{
        return(
            <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <FlatList
                        data={ListData}
                        // ItemSeparatorComponent={listViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>listItemView(item)}
                />
        </View>
        
      </View>
    </SafeAreaView>
        )
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.inputs}>
                    
                    <TouchableOpacity
                        style={styles.selectBtn}
                        onPress={() => {
                            setModalVisible(true);
                            setActionTriggered('ShowAll');}}
                    >

                        <Text style={styles.selectTxt}>
                            View all
                        </Text>
                        {/* <AntDesign
                            name="down"
                            size={24}
                            color="black"
                        /> */}
                    </TouchableOpacity>
                    
                    <Modal
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}
                        transparent={true}
                    >
                        {actionTriggered === 'ShowAll' ?

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <Text style={styles.selectHeading}>
                                BÁO CÁO GIAO DỊCH THÁNG
                            </Text>
                            <View style={styles.divider}></View>

                            <View style={{height: 400}}>

                                    {show()}
                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        
                                    }}>
                                    <Text style={{fontFamily:"PoppinsMedium", fontSize:14}}>Done</Text>
                                    </TouchableOpacity>
                                    

                                
                            </View>



                            </View> 
                        </View> : null}
                    </Modal>

                    

                </View>


            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "#fff",
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: Dimensions.get("screen").width - 10,
      marginTop: 10,
    },
    button: {
      backgroundColor: "#12B886",
      padding: 10,
      width: 100,
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 6,
    },
    btnTxt: {
      color: "#fff",
      fontFamily: "PoppinsBold",
    },
    inputs: {
      margin: 10,
    },
    selectBtn: {
      width: Dimensions.get("screen").width - 30,
      borderWidth: 0.5,
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },
    selectTxt: {
      fontFamily: "PoppinsBold",
      fontSize: 14,
    },
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      alignContent: "center",
      backgroundColor: "rgba(0,0,0, 0.3)",
    },
    modalView: {
      backgroundColor: "#fff",
      width: Dimensions.get("screen").width,
      padding: 20,
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    },
    selectHeading: {
      textAlign: "center",
      fontFamily: "PoppinsBold",
      fontSize: 16,
      fontWeight: 'bold'
    },
    divider: {
      height: 1,
      width: Dimensions.get("screen").width - 30,
      backgroundColor: "rgba(0,0,0, 0.3)",
      marginVertical: 10,
    },
    inputText: {
        width: Dimensions.get("screen").width - 30,
        borderWidth: 0.5,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        marginVertical: 10
      },
    doneBtn: {
        backgroundColor: "#466A8F",
        padding: 10,
        width: 100,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 6,
        marginHorizontal: 30
      },
    selectedItem: {
        width: 100,
        height: 24,
        borderRadius: 12,
        marginHorizontal: 8,
        backgroundColor: '#466A8F',
        alignItems: 'center',
    },
    sectionBar: {
        marginTop: 13,
        backgroundColor: '#D0CFCF',
        height: 30,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        paddingLeft: 10
    }
  });  


export default AddNewStatus;