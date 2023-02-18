import { Text, View } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Icon from 'react-native-vector-icons/FontAwesome'
// import Icon

function ExampleView() {
  return (
    <View>
        <Text> 
            <Icon name="home" size={100} />
        </Text>
       
    </View>
    
  );
}

export default ExampleView