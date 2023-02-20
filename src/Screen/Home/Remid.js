import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Button, SafeAreaView, TextInput, Dimensions, FlatList} from 'react-native'
import PushNotification from "react-native-push-notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import TimePicker from './Clock';

function ReminderApp(){
  // const [selectedHours, setSelectedHours] = useState(0);
  // const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [timer, setTimer] = useState('')
  const[Note, setNote] = useState('')
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const[Id, setId] = useState(0)
  const[date, setDate] = useState([])
  
  const showTimePicker = () => {
    setTimePickerVisible(true)
  }
  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    var listdate = [...date] 
    setNotification(time)
    hideTimePicker();
    setDate(Id + 1)
    var temp = {
      "ID": Id,
      "Time": time,
      "Note" : Note
    }
    listdate.push(temp)
    setDate(listdate)
  };

  useEffect(() => {
    createChannels()
  })
  
  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId:'test-channel',
        channelName: 'Test Channel'
      }
    )
  }


  const setNotification = (time) => {
    // console.log('in setnotifcation', time)
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Alarm',
      message: Note,
      date : time,
    });
  };


  return (
    <SafeAreaView style={styles.container_}>
      <TextInput
          style = {styles.inputText}
          placeholder='Add Note (Optional)'
          multiline={true}
          numberOfLines={10}
          onChangeText={newNote => setNote(newNote)}
          defaultValue={Note}
      />
                    
      <Button title="Show Time Picker" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        date={selectedDate ? new Date(selectedDate) : undefined}
      />
        
    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: 60,
  },
  container_: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
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
});

export default ReminderApp;