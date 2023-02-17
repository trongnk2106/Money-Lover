import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// class App extends Component {
function Home () {
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
        <Text style={{marginRight:15, fontWeight:'bold', color:'#2cf205'}}> Xem bao cao</Text>
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

})


export default Home;