import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, 
        Button, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BarChart } from "react-native-chart-kit";
import { openDatabase } from 'react-native-sqlite-storage';
import DisplayRow from '../../components/DisplayRow';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const Stack = createNativeStackNavigator();
// class App extends Component {
function Home ({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ListData, setListData] = useState([])
  const [sum, setSum] = useState([])

  const getDATA = useEffect(() => {
        console.log(1)
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
                        // console.log(temp, 1)
    
                        // setSumM(tp)
                        setSum(summ)
                        setListData(temp)
                        // console.log(temp)
                    }
                )
            })
      }, []);  
    
    let ShowSum = (item) => {
      // console.log(item)
      
      if (item != null){
          return (item.CHI + item.THU)
      }
      }; 
      const getDataMonth = (summ) =>{
        var Month = new Date().getMonth() + 1
        var lb = ["Thu", "CHI"]  
        var x = [0, 0, 0, 0, 0,0,0,0,0,0,0,0]
        if (summ != null){
            // for (i = 1; i <=12; i++){
            //     if (summ[i] != null)
            //         x[i - 1] = summ[i].CHI + summ[i].THU
            }
            return {
                labels: ["THU", "CHI"],
                datasets: [
                  {
                    data: [123, 123]
                  }
                ]
              };
        }
    
    const Show3GD = (ListData) =>{
      // console.log(123)
      console.log(ListData)
      if (ListData != null){
          // console.log(ListData)
          var data = []
          var k = 0
          for (let  i = ListData.length - 1; i >= 0; i-- ){
              var x = {"Date": ListData[i].Date, "Money": ListData[i].Money, "Category": ListData[i].Category}
              data.push(x)
              k = k + 1 
              // console.log(dataThu)
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
    // {await getDATA},
    <ScrollView style = {{backgroundColor:'#d7dbdb'}}>
      <View style = {styles.head}>
        <View style={{marginTop:15}}>
          <Text style = {{flexDirection:'row', margin: 10, fontSize: 30, fontWeight:'bold'}}> {ShowSum(sum[0])}</Text>
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
            <Text style ={{marginRight:5, fontWeight:'bold'}}> {ShowSum(sum[0])}</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection:'row', marginBottom:15,justifyContent:'space-between'}}>
        <Text style={{ marginLeft:15, fontWeight:'bold'}}> Bao cao chi tieu</Text>
        <Text style={{marginRight:15, fontWeight:'bold', color:'#2cf205'}}> Xem bao cao</Text>

        {/* <Button
          title='Xem bao cao'
          onPress={ () => navigation.navigate("TransactionWallet")}
        /> */}
      </View>
      <View style={styles.body}>
                <BarChart
                    data= {getDataMonth(sum)}
                    width={Dimensions.get("window").width - 30}
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
                    }}
                />
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

})


export default Home;