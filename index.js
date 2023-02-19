/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
// import App_Clock from './src/Screen/Home/Clock';
import TimePicker from './src/Screen/Home/Clock';
PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    
        // process the action
      },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    requestPermissions: Platform.OS === 'ios',
    popInitialNotification: true,
})


AppRegistry.registerComponent(appName, () => App);
