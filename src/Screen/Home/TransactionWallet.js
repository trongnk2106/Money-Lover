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
    FlatList,
    SafeAreaView,
  } from "react-native";

// import { AntDesign, MaterialCommunityIcons } from "react-native-vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BarChart } from "react-native-chart-kit";
import React , {useState, useEffect}from "react";
import { openDatabase } from 'react-native-sqlite-storage';
import DisplayRow from '../../components/DisplayRow';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})

function  TransactionWallet({ navigation }) {
    const [ID, setID] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [ListData, setListData] = useState([])
    const [ListDataFuture, setListDataFuture] =useState([])
    const [ListDataThisMonth, setListDataThisMonth] = useState([])
    const [ListDataLastMonth, setListDataLastMonth] = useState([])
    const [sum, setSum] = useState([])
    const [actionTriggered, setActionTriggered] = useState('')

    const getDateBefore = (date)=>{
        
        var mm = date.slice(5,7) - 1
        var yyyy = date.slice(0,4)
        if(mm == 0){
            mm = '12'
            yyyy = yyyy - 1
        }
        else if(mm > 0 && mm <10){
            mm = '0' + mm
        }
        var newDate = yyyy +'-' + mm
        return newDate
    }
    const GetByMonth = async(mm) =>{
        console.log(mm)
        
        var summ = 0
        await db.transaction(async (tx) =>{
            await tx.executeSql(
              "SELECT * FROM GIAODICH ORDER BY GIAODICH.Date",
              [],
                async (tx, results) =>{
                    // var sumx = []
                    var arr = []
                    var temp = []
                    for (let i = 0; i < results.rows.length; i++){
                      var a = await results.rows.item(i)
                      if (a.Date.slice(0,7) == mm){
                        temp.push(a)
                      }
                    }
                    console.log(temp)
                    return temp  
                }
            )
            
        }
        )
    }
    const getSum = async()=>{
        // console.log(1)
        // setdb(openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1}))
        
        let dd = new Date().getDate()
        if (dd < 10)
        dd = '0' + dd
        var mm = new Date().getMonth() + 1
        if (mm < 10)
        mm = '0' + mm
        var yyyy = new Date().getFullYear()
        var date = yyyy + '-' + mm + '-' + dd
        var date1 = getDateBefore(date)
        await db.transaction(async (tx) =>{
            await tx.executeSql(
              "SELECT * FROM GIAODICH ORDER BY GIAODICH.Date",
              [],
              (tx, results) =>{
                        var list = []
                        var listF = []
                        var list0 = []
                        var list1 = []
                        // var sumx = []
                        var arr = []
                        var summ = [{"ID": "Now","Thu": 0, "Chi": 0}, {"ID": "Future","Thu": 0, "Chi": 0}]  
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            
                            if (a.Date.slice(0, 7) == date1.slice(0,7))
                                list1.push(a)
                            if (a.Date <= date){
                              if (a.Date.slice(0, 7) == date.slice(0,7))
                                list0.push(a)  
                              list.push(a)
                              if (a.Money < 0){
                                summ[0].Chi += a.Money
                              }
                              else summ[0].Thu += a.Money     
                            }
                            listF.push(a)
                            if (a.Money < 0){
                                summ[1].Chi += a.Money
                              }
                              else summ[1].Thu += a.Money
                        }
                        
                        setSum(summ)
                        // console.log(summ)
                        setListData(list)
                        console.log(list0)
                        // console.log(ListData)
                        setListDataFuture(listF)
                        // console.log(ListDataFuture)
                        setListDataThisMonth(list0)
                        setListDataLastMonth(list1)
                    }
                )
            })
      };
    const TinhSum = (list) =>{
        if (list != null){
            var summ = 0
            for( let i = 0; i < list.length; i++){
                summ += list[i].Money
            }
            return summ
        }
    }
    useEffect(()=>{
        var mm = '2023-02'
        getSum()
        // getDataMonth()
        // {asd(13)}
        // var x = GetByMonth(mm)
        // console.log(GetByMonth(mm))
        // getDateBefore("2023-09-19")
        // getData()
      }, [])  
    let ShowSum = (item) => {
        // console.log(item)
        if (item != null){
            return (item.Chi + item.Thu)
        }
        };
    const getDataMonth = (list1, list2) =>{
        var mm = new Date().getMonth() + 1
        if (mm < 10)
            mm = '0' + mm
        var yyyy = new Date().getFullYear()
        var date2 = yyyy + '-' + mm
        var date1 = getDateBefore(date2)
        // console.log(k1)
            // var Month = new Date().getMonth()
            // var lb = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octoberr","November", "December"]  
            // var x = [0, 0, 0, 0, 0,0,0,0,0,0,0,0]
        if (list1 != null && list1 != null){
            return {
                labels: [date1, date2],
                datasets: [
                    {
                    data: [TinhSum(list1), TinhSum(list2)]
                    }
                ]
                };
        }
        }
        const ShowTHU = (ListData) =>{
            // console.log(123)
            if (ListData != null){
                // console.log(ListData)
                var dataThu = []
                var k = 0
                for (let  i = ListData.length - 1; i >= 0; i-- ){
                    // console.log(ListData[i])
                    if (ListData[i].Thu == 1){
                        var x = {
                            "Date": ListData[i].Date, 
                            "Money": ListData[i].Money,
                            "Category": ListData[i].Category,
                            "Image": ListData[i].Image
                        }
                        dataThu.push(x)
                        k = k + 1 
                    }
                    // console.log(dataThu)
                    if ( k == 3)
                        break
                }
                return(
                    <View>
                        <DisplayRow data = {dataThu[0]} />
                        <DisplayRow data = {dataThu[1]}/>
                        <DisplayRow data = {dataThu[2]}/>
                    </View>
                )
            }
            
        }
        const Show3GD = (ListData) =>{

            if (ListData != null){
                // console.log(ListData)
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
        const ShowCHI = (ListData) =>{
            // console.log(123)
            if (ListData != null){
                // console.log(ListData)
                var dataCHI = []
                var k = 0
                for (let  i = ListData.length - 1; i >= 0; i-- ){
                    console.log(ListData[i])
                    if (ListData[i].Thu == 0){
                        var x = {"Date": ListData[i].Date, "Money": ListData[i].Money, "Category": ListData[i].Category}
                        dataCHI.push(x)
                        k = k + 1 
                    }
                    // console.log(dataThu)
                    if ( k == 3)
                        break
                }
                return(
                    <View>
                    <DisplayRow data = {dataCHI[0]} />
                    <DisplayRow data = {dataCHI[1]}/>
                    <DisplayRow data = {dataCHI[2]}/>
                </View>
                )
            }
            
        }
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
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* summary container */}
                <View style={[styles.homeDiv, styles.homeSummary]}>
                <Text style={styles.summHeading}>Số dư</Text>
                <Text style={{fontSize: 14,fontFamily: "Poppins",textAlign:"center"}}>{TinhSum(ListData)} VNĐ </Text>
                {/* <View>
                   
                    <FlatList
                        data= {DATA}
                        horizontal={true}
                        renderItem={({item}) => <Item title={item.title} />}
                        keyExtractor={item => item.id}

                    />
                </View> */}
                </View>
                
                
                {/* end of summary container */}
                {/* chart container */}
                <View style={[styles.homeDiv]}>
                <BarChart
                    data={getDataMonth(ListDataLastMonth,ListDataThisMonth)}
                    // {{
                    // labels: ["January", "February", "March", "April", "May", "June"],
                    // datasets: [
                    //     {
                    //     data: [20, 45, 28, 80, 99, 43],
                    //     },
                    // ],
                    // }}
                    width={Dimensions.get("window").width - 30}
                    height={220}
                    fromZero = {1}
                    yAxisLabel={"VNĐ"}
                    showBarTops = {1}
                    showValuesOnTopOfBars = {1}
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

                <View style={[styles.homeDiv, styles.homeSpending]}>

                <View style={styles.row}>
                    <Text style={styles.rowHeading}>Recent Income</Text>
                    {/* <TouchableOpacity>
                    <Text style={styles.summText}>View All</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.selectBtn}
                        onPress={() => {
                            setModalVisible(true);
                            setActionTriggered('ShowAll');}}
                    >

                        <Text style={styles.selectTxt}>
                            View all
                        </Text>
                    </TouchableOpacity>
                </View>
                {Show3GD(ListData)}
                {/* <View>
                    <DisplayRow />
                    <DisplayRow />
                    <DisplayRow />
                </View> */}
                </View>
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
                {/* <View style={[styles.homeDiv, styles.homeSpending]}> */}
                {/* <View style={styles.row}>
                    <Text style={styles.rowHeading}>Recent Expenses</Text>
                    <TouchableOpacity>
                    <Text style={styles.summText}>View All</Text>
                    </TouchableOpacity>
                </View> */}
                {/* {ShowCHI(ListData)} */}
                {/* </View> */}
                {/* end of earning container      */}
            </ScrollView>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
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
    textAlign:"center",
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
selectHeading: {
    textAlign: "center",
    fontFamily: "PoppinsBold",
    fontSize: 16,
    fontWeight: 'bold'
  },
centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(0,0,0, 0.3)",
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
    fontWeight: "bold"
},
modalView: {
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width,
    padding: 20,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
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
});

export default TransactionWallet;