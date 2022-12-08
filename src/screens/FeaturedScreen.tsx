import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

const FeaturedScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{  color: colors.text }}>FeaturedScreen</Text>
    </View>
  );
};

export default FeaturedScreen;
