import React, { Component , useState} from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Button, Alert,
    TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native'

import { Agenda, Calendar } from 'react-native-calendars';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInput } from "@react-native-material/core";
import SelectRow from '../../components/SelectRow';

// const Mycaledar = () => {
//     const [date, setdate] = useState('')
//     // console.log(date)
//     return (
//       <View>
          
//           <Calendar 
          
          
//               onDayPress={(day) => {
              
//                   setdate(day.dateString)
                  
//               }}
//               onDayLongPress={(day) => console.log('onDayLongPress', day) }
//               onMonthChange={(date) => console.log('onMonthChange', date) }
//               onPressArrowLeft={(goToPreviousMonth) => {
//               console.log('onPressArrowLeft'); goToPreviousMonth();
//               }}
//               onPressArrowRight={(goToNextMonth) => {
//               console.log('onPressArrowRight'); goToNextMonth();
//               }}
//               markedDates={{
//                   [date] : {selected: true, marked: true, selectedColor: '#466A8F'}
//               }}
//           />
   
//       </View>
  
//     );
       
// };
  


function AddNewStatus() {

    const [money, setmoney] = useState('')
    const [category, setCategory] = useState('')
    const [ghichu, setghichu] = useState('')
    const [ngay, setngay] = useState('')
    // const [date, setdate] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [actionTriggered, setActionTriggered] = useState('');
    const [date, setdate] = useState('')
    
    // console.log(!!false)

    return(
        // <View> 
        //     <View style = {{flexDirection :'row', justifyContent:'space-between', margin:15}}>
        //         <Text style = {{fontSize:20, fontWeight:'bold'}}> Huy</Text>
        //         <Text style = {{fontSize:20, fontWeight:'bold'}}> Them giao dich</Text>
        //         <Text style = {{fontSize:20, fontWeight:'bold'}}> Luu </Text>
        //     </View>

        //     <View  style={{
        //             borderBottomColor: '#575353',
        //             borderBottomWidth: StyleSheet.hairlineWidth
        //             }}/>
        //     <ScrollView>
        //         <View style={{paddingLeft:50}}>
        //             <TextInput
        //             keyboardType='numeric'
        //                 style={{borderColor:"gray", width:"100%", borderBottomWidth:1, padding:10}}
        //                 placeholder="0"
        //                 onChangeText={newMoney => setmoney(newMoney)}
        //                 defaultValue={sotien}
        //             />
        //             <TextInput
        //                 style={{borderColor:"gray", width:"100%", borderBottomWidth:1, padding:10}}
        //                 placeholder="Chon nhom"
        //                 onChangeText={newNhom => setnhom(newNhom)}
        //                 defaultValue={nhom}
        //             />
        //             <TextInput
        //                 style={{borderColor:"gray", width:"100%", borderBottomWidth:1, padding:10}}
        //                 placeholder="Them ghi chu"
        //                 onChangeText={newghichu => setghichu(newghichu)}
        //                 defaultValue={ghichu}
        //             />

                    
        //             <View>
        //                 <Modal
        //                     animationType='fade'
        //                     transparent={true}
        //                     visible={modalVisible}
        //                     onRequestClose={() => {
        //                         Alert.alert('Modal has been closed.');
        //                         setModalVisible(!modalVisible);
        //                     }
        //                 }>
        //                     <View>
        //                         <Mycaledar/>
        //                         <Pressable 
        //                             onPress = {() => setModalVisible(!modalVisible)}
                                  
        //                         >
        //                             <Text>OK</Text>

        //                         </Pressable>
        //                     </View>
                            

        //                 </Modal>
        //                 <Pressable
        //                     onPress={() => setModalVisible(true)}
        //                 >
        //                     <Text> Hom nay </Text>
        //                 </Pressable>
        //             </View>
         
        //         </View>
                
        //     </ScrollView>

        // </View>

        <ScrollView>
            <View style={styles.container}>
                <View style={styles.inputs}>
                    <TouchableOpacity
                        style={styles.selectBtn}
                        onPress={() => {
                            setModalVisible(true);
                            setActionTriggered('category');
                            // setFlag(true)
                        }}

                    >
                        {/* {console.log(modalVisible, actionTriggered)} */}
                        <Text style={styles.selectTxt}>{category != '' ? category : 'Select Category'}</Text>
                        <AntDesign
                            // style={{ paddingLeft: 10 }}
                            name="down"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    
                    <Modal
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}
                        transparent={true}
                    >
                        {actionTriggered === 'category' ?

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <Text style={styles.selectHeading}>
                                Category
                            </Text>
                            <View style={styles.divider}></View>
                            <View>
                                <TouchableOpacity onPress = {() => {
                                    setModalVisible(!modalVisible)
                                    setCategory('Rent')
                                    
                                }}>
                                <SelectRow
                                    spendingName="Rent"
                                    uri="https://img.icons8.com/fluency/512/home-page.png"
                                />
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => {
                                    setModalVisible(!modalVisible)
                                    setCategory('Grocery')
                                }}>
                                <SelectRow
                                    spendingName="Grocery"
                                    uri="https://img.icons8.com/fluency/512/ingredients.png"
                                />
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => {
                                    setModalVisible(!modalVisible)
                                    setCategory('Clothes')
                                }}>
                                <SelectRow
                                    spendingName="Clothes"
                                    uri="https://img.icons8.com/plasticine/512/clothes.png"
                                />
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => {
                                    setModalVisible(!modalVisible)
                                    setCategory('Shoes')
                                }}>
                                <SelectRow
                                    spendingName="Shoes"
                                    uri="https://img.icons8.com/parakeet/512/shoes.png"
                                />
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => {
                                    setModalVisible(!modalVisible)
                                    setCategory('Electricity')
                                }}>
                                <SelectRow
                                    spendingName="Electricity"
                                    uri="https://img.icons8.com/fluency/512/paid-bill.png"
                                />
                                </TouchableOpacity>
                            </View>
                            </View> 
                        </View> :
                        actionTriggered === 'calendar' ?
                        <View>
                            {/* <Mycaledar/> */}
                            <View>
            
                                <Calendar 
                                
                                
                                    onDayPress={(day) => {
                                    
                                        setdate(day.dateString)
                                        
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
    
                                <Pressable onPress = {() => setModalVisible(!modalVisible)}>
                                    <Text>OK</Text>
                                </Pressable>
                        </View> : null}
                    </Modal>

                    <TouchableOpacity
                        style={styles.selectBtn}
                        onPress={() => {setModalVisible(true);
                            setActionTriggered('calendar');}}
                    >
                        <Text >{date != '' ? date : 'select date'}</Text>

                        <AntDesign
                            // style={{ paddingLeft: 10 }}
                            name="calendar"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>

                    <TextInput
                        // variant="outlined"
                        placeholder='Amount'
                        // label="Amount"
                        style={{height:50, marginVertical:10}}
                        // color="#12B886"
                        keyboardType="numeric"

                    />
                    <TextInput
                        // variant="outlined"
                        // label="Add Note (Optional)"
                        placeholder='Add note (Optional)'
                        color="#12B886"
                        multiline={true}
                        numberOfLines={10}
                        style={{ marginVertical: 10 }}
                    />

                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnTxt}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

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
    },
    divider: {
      height: 1,
      width: Dimensions.get("screen").width - 30,
      backgroundColor: "rgba(0,0,0, 0.3)",
      marginVertical: 10,
    },
  });  


export default AddNewStatus;