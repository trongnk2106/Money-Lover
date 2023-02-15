import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const test_DATA = {

}


function BaoCaoChiTieu() {
    return(
        <View>
           <View style = {styles.head}>
                <View style = {{flexDirection:'column',textAlign:'center', margin:15}}>
                    <Text style = {{textAlign:'center'}}> so du</Text>
                    <Text style = {{textAlign:'center', fontWeight:'bold', fontSize:15, marginTop:20}}> 1 ty</Text>
                    <Text style = {{textAlign:'center', fontWeight:'bold', fontSize:15, marginTop:20}}> Tong cong</Text>
                </View>
                <View>

                </View>
           </View>
           <View  style={{
                borderBottomColor: '#403d3d',
                borderBottomWidth: StyleSheet.hairlineWidth
                }}/>
           
            <ScrollView>
                <View style = {styles.body}>
                    <View style={{margin:20}}>
                        <Text style = {{fontSize:20, fontWeight:'bold'}}> So du</Text>
                        <View style = {{flexDirection : 'row', justifyContent:'space-between', marginTop:10, marginRight:10}}>
                            <View>
                                <Text> So du dau </Text>
                                <Text style = {{fontWeight :'bold', fontSize:20}}> 1 ty</Text>
                            </View>
                            
                            <View>
                                <Text> So du cuoi</Text>
                                <Text style = {{fontWeight:'bold', fontSize:20}}> 1 ty</Text>
                            </View>
                            
                        </View>
                    </View>
                    <View  style={{
                    borderBottomColor: '#575353',
                    borderBottomWidth: StyleSheet.hairlineWidth
                    }}/>
                    <View>
                        <Text style = {{margin : 15, fontSize:20, fontWeight:'bold'}}> Khoan thu & khoan chi</Text>
                        <Text style = {{marginLeft:15}}> thu nhap rong</Text>
                    </View>
                </View>
                
            </ScrollView>

           
        </View>
    )
}

const styles = StyleSheet.create({
    head:{
        // backgroundColor: 'blue',
        height: windowHeight * 0.3,
        flexDirection:'column'
    },
    body:{
        // backgroundColor: 'black',
        height: windowHeight
    }
})

export default BaoCaoChiTieu;