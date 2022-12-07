import { View, Image, Alert, Modal, Text, Pressable } from "react-native";
import { styles } from "../constants/style";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";

const ToDoItem = (props) => {
  const { colors } = useTheme();
  const [withdrawalModalVisible, setwithdrawalModalVisible] = useState(false);
  const [showWithdrawalPopUp, setshowWithdrawalPopUp] = useState(false);

  const [completed, setCompleted] = useState(false);
  const [markCompletedModalVisible, setMarkCompletedModalVisible] =
    useState(false);

  const [showMarkCompletedPopUp, setShowMarkCompletedPopUp] = useState(false);

  return (
    <View
      style={[
        { borderColor: colors.border, color: colors.text },
        styles.container2,
      ]}
    >
      <View style={styles.sideBySideFlexStart}>
        <Image
          source={{
            uri: props.uri,
          }}
          style={styles.profileImage2}
        />
        <View>
          <View style={styles.sideBySideFlexStart}>
            <Text style={[{ color: colors.text }, styles.text]}>Service: </Text>
            <Text style={[{ color: colors.text }, styles.text]}>
              {props.service}
            </Text>
          </View>
          <View style={styles.sideBySideFlexStart}>
            <Text style={[{ color: colors.text }, styles.text]}>
              Wallet Address:
            </Text>
            <Text style={[{ color: colors.text }, styles.text]}>
              {props.walletAddress}
            </Text>
          </View>
          <View style={styles.sideBySideFlexStart}>
            <Text style={[{ color: colors.text }, styles.text]}>Name:</Text>
            <Text style={[{ color: colors.text }, styles.text]}>
              {props.name}
            </Text>
          </View>
          <Text style={[{ color: colors.text }, styles.text]}>
            {props.mess}
          </Text>
        </View>
      </View>

      <Text style={[{ color: colors.text }, styles.text]}>{props.mess}</Text>
      {!showWithdrawalPopUp && !showMarkCompletedPopUp ? (
        <View style={styles.sideBySideCenter}>
          <View style={completed ? styles.button5 : styles.buttonGray}>
            <Text
              onPress={() => {
                setShowMarkCompletedPopUp(true);
              }}
              style={[{ color: colors.text }, styles.text]}
            >
              {completed ? "Mark Incomplete" : "Mark Completed"}
            </Text>
          </View>
          <View style={styles.button5}>
            <Text
              onPress={() => setshowWithdrawalPopUp(!showWithdrawalPopUp)}
              style={[{ color: colors.text }, styles.text2]}
            >
              Withdraw
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}

      {showWithdrawalPopUp ? (
        <View
          style={[
            {
              backgroundColor: colors.border,
              borderColor: colors.border,
              color: colors.text,
              padding: 1,
            },
            styles.centeredView,
          ]}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={withdrawalModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setwithdrawalModalVisible(!withdrawalModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View
                style={[
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                    padding: 1,
                  },
                  styles.modalView,
                ]}
              >
                <Text style={styles.buttonText}>
                  You have withdrawn from this task.
                </Text>
                <Pressable
                  style={[styles.button4]}
                  onPress={() => {
                    setwithdrawalModalVisible(false),
                      setshowWithdrawalPopUp(false);
                  }}
                >
                  <Text style={styles.buttonText}>Okay</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View>
            <Text
              style={[
                {
                  borderColor: colors.border,
                  color: colors.text,
                },
                styles.text,
              ]}
            >
              Are you sure you want to withdraw? This will affect your
              reliability rating.
            </Text>
            <View style={styles.sideBySideCenter}>
              <Pressable
                style={[styles.button, styles.button2]}
                onPress={() => setshowWithdrawalPopUp(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.button2]}
                onPress={() => setwithdrawalModalVisible(true)}
              >
                <Text style={styles.buttonText}>Withdraw</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}

      {showMarkCompletedPopUp ? (
        <View
          style={[
            {
              backgroundColor: colors.border,
              borderColor: colors.border,
              color: colors.text,
              padding: 1,
            },
            styles.centeredView,
          ]}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={markCompletedModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setMarkCompletedModalVisible(!markCompletedModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View
                style={[
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text,
                    padding: 1,
                  },
                  styles.modalView,
                ]}
              >
                <Text style={styles.buttonText}>
                  You have marked this task
                  {completed ? " incomplete" : " complete"}.
                </Text>
                <Pressable
                  style={[styles.button4]}
                  onPress={() => {
                    setCompleted(!completed);
                    setMarkCompletedModalVisible(false);
                    setShowMarkCompletedPopUp(false);
                  }}
                >
                  <Text style={styles.buttonText}>Okay</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View>
            <Text
              style={[
                {
                  borderColor: colors.border,
                  color: colors.text,
                },
                styles.text,
              ]}
            >
              Are you sure you want to mark this task as
              {completed ? " incomplete" : " complete"}? The requester will be
              alerted. You will recieve payment once they coonfirm the recieval
              of the goods and or services.
            </Text>
            <View style={styles.sideBySideCenter}>
              <Pressable
                style={[styles.button, styles.button6]}
                onPress={() => setShowMarkCompletedPopUp(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.button6]}
                onPress={() => setMarkCompletedModalVisible(true)}
              >
                <Text style={styles.buttonText}>
                  {" "}
                  {completed ? "Mark Incomplete" : "Mark Complete"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ToDoItem;
