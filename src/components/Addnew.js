import React, { Component , useState} from 'react'
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




function Addneww() {

    const [sotien, setmoney] = useState('')
    const [nhom, setnhom] = useState('')
    const [ghichu, setghichu] = useState('')
    const [ngay, setngay] = useState('')
    // const [date, setdate] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    
    console.log(Date)

    return(
        <View> 
            <View style = {{flexDirection :'row', justifyContent:'space-between', margin:15}}>
                <Text style = {{fontSize:20, fontWeight:'bold'}}> Huy</Text>
                <Text style = {{fontSize:20, fontWeight:'bold'}}> Them giao dich</Text>
                <Text style = {{fontSize:20, fontWeight:'bold'}}> Luu </Text>
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
                        onChangeText={newMoney => setmoney(newMoney)}
                        defaultValue={sotien}
                    />
                    <TextInput
                        style={{borderColor:"gray", width:"100%", borderBottomWidth:1, padding:10}}
                        placeholder="Chon nhom"
                        onChangeText={newNhom => setnhom(newNhom)}
                        defaultValue={nhom}
                    />
                    <TextInput
                        style={{borderColor:"gray", width:"100%", borderBottomWidth:1, padding:10}}
                        placeholder="Them ghi chu"
                        onChangeText={newghichu => setghichu(newghichu)}
                        defaultValue={ghichu}
                    />

                    
                    <View>
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }
                        }>
                            <View>
                                <Mycaledar/>
                                <Pressable 
                                    onPress = {() => setModalVisible(!modalVisible)}
                                  
                                >
                                    <Text>OK</Text>

                                </Pressable>
                            </View>
                            

                        </Modal>
                        <Pressable
                            onPress={() => setModalVisible(true)}
                        >
                            <Text> Hom nay </Text>
                        </Pressable>
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