import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

const OffersScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Offer Screen</Text>
    </View>
  );
};

export default OffersScreen;
