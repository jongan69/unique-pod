import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../constants/style";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../context/AppProvider";


export const Biography = () => {
    const { currentWalletAddress } = React.useContext(AppContext);
    const { colors } = useTheme();
    return (
        <>
            <View>
                <Text style={styles.h2}>Bio:</Text>
            </View>
            <View
                style={[
                    { borderColor: colors.border, color: colors.text },
                    styles.container2,
                ]}
            >
                <Text style={[{ color: colors.text }, styles.text]}>
                    No Bio Set
                </Text>
            </View>
        </>
    )
}