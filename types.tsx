/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParmList extends RootStackParamList {}
    interface AuthParamList extends AuthStackParamList {}
  }
}

export type RootTabParamList = {
  Home:undefined;
  Featured: undefined;
  Mint: undefined;
  Profile: undefined;
  Offers: undefined;
  Payment: undefined;
};

export type AuthNavParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Auth: NavigatorScreenParams<AuthNavParamList> | undefined;
  Settings: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type AuthStackParamList = {
  Auth: NavigatorScreenParams<AuthNavParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;


