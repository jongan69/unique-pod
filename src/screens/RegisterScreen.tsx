import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Components
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { toast } from '@backpackapp-io/react-native-toast';

// Image Assets
import RegistrationSVG from '../assets/images/misc/registration.svg'
import AppleSVG from '../assets/images/misc/apple.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import CustomButton from '../components/CustomButton';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../context/AppProvider';
import { useNhostClient } from '@nhost/react';



// nHost SDK + Tools
// import Layout from '../constants/Layout'
// import { auth } from '../helpers/nhostSdk';
// const deviceWidth = Layout.window.width;



const RegisterScreen: React.FunctionComponent = ({ navigation }) => {
  const { setCurrentWalletAddress, currentWalletAddress, email, setEmail, password, setPassword, userInfo, setUserInfo, key, setKey } = React.useContext(AppContext);
  const { colors } = useTheme();
  let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const [address, setAddress] = useState<string>("");
  const [secure, setSecure] = useState(true);

  // Setup nhost state
  const nhost = useNhostClient();

  // Use Nhost to sign up user for a Wallet Address from email
  const EmailRegister = async (email: string) => {
    const id = toast.loading('Register by email...', {
      width: 300
    });

    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);

    console.log('Email was: ', email)

    if (email.length < 80 && emailRegex.test(email)) {
      console.log(`Email Entry ${email} was valid`);

      // Use Nhost here to Magic Link Provided email
      const result = await nhost.auth.signUp({ email, password });

      if (!result.error) {
        toast.success('Success!', {
          width: 300
        });
      }


      // Create PopUp Toast to show address
      if (currentWalletAddress) {
        toast.success(`Your Wallet Address is ${currentWalletAddress}`, {
          width: 300
        });
      }

      if (result.error) {
        // Throw error toast
        toast.error(result.error.message)
      } else {
        navigation.navigate("Profile");
      }

      console.log(result);
      setCurrentWalletAddress(address)
    } else {
      // Throw error toast
      toast.error('wtf', {
        width: 300
      })
    }
  }


  const fieldButtonFunction = () => {
    setSecure(!secure);
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <RegistrationSVG
            height={`100%`}
            width={`100%`}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />

        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: colors.textLight,
            marginBottom: 30,
          }}>
          Register
        </Text>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => ProviderRegister("google")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ProviderRegister("apple")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <AppleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ProviderRegister("facebook")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
        </View> */}

        {/* <Text style={{ textAlign: 'center', color: colors.textLight, marginBottom: 30 }}>
          Or, register with email ...
        </Text> */}

        <InputField
          label={'Email'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={(value: string) => setEmail(value)}
        />

        <InputField
          label={'Password'}
          icon={
            <MaterialIcons
              name="lock"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          fieldButtonLabel={
            <MaterialIcons
              name="remove-red-eye"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />}
          inputType="password"
          secure={secure}
          fieldButtonFunction={fieldButtonFunction}
          value={password}
          onChangeText={(value: string) => setPassword(value)}
        />

        <CustomButton label={'Register'} onPress={() => EmailRegister(email)} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{ color: colors.textLight }}>Already registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

