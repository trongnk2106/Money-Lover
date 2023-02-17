/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import BaoCaoChiTieu from './src/components/Baocaochitieu'
// import App from './src/route/NavigationBar'
// import App from './HomeScreen'
import Addneww  from './src/components/Addnew'
import TestBD  from './src/components/data'
// import celender from './src/components/calender_test'
// import Test_modal from './src/components/test_modal';
// import App from './src/components/calender_test';
// import App from './src/route/NavigationTabBar'
import appJson from './app.json';

AppRegistry.registerComponent(appJson.name, () =>Addneww);
