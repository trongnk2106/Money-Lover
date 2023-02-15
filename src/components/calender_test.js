import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';


const [date, setdate] = useState('')

const Mycaledar = () => {
    
  return (

    <View>
        
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
                [date] : {selected: true, marked: true, selectedColor: '#466A8F'}
            }}
        />
 
    </View>

  );
     
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});

export  {Mycaledar,date};