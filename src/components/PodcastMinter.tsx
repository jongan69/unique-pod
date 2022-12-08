import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons";
import * as XRPFunctions from '../../xrpRPC';
// import * as nftStorage from '../../ipfs';

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
    // for (const name in podcast) {
    //   file.append(name, podcast[name]);
    // }

    const ipfs = await fetch("https://api.nft.storage/store", {
      method: 'POST',
      body: file,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyMkQzODI3RjUzM0IwRjkzMmUwZGQ5YjhDQTY1NzNCZDBGNDcyOWUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MDQ3Njk4NTQzNSwibmFtZSI6InVuaXF1ZS1wb2QifQ.sJPDQ4Q8I4iDRUkNNnw1RLVvXEbd1rIRU3I5_hvGuog"
      },
    })

    // Mint Podcast as NFT using key and podcast
    // const post = await XRPFunctions.mintToken(podcast);

    // return post;
    console.log(ipfs);
    setMintData(ipfs);
    setModalVisible(!modalVisible)
    setPodcast();
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
            {/* <InputField
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
            /> */}
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => {}}>
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