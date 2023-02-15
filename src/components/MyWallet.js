import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DetailsMyWallet() {
    return (
        <View style = {{flexDirection:'column'}}>
            <View style = {{flexDirection:'row', justifyContent:'space-between', margin:15, marginTop: 20}}>
                <Text style = {{fontSize:20, fontWeight:'bold'}}> Vi cua toi</Text>
                <Text style = {{fontSize:20, fontWeight:'bold'}}> Sua</Text>
                
            </View>

            <View
                style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}/>
           
            <View style={{flexDirection:'row', margin:15}}>
                <View style ={{margin:10}}> 
                    <Text> Icon</Text>
                </View>
              
                <View style ={{margin: 5}}> 
                    <Text style = {{fontSize:15, fontWeight:'bold'}}> Tong cong</Text>
                    <Text style = {{fontiSize:15}}> 1 ty</Text>
                </View>
            </View>
            
        </View>

    )
}
const styles = StyleSheet.create({
    head : {
        fontSize: 100,
        fontWeight :'bold',
    },
})

export default DetailsMyWallet;