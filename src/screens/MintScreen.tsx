import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import ProfileImage from "../components/ProfileImage";
import ToDoItem from "../components/ToDoItem";
import { ToDoList } from "../constants/favorsList";
import {
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import CustomSwitch from "../components/CustomSwitch";
import { styles } from "../constants/style";
import * as DocumentPicker from "expo-document-picker";
import PodcastMinter from "../components/PodcastMinter";



const MintScreen = ({ navigation }) => {
  const [podcast, setPodcast] = useState();

  //Expo document picker
  const _pickDocument = async () => {
    await DocumentPicker.getDocumentAsync({})
      .then((data) => {
        // alert(data);
        setPodcast(data);
        // Format URI
        // Upload to IPFS via Storage.NFT
        // Return IPFS Hash
        // Mint Token on XRP
        console.log(data);
      });
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ProfileImage />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: '20%',
            }}
          >
            <Text style={styles.h1}>Mint A Podcast</Text>

            <Button
              title="Select Document"
              onPress={_pickDocument}
            />
            {podcast !== undefined &&
              <View>
                <Text>Name: {podcast.name.toString()}</Text>
                <Text>Size: {podcast.size.toString()}</Text>
                <Text>URI: {podcast.uri.toString()}</Text>
                <PodcastMinter podcast={podcast} setPodcast={setPodcast}/>
              </View>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MintScreen;
