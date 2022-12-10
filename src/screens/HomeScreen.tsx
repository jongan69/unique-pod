import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  TextInput,
} from "react-native";
import { styles } from "../constants/style";
import { useTheme } from "@react-navigation/native";
import CustomSwitch from "../components/CustomSwitch";
import { AppContext } from "../context/AppProvider";
import { toast } from "@backpackapp-io/react-native-toast";
import FavorCard from "../components/PodcastCard";
import { Feather } from "@expo/vector-icons";
import AcceptButton from "../components/AcceptButton";
import * as XRPFunctions from '../../xrpRPC';

export default function HomeScreen({ navigation }) {
  const { email, nfts, setNfts, currentWalletAddress, setCurrentWalletAddress, key, setKey } =
    React.useContext(AppContext);
  const [homeTab, setHomeTab] = useState(1);
  const [refreshing, setRefreshing] = useState(true);

  const { colors } = useTheme();

  console.log(
    "WALLET DATA FOR DEV (KEY, ADDRESS)",
    `KEY: ${key}`,
    `Address: ${currentWalletAddress}`
  );

  //Function to get all Incomplete Favors
  const getNfts = async () => {
    try {
      if (!currentWalletAddress) {
        const id = toast.loading("Creating a Wallet");
        await XRPFunctions.CreateWallet()
          .then((items) => {
            console.log(items);
            setKey(items.wallet.privateKey);
            setCurrentWalletAddress(items.wallet.classicAddress);
            const id2 = toast.success(`Wallet Address Created`);
            setTimeout(() => {
              toast.dismiss(id);
              toast.dismiss(id2);
              setRefreshing(false);
            }, 1000);
          })
      }
      // const id = toast.loading("Getting All Nfts...");

    } catch (e) {
      console.log(e)
      const id = toast.error(`Error Getting All Nfts: ${e}`);
      setTimeout(() => {
        toast.dismiss(id);
        setRefreshing(false);
      }, 1000);
    }


  };

  React.useEffect(() => {
    getNfts();
  }, []);

  const onSelectSwitch = (value: React.SetStateAction<number>) => {
    setHomeTab(value);
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const ListItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", padding: 10 }}>
        <FavorCard item={item} />
        <AcceptButton item={item} navigation={navigation} />
      </View>
    );
  };

  return (
    <SafeAreaView>
      {/* <AcceptModal props={{ modalVisible, setModalVisible }} /> */}
      {homeTab == 1 ? (
        <FlatList
          ListHeaderComponent={
            <View>
              <View
                style={{ marginTop: 40, width: "100%", alignItems: "center" }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    flexDirection: "row",
                    borderColor: "#C6C6C6",
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    margin: 16,
                    width: 350,
                  }}
                >
                  <Feather
                    name="search"
                    width={100}
                    size={20}
                    color="#C6C6C6"
                    style={{ marginRight: 5 }}
                  />
                  <TextInput
                    style={{ color: colors.text }}
                    placeholder="Search"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <HomeScreenHeader navigation={navigation} /> */}
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <CustomSwitch
                    selectionMode={1}
                    option1="Available"
                    option2="Owned"
                    onSelectSwitch={onSelectSwitch}
                  />
                </View>
              </View>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getNfts} />
          }
          // stickyHeaderHiddenOnScroll={false}
          data={nfts}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={ListItem}
          style={{ width: "100%" }}
        />
      ) : null}

      {homeTab == 2 &&
        navigation.navigate("Featured")
      }

      {homeTab == 2 &&
        <View style={{ marginTop: 60, width: "100%", alignItems: "center" }}>
          <CustomSwitch
            selectionMode={2}
            option1="Available"
            option2="Owned"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
      }

      {/* {homeTab == 2 && (
        <View style={{ marginTop: 60, width: "100%", alignItems: "center" }}>
          <CustomSwitch
            selectionMode={2}
            option1="Available Podcasts"
            option2="Owned"
            onSelectSwitch={onSelectSwitch}
          />
          {nfts?.length > 0 && (
            <FlatList
              ListHeaderComponent={
                <View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        flexDirection: "row",
                        borderColor: "#C6C6C6",
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        margin: 16,
                        width: 350,
                      }}
                    >
                      <Feather
                        name="search"
                        width={100}
                        size={20}
                        color="#C6C6C6"
                        style={{ marginRight: 5 }}
                      />
                      <TextInput
                        style={{ color: colors.text }}
                        placeholder="Search"
                      />
                    </View>
                  </View>
                </View>
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={getNfts} />
              }
              // stickyHeaderHiddenOnScroll={false}
              data={nfts}
              keyExtractor={(item, index) => index?.toString()}
              renderItem={ListItem}
              style={{ width: "100%" }}
            />
          )}
        </View>
      )} */}
    </SafeAreaView>
  );
}
