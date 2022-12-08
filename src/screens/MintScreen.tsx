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
import * as DocumentPicker from ‘expo-document-picker’;

//Expo document picker

_pickDocument = async () => {

  let result = await DocumentPicker.getDocumentAsync({});
  
  alert(result.uri);
  
  console.log(result);
  
  }

  // <Button
  // title=”Select Document”
  // onPress={this._pickDocument}
  // />

const MintScreen = ({ navigation }) => {

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
              padding: 1,
            }}
          >
            <Text style={styles.h1}>Minted Podcasts</Text>
            {ToDoList.map((item) =>
              item.isCompleted ? (
                <ToDoItem
                  uri={item.uri}
                  service={item.service}
                  walletAddress={item.walletAddress}
                  name={item.name}
                  completed={item.isCompleted}
                />
              ) : null
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MintScreen;
