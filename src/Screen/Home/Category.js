import React, {useState} from 'react';
import { ScrollView,Button, View,StyleSheet, Text,TouchableOpacity,Image,TextInput,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Số liệu mặc định
const width= Dimensions.get('window').width
const Para=width/2
const PositionLeft=-0.85
const PositionMid=-0.25
const PositionRight=0.35
const Layer=-1.5
const LayerBonus=0.65

//Class các category
class CategoryButton {
  constructor(id,top,left,img) {
    this.id=id
    this.top=(Layer+top*LayerBonus)*Para;
    this.left=left*Para;
    this.img=img
  }
}


//Tạo một số button ban đầu
const button1=new CategoryButton("category 1",0,PositionLeft,"./demo.jpg")
const button2=new CategoryButton("category 2",0,PositionMid,"./demo.jpg")
const button3=new CategoryButton("category 3",0,PositionRight,"./demo.jpg")
var buttonPush=new CategoryButton(-1,1,PositionLeft,"./demo.jpg")

//Vị trí của Nút thêm khi thêm category mới sẽ lấy vị trí của điểm này
var PositionOfButtonPush=[buttonPush.top,buttonPush.left]


//Mảng các Category
var buttonArray=[button1,button2,button3]

//Hàm tạo Category mới
function NewButton(id,img){
  var new_button=new CategoryButton(id,0,0,img)
new_button.top=PositionOfButtonPush[0]
new_button.left=PositionOfButtonPush[1]
  buttonArray.push(new_button)

  if(PositionOfButtonPush[1]==0.35*Para){
    PositionOfButtonPush[0]+=LayerBonus*Para
    PositionOfButtonPush[1]=PositionLeft*Para
  }
  else{
    PositionOfButtonPush[1]+=0.6*Para
  }

  buttonPush.top=PositionOfButtonPush[0]
  buttonPush.left=PositionOfButtonPush[1]
}

//Màn hình chính
function HomeScreen({ navigation, route }) {

  React.useEffect(() => {
    //Hàm thêm nút mới nhưng hiện tại phải nhập 2 lần mới tạo nút mới
    if (route.params?.post) {
      NewButton(route.params.post,"./demo.jpg")
    }
  }, [route.params?.post]);
  return (
    <View style={styles.container}>
    <View style={styles.btnContainer}>
      <View style={styles.btnContainerMiddle}>
        {/* Show các category*/}
        {buttonArray.map((item) =>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChangeButton', {
            id:item.id,
            top:item.top,
            left:item.left,
            img:item.img,
          });
        }}
        style={[
            styles.button,
            { position: 'absolute', left: item.left, top: item.top },
          ]}>
          {/* Set image cho nút nhưng hiện tại chưa dc*/}
          <View>
            <Image style={styles.image} source="./demo.jpg" resizeMode="contain"/>

         </View>


        {/* Nút thêm category mới*/}
        </TouchableOpacity>
        )}


         <TouchableOpacity
        onPress={() => {
          navigation.navigate("Creat New Category", {
          });
        }}
        style={[
            styles.buttonPush,
            { position: 'absolute', left: buttonPush.left, top: buttonPush.top },
          ]}>
{/* Set image cho nút nhưng hiện tại chưa dc*/}
          <View>
            <Image style={styles.image} source="./demo.jpg" resizeMode="contain"/>
         </View>

        </TouchableOpacity>




      </View>
    </View>

    </View>
  );
}
//Màn hình thay đổi category cũ  (Chưa làm)
function ChangeButton({ route, navigation }) {
  const {id,top,left,img} = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Name of category: {JSON.stringify(id)}</Text>
    </View>
  );
}
//Màn hình tạo category mới
function PushButton({ navigation, route }){
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="Name of new category"
        //keyboardType = 'numeric'
        style={{justifyContent: 'center', height: '7%', padding: '5%',alignItems: 'center', backgroundColor: 'lightblue',borderWidth:1,borderRadius:15,margin:10 }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Creat New Category"
        onPress={() => {
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

const Stack = createNativeStackNavigator();

function Category() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChangeButton" component={ChangeButton} />
        <Stack.Screen name="Creat New Category" component={PushButton} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'gray',
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    // flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    //backgroundColor: 'grey',
    padding: 8,
    width: '100%',
    height: '100%',
    //borderRadius: 100,
    alignItems: 'center',
  },
  btnContainerMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: 10,
    width: 80,
    height: 80,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPush: {
    margin: 10,
    width: 80,
    height: 80,
    backgroundColor: 'blue',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{

  },

});


export default Category;
