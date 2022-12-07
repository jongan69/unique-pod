import React, { useState } from "react";
import { Alert, Pressable } from "react-native";
import { Card, Modal } from "react-native-paper";
import { Text, View } from '../components/Themed';
import Colors from "../constants/Colors";
import { styles } from "../constants/style";
import { AppContext } from "../context/AppProvider";

export const AcceptModal = ({ props }) => {
    const {
        currentWalletAddress,
        key,
    } = React.useContext(AppContext);

    // Accept Favor By passing ID and Wallet
    const AcceptFavor = (id, key) => {

    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
            style={{ zIndex: 20 }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Would you like to Accept the Favor?</Text>
                    <Pressable
                        style={[styles.button, styles.button]}
                        onPress={() => props.setModalVisible(!props.modalVisible)}
                    >
                        <Text style={styles.textStyle}>Accept</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.button]}
                        onPress={() => props.setModalVisible(!props.modalVisible)}
                    >
                        <Text style={styles.textStyle}>Decline</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default AcceptModal;