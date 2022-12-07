import React from "react";
import { Text, Pressable, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import RPC from '../../ethersRPC'; // for using ethers.js
import { AppContext } from "../context/AppProvider";
import { styles } from "../constants/style";
import { toast } from "@backpackapp-io/react-native-toast";

const GetFavorsButton = () => {
  const { key, setFavors } = React.useContext(AppContext);
  const { colors } = useTheme();

  //Function to get all Incomplete Favors
  const getFavors = async () => {
    const id = toast.loading("Getting All Favors...");
    const favs = await RPC.getAllIncompleteFavors(key);
    setFavors(favs);
    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);
  };

  return (
    <View>
      <Pressable
        style={[styles.button4, { backgroundColor: colors.primary }]}
        onPress={() => getFavors()}
      >
        <Text style={[styles.textStyle, { backgroundColor: colors.primary }]}>Refresh Favors</Text>
      </Pressable>
    </View>
  );
};

export default GetFavorsButton;