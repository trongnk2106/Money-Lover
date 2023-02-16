import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home/Home";

import AddEarning from './screens/Create/AddEarning';
import AddSpending from './screens/Create/AddSpending';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddEarning">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddEarning"
          component={AddEarning}
          options={{ headerShown: true, title:"Add Earning" }}
        />
        <Stack.Screen
          name="AddSpending"
          component={AddSpending}
          options={{ headerShown: true, title:"Add Spending" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}