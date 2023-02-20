import { StyleSheet, Text, View, Image } from "react-native";
import { Icons, getIcon } from './Icons'



export default function DisplayRow(props) {
  const ViewThu = (props) => {
    if (props.data != null)
      console.log(props.data)
  }


  if (props.data != null) 
  return (

    <View style={styles.row}>
        <View style={styles.col}>
            
            <Image
                source={{
                    uri: getIcon(props.data.Category)
                }}
                style={{ width: 40, height: 40, marginRight:10 }}
            />

            <View>
                <Text style={styles.text}>{props.data.Category}</Text>
                <Text style={styles.text}>{props.data.Date}</Text>
            </View>

        </View>
        <View>
            <Text style={styles.heading}>{props.data.Money} VNĐ</Text>
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
    fontWeight: "bold"
  },
  text:{
    fontFamily:"Poppins"
  }
});