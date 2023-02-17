import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "react-native-vector-icons";
import TransactionWallet from "./TransactionWallet";
import { StyleSheet, Text, View } from "react-native";

const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="TransactionWallet"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#C6F3CA",
        drawerActiveTintColor: "#12B886",
      }}
    >
      <Drawer.Screen
        name="TransactionWallet"
        component={TransactionWallet}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="home" size={20} color={color} />
          ),
          headerTitle: (props) => <CustomHeader {...props} name="home" />,
          headerTitleAlign:"center"
        }}
      />
      <Drawer.Screen
        name="Planning"
        component={Predictions}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="areachart" size={20} color={color} />
          ),          
          headerTitleAlign:"center"
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomHeader({name}) {
  return (
    <View>      
        <AntDesign name={name} size={24} color="black" />      
    </View>
  );
}

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>F</Text>
        </View>
        <Text style={styles.text}>...</Text>
      </View>
      {/* end of header */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  profileCircle: {
    width: 100,
    height: 100,
    backgroundColor: "#12B886",
    borderRadius: 100,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 42,
  },
  text: {
    fontFamily: "PoppinsBold",
    marginTop: 15,
    fontSize: 18,
  },
  right: {
    textAlign: "right",
  },
});
