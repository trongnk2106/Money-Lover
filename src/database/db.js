import React, {useState} from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Button,
  } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage'
import { Calendar } from 'react-native-calendars';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const db = openDatabase({name: 'data.db', createFromLocation: 1})

function  InitDatabse(){

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

    ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
            (error) => {
            reject(error);
            });
        });
    });

    async function CreateTable() {
        let Table = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, first_name VARCHAR(16), last_name VARCHAR(16), is_deleted INTEGER)",[]);
        console.log(Table);
    }

    async function InsertQuery() {

        // single insert query 
        // let singleInsert = await this.ExecuteQuery("INSERT INTO users (id, first_name, last_name, is_deleted) VALUES ( ?, ?, ?, ?)", [1, 'Infinite', 'Ability', 0]);
        // console.log(singleInsert);
    
        // multiple insert of users
        // let Data = [{ "id": 2, "first_name": "Shani", "last_name": "Tiwari", "is_deleted": "0" }, { "id": 3, "first_name": "John", "last_name": "Carter", "is_deleted": "0" }, { "id": 4, "first_name": "captain", "last_name": "marvel", "is_deleted": "0" }];
        // let query = "INSERT INTO users (id, first_name, last_name, is_deleted) VALUES";
        // for (let i = 0; i < Data.length; ++i) {
        //   query = query + "('"
        //     + Data[i].id //id
        //     + "','"
        //     + Data[i].first_name //first_name
        //     + "','"
        //     + Data[i].last_name //last_name
        //     + "','"
        //     + Data[i].is_deleted //is_deleted
        //     + "')";
        //   if (i != Data.length - 1) {
        //     query = query + ",";
        //   }
        // }
        // query = query + ";";
        // console.log(query);
    
        // let multipleInsert = await this.ExecuteQuery(query, []);
        // console.log(multipleInsert);
        // let Table = await this.ExecuteQuery("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, first_name VARCHAR(16), last_name VARCHAR(16), is_deleted INTEGER)",[]);
        // multiple insert of state table
        let countryData = [{ "ID": 100, "Money": 100000, "Thu": "Thu", "Date": "2/18/2023" }];
        let countryQuery = "INSERT INTO GIAODICH (ID, Money, Thu, Date) VALUES(?,?,?,?)";
        for (let i = 0; i < countryData.length; ++i) {
          countryQuery = countryQuery + "('"
            + countryData[i].id //id
            + "','"
            + countryData[i].user_id //user_id
            + "','"
            + countryData[i].country_name //country_name
            + "','"
            + countryData[i].is_deleted //is_deleted
            + "')";
          if (i != countryData.length - 1) {
            countryQuery = countryQuery + ",";
          }
        }
        countryQuery = countryQuery + ";";
        console.log(countryQuery);
    
        let countryMultipleInsert = await this.ExecuteQuery(countryQuery, []);
        console.log(countryMultipleInsert);
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
                        InsertQuery()
                        // Alert.alert('Button with adjusted color pressed')
                        }
                    }
                />
                 <Button
                    title="CreateTable"
                    style = {{fontSize:20, fontWeight:'bold'}}
                    // style={styles.button}
                    onPress={() => {
                        CreateTable()
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


export default InitDatabse;