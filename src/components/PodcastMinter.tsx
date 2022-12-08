import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { toast } from "@backpackapp-io/react-native-toast";

import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons";
import * as XRPFunctions from '../../xrpRPC';
const apiUrl = 'https://api.nft.storage/upload';
const storageApiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyMkQzODI3RjUzM0IwRjkzMmUwZGQ5YjhDQTY1NzNCZDBGNDcyOWUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTIxMDUyMjc0MCwibmFtZSI6ImRlbW8ifQ.2gT7maxJhiHD2e2EtaDIIlqSAb6meTWveph6ywPRe78';
import { AppContext } from "../context/AppProvider";

const PodcastMinter = ({ podcast, setPodcast }) => {
  const { key, setKey, currentWalletAddress } = React.useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [mintData, setMintData] = useState(null);
  const { colors } = useTheme();

  // Function to mint a podcast
  const postPodcast = async (podcast) => {
    setModalVisible(true);
    // Upload podcast to IPFS (using HTTPS API)
    const file = new FormData();
    const name = podcast.name;
    const filename = podcast.uri;
    file.append(name, filename);


    fetch(apiUrl, {
      method: 'POST',
      body: podcast,
      headers: {
        Authorization: `Bearer ${storageApiKey}`
      },
    }).then(async (data) => {
      let response = await data.json();
      toast.success(`Uploaded Audio to IPFS`);
      toast.success(`ipfs://${response.value.cid}`);
      console.log('IPFS URL:', `ipfs://${response.value.cid}`);
      console.log(response);
      // Mint Podcast as NFT using IPFS and XRPL
      // const post = await XRPFunctions.mintToken(podcast);
      // setMintData(post);
      setModalVisible(!modalVisible);
      // clear podcast;
      setPodcast();
    })
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
            <Text style={styles.modalText}>Minting your Podcast...</Text>
            <ActivityIndicator size={20} style={styles.indicator} />
            {mintData && <Text>{mintData?.toString()}</Text>}
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => postPodcast(podcast)}
      >
        <Text style={[styles.textStyle, { backgroundColor: colors.primary }]}>Mint Podcast</Text>
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
  indicator: {
    margin: 20,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
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

export default PodcastMinter;