import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../constants/style";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../context/AppProvider";


export const Reviews = () => {
    const { currentWalletAddress } =  React.useContext(AppContext);
    const { colors } = useTheme();
    return (
        <>
            <View>
                <Text style={styles.h2}>Reviews:</Text>
            </View>

            <View>
                <View
                    style={[
                        { borderColor: colors.border, color: colors.text },
                        styles.container2,
                    ]}
                >
                    <View style={styles.sideBySideFlexStart}>
                        <Text style={[{ color: colors.text }, styles.text]}>
                            Service:{" "}
                        </Text>
                        <Text style={[{ color: colors.text }, styles.text]}>
                            Example{" "}
                        </Text>
                    </View>
                    <View style={styles.sideBySideFlexStart}>
                        <Text style={[{ color: colors.text }, styles.text]}>
                            Wallet Address:{" "}
                        </Text>
                        <Text style={[{ color: colors.text }, styles.text]}>
                            {currentWalletAddress.slice(0, 5)}...
                            {currentWalletAddress.slice(-4)}
                        </Text>
                    </View>

                    <View style={styles.sideBySideFlexStart}>
                        <Text style={[{ color: colors.text }, styles.text]}>
                            Reviewer:{" "}
                        </Text>
                        <Text style={[{ color: colors.text }, styles.text]}>Example</Text>
                    </View>
                    <Text
                        style={[
                            { borderColor: colors.border, color: colors.text },
                            styles.container2,
                        ]}
                    >
                        EXAMPLE REVIEW
                    </Text>
                </View>
            </View>
        </>
    )
}