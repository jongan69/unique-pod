import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../constants/style";

const AcceptButton = ({ item, navigation }) => {

  return (
    <>
      <TouchableOpacity
        style={styles.likebutton}
        onPress={() => navigation.navigate('Payment')}
      >
        
        <Feather
          name="heart"
          size={50}
          color="#C6C6C6"
          // children={
          //   <Text> Test {item.item[0]} </Text>
          // }
        />
      </TouchableOpacity>
    </>
  )
}

export default AcceptButton;