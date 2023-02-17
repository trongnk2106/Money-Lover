/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import TransactionWallet from './src/Screen/Home/TransactionWallet';
// import AddEarning from './src/Screen/Create/AddEarning';
// import AddSpending from './src/Screen/Create/AddSpending';
import TransactionWallet from './src/Screen/Home/TransactionWallet';
import Test from './src/test'
// import DisplayRow from './src/components/DisplayRow';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Test);
