import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, TextInput, Dimensions, FlatList, Pressable } from 'react-native'
import PushNotification from "react-native-push-notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import TimePicker from './Clock';

function ReminderApp() {
  // const [selectedHours, setSelectedHours] = useState(0);
  // const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [timer, setTimer] = useState('')
  const [Note, setNote] = useState('')
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [Id, setId] = useState(0)
  const [date, setDate] = useState([])

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
      "Note": Note
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
        channelId: 'test-channel',
        channelName: 'Test Channel'
      }
    )
  }


  const setNotification = (time) => {
    // console.log('in setnotifcation', time)
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'MoneyLover',
      message: Note,
      date: time,
    });
  };

  return (
    <SafeAreaView style={styles.container_}>
      <TextInput
        style={styles.inputText}
        placeholder='Add Note (Optional)'
        multiline={true}
        numberOfLines={10}
        onChangeText={newNote => setNote(newNote)}
        defaultValue={Note}
      />

      <Pressable style={styles.button} onPress={showTimePicker}>
        <Text style={styles.text}>{"Show Time Picker"}</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        date={selectedDate ? new Date(selectedDate) : undefined}
      />

      {date.map((item, index) =>
        <View style={styles.notificationBox} key={item.id}>
          <Text style={styles.name}>{item.Time} : </Text>
          <Text style={styles.name}>{item.Note} . </Text>
        </View>
      )}

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
    backgroundColor: '#ccffff',
    width: Dimensions.get("screen").width - 30,
    borderWidth: 0.5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,

  },
  notificationBox: {
    backgroundColor: '#ccff66',
    width: Dimensions.get("screen").width - 30,
    borderWidth: 0.5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,

  },
  name: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: 'black',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3399ff',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default ReminderApp;
