import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const { colors } = useTheme();
  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: 350,
        backgroundColor: colors?.secondary,
        borderRadius: 10,
        borderColor: "#000",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor:
            getSelectionMode == 1 ? colors.primary : colors.secondary,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 1 ? colors.textDark : colors.textLight,
            fontSize: 14,
            fontFamily: "Roboto-Medium",
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor:
            getSelectionMode == 2 ? colors.primary : colors.secondary,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 2 ? colors.textDark : colors.textLight,
            fontSize: 14,
            fontFamily: "Roboto-Medium",
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
