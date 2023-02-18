// import * as React from 'react';
// import { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Button,
  } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DisplayRow from "../../components/DisplayRow";
import DisplayRow from "./components/DisplayRow";
// import { AntDesign, MaterialCommunityIcons } from "react-native-vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BarChart } from "react-native-chart-kit";
import React , {useState}from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Home ({ navigation }) {
    // render() {
    return (
      <ScrollView style = {{backgroundColor:'#d7dbdb'}}>
        <View style = {styles.head}>
          <View style={{marginTop:15}}>
            <Text style = {{flexDirection:'row', margin: 10, fontSize: 30, fontWeight:'bold'}}> $100000000</Text>
            <Text style = {{flexDirection:'row', marginLeft : 10, fontSize: 15}}> Tong so du</Text>
          </View>
          <View style={{marginTop:25,marginLeft:15, marginRight:15 , height: 120, backgroundColor: 'white', borderRadius: 10}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{marginLeft: 10, marginTop:15, fontWeight:'bold', fontSize:15}}> Vi cua toi</Text>
              <Text style = {{color: '#2cf205', marginTop:15, marginRight:15, fontWeight:'bold', fontSize:15}}> Xem tat ca</Text>
            </View>
            <View style={{backgroundColor:'#90968f', height:1, marginTop:15, marginLeft:5, marginRight:5}}/>
            <View style={{flexDirection:'row', marginTop:15, fontSize:15, fontWeight:'bold', justifyContent:'space-between'}}>
              <Text style ={{marginLeft:10,fontWeight:'bold'}}> Tien mat</Text>
              <Text style ={{marginRight:5, fontWeight:'bold'}}> $100000000</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row', marginBottom:15,justifyContent:'space-between'}}>
          <Text style={{ marginLeft:15, fontWeight:'bold'}}> Bao cao chi tieu</Text>
          <TouchableOpacity onPress={ () => navigation.navigate("TransactionWallet")} >
                <Text style={{marginRight:15, fontWeight:'bold', color:'#2cf205'}}> Xem bao cao</Text>
          </TouchableOpacity>
          
          {/* <Button
            title='Xem bao cao'
            onPress={ () => navigation.navigate("TransactionWallet")}
          /> */}
        </View>
        <View  style = {styles.body} >
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{fontWeight:'bold', fontSize:15, marginLeft: 75, marginTop:15}}> Tuan </Text>
            <Text style={{fontWeight:'bold', fontSize:15, marginRight: 75, marginTop:15}}> Thang </Text>
          </View>
        </View>
        <View style={{flexDirection:'row', marginTop:20, marginBottom:20, justifyContent:'space-between'}}>
          <Text style={{marginLeft:10, fontWeight:'bold', fontSize:15}}> Giao dich gan day </Text>
          <Text style ={{marginRight:15, fontWeight:'bold', fontSize:15, color:'#2cf205'}}> Xem tat ca</Text>
        </View>
        <View  style = {styles.earlyfooter} >
          <View style={{flexDirection:'row', marginTop:10, marginBottom:10, marginLeft:15, marginRight:15, justifyContent:'space-between'}}>
            <Text style={{ fontWeight:'bold', fontSize:15}}> Luong </Text>
            <Text style={{ fontWeight:'bold', fontSize:15}}> $50000</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:10, marginBottom:10, marginLeft:15, marginRight:15, justifyContent:'space-between'}}>
          <Text style={{ fontWeight:'bold', fontSize:15}}> Thue Nha </Text>
            <Text style={{marginLeft:10, fontWeight:'bold', fontSize:15}}> $5000</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:10, marginBottom:10, marginLeft:15, marginRight:15, justifyContent:'space-between'}}>
          <Text style={{ fontWeight:'bold', fontSize:15}}> Thu nhap khac </Text>
            <Text style={{marginLeft:10, fontWeight:'bold', fontSize:15}}> $5000</Text>
          </View>
        </View>
        <View>
          <Text style ={{fontWeight:'bold', margin:10}}> Ke hoach ca nhan</Text>
        </View>
        <View  style = {styles.footer} >
          <Text style={{margin:10}}> Ke hoach giup ban ghi chep giao dich hieu qua </Text>
        </View>
      </ScrollView>
    )
    // }
  }
  
  


  function  TransactionWallet({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* summary container */}
                <View style={[styles.homeDiv, styles.homeSummary]}>
                <Text style={styles.summHeading}>Name</Text>
                <Text style={styles.summText}>Total Spent This Week </Text>
                </View>
                {/* end of summary container */}
                {/* chart container */}
                <View style={[styles.homeDiv]}>
                <BarChart
                    data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                        data: [20, 45, 28, 80, 99, 43],
                        },
                    ],
                    }}
                    width={Dimensions.get("window").width - 30}
                    height={220}
                    yAxisLabel={"Rs"}
                    chartConfig={{
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    }}
                    style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    }}
                />
                </View>
                {/* end of chart container */}
                {/* spending container */}
                <View style={[styles.homeDiv, styles.homeSpending]}>
                {/* header row */}
                <View style={styles.row}>
                    <Text style={styles.rowHeading}>Recent Spending</Text>
                    <TouchableOpacity>
                    <Text style={styles.summText}>View All</Text>
                    </TouchableOpacity>
                </View>
                {/* contents row */}
                <View>
                    <DisplayRow />
                    <DisplayRow />
                    <DisplayRow />
                </View>
                </View>
                {/* end of spending container */}
                {/* earning container */}
                <View style={[styles.homeDiv, styles.homeSpending]}>
                {/* header row */}
                <View style={styles.row}>
                    <Text style={styles.rowHeading}>Recent Income</Text>
                    <TouchableOpacity>
                    <Text style={styles.summText}>View All</Text>
                    </TouchableOpacity>
                </View>
                {/* contents row */}
                <View>
                    <DisplayRow />
                    <DisplayRow />
                    <DisplayRow />
                </View>
                </View>
                {/* end of earning container      */}
            </ScrollView>
            {/* floating button */}
            <View style={[styles.footer]}>
                <View style={styles.bottomView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.bottomView}>
                            <View style={{ marginVertical: 20 }}>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalText}>Spending</Text>
                                <TouchableOpacity
                                style={[styles.floatingBtn, styles.spendingBtn]}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate("AddSpending");
                                }}
                                >
                                <MaterialCommunityIcons
                                    name="cash-minus"
                                    size={20}
                                    color="white"
                                />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalRow}>
                                <Text style={styles.modalText}>Earning</Text>
                                <TouchableOpacity
                                style={[styles.floatingBtn, styles.earningBtn]}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate("AddEarning");
                                }}
                                >
                                <MaterialCommunityIcons
                                    name="cash-plus"
                                    size={20}
                                    color="white"
                                />
                                </TouchableOpacity>
                            </View>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
                {!modalVisible && (
                <TouchableOpacity
                    style={styles.floatingBtn}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
                )}
            </View>
            {/* end of floating button */}
        </View>
    );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Na() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={TransactionWallet} />
        </Stack.Navigator>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'wallet' : 'wallet-outline';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Tab.Screen name="Wallet" component={TransactionWallet} options={{headerShown:false}} />
            {/* <Tab.Screen name= "Add" component={AddNewStatus} options={{headerShown:false}} />
            <Tab.Screen name= "Lap ke hoach" component={Lapkehoach} options={{headerShown:false}} /> */}
          </Tab.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    head:{
      width: windowWidth * 0.99,
      height: windowHeight * 0.35,
      // backgroundColor: 'yellow',
    },
    body:{
      width: windowWidth * 0.93,
      height: windowHeight * 0.4,
      backgroundColor: 'white',
      marginRight:15,
      marginLeft:15,
      borderRadius:10,
    },
    earlyfooter:{
      width: windowWidth * 0.93,
      height: windowHeight * 0.2,
      backgroundColor: 'white',
      marginLeft:15,
      marginRight:15,
      borderRadius:10,
      // justifyContent:'center',
      // textAlign:'center'
    },
    footer:{
      width: windowWidth * 0.93,
      height: windowHeight * 0.2,
      backgroundColor: 'white',
      marginLeft:15,
      marginRight:15,
      marginBottom:15,
      borderRadius:10
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignContent: "center",
        backgroundColor: "#fff",
    },
    onbImg: {
        width: Dimensions.get("screen").width,
        height: 600,
    },
    heading: {
        marginTop: 10,
        fontFamily: "PoppinsBold",
        fontSize: 24,
        width: "80%",
        marginHorizontal: 20,
    },
    text: {
        margin: 20,
        fontFamily: "PoppinsMedium",
        fontSize: 12,
    },
    button: {
        marginHorizontal: 20,
        marginTop: 50,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        width: Dimensions.get("screen").width,
    },
    homeDiv: {
        margin: 15,
    },
    summHeading: {
        fontSize: 24,
        fontFamily: "PoppinsBold",
    },
    summText: {
        fontSize: 14,
        fontFamily: "Poppins",
    },
    homeSpending: {
        borderColor: "#12B886",
        borderWidth: 1,
        width: Dimensions.get("screen").width - 30,
        padding: 10,
        borderRadius: 8,
    },
    homeEarnings: {
        borderColor: "#12B886",
        borderWidth: 1,
        width: Dimensions.get("screen").width - 30,
        padding: 10,
        borderRadius: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
    },
    rowHeading: {
        fontSize: 20,
        fontFamily: "PoppinsBold",
    },
    footer: {
        flex: 0,
        justifyContent: "flex-end",
        marginBottom: 10,
        height: 10,
        alignContent: "flex-end",
        alignItems: "flex-end",
        marginHorizontal: 10,
        width: Dimensions.get("screen").width - 30,
    },
    floatingBtn: {
        backgroundColor: "#12B886",
        padding: 10,
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginVertical: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalRow: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
    },
    modalText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "PoppinsBold",
        marginHorizontal: 10,
    },
    spendingBtn: {
        width: 40,
        height: 40,
    },
    earningBtn: {
        width: 60,
        height: 60,
    },
  
  })


export default Na;