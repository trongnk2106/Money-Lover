import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = () => {

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showTimePicker = () => {
    setTimePickerVisible(true)
  }
  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    console.log(time)
    hideTimePicker();
  };


  return (
    <View>

      <Button title="Show Time Picker" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        date={selectedDate ? new Date(selectedDate) : undefined}
      />
    </View>
  );
};

export default TimePicker;



