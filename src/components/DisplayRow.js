import { StyleSheet, Text, View, Image } from "react-native";

export default function DisplayRow(props) {
  // console.log(props)
  const ViewThu = (props) => {
    if (props.data != null)
      console.log(props.data)
  //   var data = [] 
  //   for(let i = 0; i < props.length; i++){
  //     if (props[i].Thu == 1){
  //       var x = {"Date": props[i].Date, "Money": props[i].Money}
  //       data.push(x)
  //     }
  //   }
  //   var k = data.length - 1
  //   return (
  //     <View style={styles.row}>
  //     <View style={styles.col}>
  //         {/* <Image
  //         source={{
  //             uri: "https://img.icons8.com/fluency/512/home-page.png",
  //         }}
  //         style={{ width: 40, height: 40, marginRight:10 }}
  //         /> */}
  //         <View>
  //             <Text style={styles.heading}>Rent</Text>
  //             <Text style={styles.text}>{data[k].Date}</Text>
  //         </View>
  //     </View>
  //     <View>
  //         <Text style={styles.heading}>-100,000</Text>
  //     </View>
  // </View>
  //   )
  }
  if (props.data != null)
    return (
    // ViewThu(props)
    <View style={styles.row}>
        <View style={styles.col}>
            {/* <Image
                source={{
                    uri: 
                }}
                style={{ width: 40, height: 40, marginRight:10 }}
            /> */}
            <View>
                <Text style={styles.heading}>{props.data.Category}</Text>
                <Text style={styles.text}>{props.data.Date}</Text>
            </View>
        </View>
        <View>
            <Text style={styles.heading}>{props.data.Money}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginVertical:10
  },
  col: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  heading:{
    fontFamily:"PoppinsBold",
    fontSize:15,
  },
  text:{
    fontFamily:"Poppins"
  }
});