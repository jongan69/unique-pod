import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../constants/style";
import { useTheme } from "@react-navigation/native";
import CustomSwitch from "../components/CustomSwitch";
import { AppContext } from "../context/AppProvider";
import { toast } from "@backpackapp-io/react-native-toast";
import { Feather } from "@expo/vector-icons";
import * as XRPFunctions from '../../xrpRPC';

export default function HomeScreen({ navigation }) {
  const { nfts, currentWalletAddress, setCurrentWalletAddress, key, setKey, setLastBalance, setSeed, seed, setNfts } =
    React.useContext(AppContext);
  const [homeTab, setHomeTab] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const { colors } = useTheme();


  console.log(
    "WALLET DATA FOR DEV (KEY, ADDRESS)",
    `KEY: ${key}`,
    `Address: ${currentWalletAddress}`
  );


  const getNfts = async () => {
    try {
      if (!currentWalletAddress) {
        const id = toast.loading("Creating a Wallet");
        await XRPFunctions.CreateWallet()
          .then((items) => {
            console.log(items);
            setKey(items.wallet.privateKey);
            setCurrentWalletAddress(items.wallet.classicAddress);
            setLastBalance(items.balance)
            setSeed(items.wallet.seed);
            const id2 = toast.success(`Wallet Address Created`);
            setTimeout(() => {
              toast.dismiss(id);
              toast.dismiss(id2);
              setRefreshing(false);
            }, 1000);
          })
      }

      if (seed) {
        await XRPFunctions.getAllNfts(seed).then((data) => {
          if (data.nfts) {
            setNfts(data.urls),
              console.log(`NFTs found ${data.nfts.result}`);
            const id3 = toast.loading(`Nfts Found: ${data.nfts}`);
            setTimeout(() => {
              toast.dismiss(id3);
              setRefreshing(false);
            }, 1000);
          } else {
            console.log(`No NFTs Found`);
            toast.error(`No Nfts Found: `);
          }
        });
      }
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


  function handleHelpPress(url) {
    WebBrowser.openBrowserAsync(url);
  }


  const ListItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", padding: 10 }}>
        <TouchableOpacity onPress={handleHelpPress(item)}>
          <Text>
            Item
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  
  return (
    <SafeAreaView>
      {homeTab == 1 && (
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
                    option1="Owned"
                    option2="Available"
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
      )}

      {homeTab == 2 &&
        navigation.navigate("Featured")
      }

      {homeTab == 2 &&
        <View>
          <View style={{ marginTop: 60, width: "100%", alignItems: "center" }}>
            <CustomSwitch
              selectionMode={2}
              option1="Owned"
              option2="Available"
              onSelectSwitch={onSelectSwitch}
            />
            <View style={{ alignItems: "center", justifyContent: "center", margin: '20%' }}>
              <Text>
                No Podcasts Available yet!
              </Text>
            </View>
          </View>
        </View>
      }
    </SafeAreaView>
  );
}
