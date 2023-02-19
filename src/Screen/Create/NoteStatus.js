import React, { Component , useState, useEffect} from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Button, Alert, SectionList, FlatList,
    TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native'

import AntDesign from "react-native-vector-icons/AntDesign";
import SelectRow from '../../components/SelectRow';
import { openDatabase } from 'react-native-sqlite-storage';
import CategoryRow from '../../test_flatlist';
import { Agenda, Calendar } from 'react-native-calendars';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const db =  openDatabase({ name: 'data.db',createFromLocation : 1})


function AddNewStatus() {
    const [ID, setID] = useState(0)
    const [Date, setdate] = useState('')
    const [Money, setmoney] = useState(0)
    const [Category, setCategory] = useState('')
    const [ThuChi, setThuChi] = useState('THU')

    const [modalVisible, setModalVisible] = useState(false)
    const [actionTriggered, setActionTriggered] = useState('');
    
    const [ListData, setListData] = useState([])
    
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

    useEffect(() => {
        db.transaction((tx) =>{
                tx.executeSql(
                    "SELECT * FROM GIAODICH",
                    [],
                    (tx, results) =>{
                        var temp = []
                    
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            temp.push(a)
                            // sumx.push(summ)
                            // if (results.rows.item(i).DATE.slice(5,7) == "02")
                            //     tp[0].SUMMONEY = tp[0].SUMMONEY + results.rows.item(i).Money
                            // console.log(results.rows.item(i).DATE.slice(5,7))
                        }
                        // console.log(temp)
    
                        // setSumM(tp)
                        setListData(temp)
                        // console.log(ListData)
                    }
                )
            })
      }, []); 

      const setData = async () =>{
        if (Date.length == 0 || Money == 0 || ThuChi == 0 || Category == 0){
            Alert.alert('Vui lòng điền đầy đủ thông tin trước khi thêm giao dịch!!!')
        }
        else {
            // getID()
            var newID = ID + 1
            setID(newID)
            var thu = 1
            var newMoney = Money
            if (ThuChi == "CHI"){
                thu = 0
                var newMoney = -Money
            }
            await db.transaction(async (tx)=> {
                await tx.executeSql(
                "INSERT INTO GIAODICH (ID, Money, Thu, Date, Category ) VALUES(?,?,?,?,?)",
                [newID,newMoney,thu,Date, Category]
                )
                console.log(newID,newMoney,thu,Date, Category)
            })
            Alert.alert('Giao dịch đã được thêm')
            // setModifine(!modifine)
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.inputs}>
                    
                    <TouchableOpacity
                        style={styles.selectBtn}
                        onPress={() => {
                            setModalVisible(true);
                            setActionTriggered('category');}}
                    >

                        <Text style={styles.selectTxt}>{
                            Category != '' ? Category : 'Select Category'}
                        </Text>
                        <AntDesign
                            name="down"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>


                    {/* <OptionSwitch
                        styles={{
                            item: {
                                width: 100,
                                height: 24,
                                borderRadius: 12,
                                marginHorizontal: 8,
                                alignItems: 'center',
                            },
                            selectedItem: {
                                width: 100,
                                height: 24,
                                borderRadius: 12,
                                marginHorizontal: 8,
                                backgroundColor: '#12B886',
                                alignItems: 'center',
                            },
                        }}
                        onChange={(value) => {
                            if (value == 'income')
                                setThuChi("THU")
                            else
                                setThuChi("CHI")
                        }}
                        options={[
                            {
                                label: 'Income',
                                value: 'income',
                                isDefault: true
                            }, {
                                label: 'Expense',
                                value: 'expense'
                            }
                        ]}
                    /> */}
                    
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

                            <View style={{height: 400}}>
                                <ScrollView contentContainerStyle={styles.contentContainer}>
                                    
                                    <Text style={styles.sectionBar}>Monthly Expenses</Text>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Rent')
                                        setThuChi("CHI")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Rent"
                                        uri="https://img.icons8.com/fluency/512/home-page.png"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Travel')
                                        setThuChi("CHI")
                                    }}>
                                    <SelectRow
                                        spendingName="Travel"
                                        uri="https://img.icons8.com/external-flaticons-flat-flat-icons/2x/external-vehicles-automotive-dealership-flaticons-flat-flat-icons-5.png"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Food')
                                        setThuChi("CHI")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Food"
                                        uri="https://img.icons8.com/plasticine/2x/food.png"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Bill')
                                        setThuChi("CHI")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Bill"
                                        uri="https://img.icons8.com/fluency/512/paid-bill.png"
                                    />
                                    </TouchableOpacity>

                                    <Text style={styles.sectionBar}>Necessary Expenses</Text>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Medical')
                                        setThuChi("CHI")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Medical"
                                        uri="https://img.icons8.com/fluency/2x/hospital.png"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Education')
                                        setThuChi("CHI")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Education"
                                        uri="https://img.icons8.com/fluency/2x/graduation-cap.png"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Grocery')
                                        setThuChi("CHI")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Grocery"
                                        uri="https://img.icons8.com/fluency/512/ingredients.png"
                                    />
                                    </TouchableOpacity>

                                    <Text style={styles.sectionBar}>Discretionary Expenses</Text>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Entertainment')
                                        setThuChi("CHI")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Entertainment"
                                        uri="https://img.icons8.com/fluency/2x/ps-controller.png"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Shopping')
                                        setThuChi("CHI")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Shopping"
                                        uri="https://img.icons8.com/fluency/2x/add-shopping-cart.png"
                                    />
                                    </TouchableOpacity>

                                    <Text style={styles.sectionBar}>Income</Text>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Salary')
                                        setThuChi("THU")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Salary"
                                        uri="https://img.icons8.com/fluency/2x/money.png"
                                    />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress = {() => {
                                        setModalVisible(!modalVisible)
                                        setCategory('Other Income')
                                        setThuChi("THU")
                                        
                                    }}>
                                    <SelectRow
                                        spendingName="Other Income"
                                        uri="https://img.icons8.com/fluency/2x/growing-money.png"
                                    />
                                    </TouchableOpacity>



                                </ScrollView>
                            </View>



                            </View> 
                        </View> :

                        actionTriggered === 'calendar' ?

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
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
                                        [Date] : {selected: true, marked: true, selectedColor: '#466A8F'}
                                    }}
                                />

                                <View style={styles.row}>
                                    <TouchableOpacity 
                                        style={styles.doneBtn} 
                                        onPress = {() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.btnTxt}>Done</Text>
                                    </TouchableOpacity>
                                </View>                              
                        
                            </View>
                        </View> : null}
                    </Modal>


                    <TouchableOpacity
                        style={styles.selectBtn}
                        onPress={() => {setModalVisible(true);
                            setActionTriggered('calendar');}}
                    >
                        <Text style={styles.selectTxt}>{Date != '' ? Date : 'Select Date'}</Text>

                        <AntDesign
                            name="calendar"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    
                    
                    <TextInput
                        style = {styles.inputText}
                        placeholder='Amount'
                        keyboardType="numeric"
                        onChangeText={(newMoney) => setmoney(newMoney)}
                    />
                    

                    
                    <TextInput
                        style = {styles.inputText}
                        placeholder='Add Note (Optional)'
                        multiline={true}
                        numberOfLines={10}
                        // onChangeText={newghichu => setghichu(newghichu)}
                        // defaultValue={ghichu}
                    />
                    

                </View>

                <View style={styles.row}>
                    <Button
                        title="ADD"
                        style = {styles.button}
                        onPress={() => {
                            setData()
                            // Alert.alert('Button with adjusted color pressed')
                            }
                        }
                />
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