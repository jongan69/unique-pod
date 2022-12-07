import React, { useState } from "react";
import { SafeAreaView, TextInput, Image, View, Text, Pressable } from "react-native";
import { styles } from "../constants/style";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../context/AppProvider";
import RPC from '../../ethersRPC'; // for using ethers.js
import { toast } from "@backpackapp-io/react-native-toast";

const HomeScreenPostArea = () => {
  const [text, onChangeText] = React.useState("");
  const { colors } = useTheme();
  const { key } = React.useContext(AppContext);
  const [data, setData] = useState();

  //Function to get all Incomplete Favors
  const postFavor = async (FavorText: string) => {
    try {
      let load = toast.loading("Sending Favor to Blockchain...");
      const post = await RPC.postFavor(FavorText, key);
      setTimeout(() => {
        toast.dismiss(load);
      }, 3000);
      
      if(post?.length > 0) {
        setData(post);
        onChangeText('');
        toast.error(`Successfully Post Favor!: ${post}`);
      }
    } catch (e) {
      toast.error(`Failed to Post Favor: ${e}`);
    }
  
  };

  return (
    <SafeAreaView>
        <View style={{ flexDirection: "column" }}>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.text, color: colors.text },
            ]}
            onChangeText={onChangeText}
            value={text}
            multiline
            placeholder="ie need help finding my dad"
            placeholderTextColor={colors.text}
          />
           {/* <GetFavorsButton /> */}
          <Pressable style={styles.button3} onPress={() => postFavor(text)}>
            <Text style={styles.buttonText2}>Ask for a favor</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default HomeScreenPostArea;
