import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as WebBrowser from "expo-web-browser";

// Theme
import { useTheme } from "@react-navigation/native";
import Constants, { AppOwnership } from "expo-constants";

// Components
import { toast } from "@backpackapp-io/react-native-toast";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

// Image Assets
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoginSVG from "../assets/images/misc/login.svg";
import AppleSVG from "../assets/images/misc/apple.svg";
import GoogleSVG from "../assets/images/misc/google.svg";
import FacebookSVG from "../assets/images/misc/facebook.svg";
// import CoinbaseSVG from '../assets/images/misc/coinbase.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';


// Email -> Key -> Address
import { AppContext } from "../context/AppProvider";
import { useNhostClient } from "@nhost/react";

const LoginScreen = ({ navigation }) => {
  const {
    setCurrentWalletAddress,
    currentWalletAddress,
    email,
    setEmail,
    key,
    setKey,
    userInfo,
    setUserInfo,
    setLoggedin
  } = React.useContext(AppContext);
  const [address, setAddress] = useState<string>("");
  let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const { colors } = useTheme();
  const nhost = useNhostClient();


  const Login = async (Provider: string) => {
    const id = toast.loading("Logging in...");
    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);
  };

  // Use Default Passwordless email sign in
  const DefaultLogin = async (email: string) => {
    console.log("Email was: ", email);

    if (email.length < 80 && emailRegex.test(email)) {
      console.log(
        `Email ${address} was valid, call async or create user in DB: `
      );

      try {
        nhost.auth
          .signIn({ email })
          .then(() => {
            const id = toast.loading("Check your email...");
            setTimeout(() => {
              toast.dismiss(id);
            }, 3000);
          });
        toast.success("Logging in with email");
      } catch {
        toast.error("There was an error saving your account!");
      }
    };

  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <KeyboardAwareScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <LoginSVG
              height={300}
              width={300}
              style={{ transform: [{ rotate: "-5deg" }] }}
            />
          </View>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: colors.text,
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          <InputField
            label={"Email ID"}
            icon={<MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }} />}
            keyboardType="email-address"
            value={email}
            onChangeText={(value: string) => setEmail(value)} inputType={undefined} fieldButtonLabel={undefined} fieldButtonFunction={undefined} />

          {/* <InputField
          label={error ? 'Error Please Try again' : 'Wallet Address'}
          icon={<Ionicons
            name="wallet"
            size={20}
            color={colors.primary}
            style={{ marginRight: 5 }} />}
          value={address}
          onChangeText={(value: string) => setAddress(value)}
          inputType="wallet"
          keyboardType={undefined} /> */}

          <CustomButton
            label={"Login"}
            onPress={() => {
              DefaultLogin(email);
            }}
          />

          {/* <Text
            style={{
              textAlign: "center",
              color: colors.text,
              marginBottom: 30,
            }}
          >
            Or, login with ...
          </Text> */}

          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => { }}
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <GoogleSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { }}
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <AppleSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { }}
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <FacebookSVG height={24} width={24} />
            </TouchableOpacity>
          </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: colors.text,
              }}
            >
              New to the app?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}> Register </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity onPress={() => setLoggedin('guest')}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}> Continue as Guest </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
