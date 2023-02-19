import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, 
        Button, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BarChart } from "react-native-chart-kit";
import { openDatabase } from 'react-native-sqlite-storage';
import DisplayRow from '../../components/DisplayRow';
// import { modifine, setModifine } from '../../CheckModifine';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const Stack = createNativeStackNavigator();
// class App extends Component {
function Home ({ navigation }) {
  
  const [ID, setID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [ListData, setListData] = useState([])
  const [sum, setSum] = useState([])
  const [InfoThisMonth, setInfoThisMonth] = useState(0)
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
          var summ = [{"ID": "Now","Thu": 0, "Chi": 0}, {"ID": "This Month","Thu": 0, "Chi": 0}]
          for (let i = 0; i < results.rows.length; i++){
            var a = results.rows.item(i)
            if (a.Date <= date){
              tm.push(a)
              if (a.Money < 0){
                summ[0].Chi += a.Money
              }
              else summ[0].Thu += a.Money 
            }
            if (a.Date.slice(0,7) == date.slice(0,7)){
              if (a.Money < 0){
                summ[1].Chi += a.Money
              }
              else summ[1].Thu += a.Money
            }
          }
          setSum(summ)
          setListData(tm)
 
        }
      )
    }) 
  }
  useEffect(()=>{

    getData()
  }, [])
 
    
  let ShowSum = (item) => {
      if (item != null){
          return (item.Chi + item.Thu)
      }
      }; 
      const getDataMonth = (mm) =>{
        x = {
          labels: ["CHI TIÊU", "THU NHẬP"],
          datasets: [
            {
              data: [0, 0]
            }
          ]
        };
        if (mm != null){
            x.datasets[0].data = [-mm.Chi, mm.Thu]
            }
        return x
        }
    
    const Show3GD = (ListData) =>{

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

  return (
    <ScrollView style={{backgroundColor: '#ffffff'}}>
      <View style = {styles.head}>

        <View style={{marginTop:15}}>
          <Text style = {{flexDirection:'row', margin: 10, fontSize: 30, fontWeight:'bold'}}> {ShowSum(sum[0])}</Text>
          <Text style = {{flexDirection:'row', marginLeft : 10, fontSize: 15}}> Tổng số dư</Text>
        </View>

        <View>
          <View style={[styles.borderSection, styles.sectionDiv]}>
            <Text style={{marginLeft: 10, marginTop:10, fontWeight:'bold', fontSize:15}}> Ví của tôi</Text>
            <View style={{backgroundColor:'#90968f', height:1, marginTop:15, marginLeft:5, marginRight:5}}/>
            <View style={{flexDirection:'row', marginTop:15, fontSize:15, fontWeight:'bold', justifyContent:'space-between'}}>
              <Text style ={{marginLeft:10,fontWeight:'bold',marginBottom:10}}> Tiền mặt</Text>
              <Text style ={{marginRight:5, fontWeight:'bold'}}> {ShowSum(sum[0])}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.borderSection, styles.sectionDiv]}>
        <View style={{flexDirection:'row', marginBottom:15,justifyContent:'space-between'}}>
          <Text style={{ marginLeft:15, fontWeight:'bold'}}> Báo cáo chi tiêu</Text>
          <Text style={{marginRight:15, fontWeight:'bold', color:'#2cf205'}}> Xem bao cao</Text>

          {/* <Button
            title='Xem bao cao'
            onPress={ () => navigation.navigate("TransactionWallet")}
          /> */}
        </View>

        <View>
          <BarChart
              data= {getDataMonth(sum)}
              width={Dimensions.get("window").width - 30}
              fromZero = {1}
              height={300}
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
              marginRight: 15
              }}
          />
        </View>
      </View>
      
      

      <View style={{flexDirection:'row', marginTop:20, marginBottom:20, justifyContent:'space-between'}}>
        <Text style={{marginLeft:10, fontWeight:'bold', fontSize:15}}> Giao dich gan day </Text>
        <Text style ={{marginRight:15, fontWeight:'bold', fontSize:15, color:'#2cf205'}}> Xem tat ca</Text>
      </View>
      <View  style = {styles.earlyfooter} >
        {Show3GD(ListData)}
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
                  {/* <View style={[styles.homeDiv, styles.homeSpending]}>
                <View style={styles.row}>
                    <Text style={styles.rowHeading}>Recent Spending</Text>
                    <TouchableOpacity>
                    <Text style={styles.summText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <DisplayRow />
                    <DisplayRow />
                    <DisplayRow />
                </View>
                </View> */}          
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
  borderSection: {
    borderColor: "#12B886",
    borderWidth: 1,
    width: Dimensions.get("screen").width - 30,
    padding: 10,
    borderRadius: 8,
  },
  sectionDiv: 
  {
    margin: 15,
  }

})


export default Home;