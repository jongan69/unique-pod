import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons";
import RPC from '../../ethersRPC'; // for using ethers.js
import { AppContext } from "../context/AppProvider";

const PostFavor = () => {
  const { key, setKey, currentWalletAddress } = React.useContext(AppContext);
  const [favorText, setFavorText] = useState<String>();
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();

  // Function to post a favor to contract
  const postFavor = async (favor: string) => {
    const post = await RPC.postFavor(favor);
    return post;
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>What do you need help with?</Text>
            <InputField
              label={'Dont be shy, ask for a favor!'}
              icon={<Ionicons
                name="mail"
                size={20}
                color={colors.primary}
                style={{ marginRight: 5 }} />}
              value={favorText}
              onChangeText={(value: string) => setFavorText(value)}
              inputType="favor"
              keyboardType={undefined}
              // fieldButtonLabel="Favor" 
              fieldButtonFunction={undefined}
            />
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => {
                postFavor(favorText);
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Ask Favor</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.textStyle, { backgroundColor: colors.primary }]}>Post Favor</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default PostFavor;