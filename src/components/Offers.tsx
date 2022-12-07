import React, { useState } from "react";
import { View, Image, Alert, Modal, Text, Pressable } from "react-native";
import { styles } from "../constants/style";
import { useTheme } from "@react-navigation/native";
import Comment from "./Comment";

const Offer = (props) => {
  const { colors } = useTheme();
  const [withdrawalModalVisible, setwithdrawalModalVisible] = useState(false);
  const [showWithdrawalPopUp, setshowWithdrawalPopUp] = useState(false);

  const [commentOn, setCommentOn] = useState(false);
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
              {" "}
              {props.service}
            </Text>
          </View>
          <View style={styles.sideBySideFlexStart}>
            <Text style={[{ color: colors.text }, styles.text]}>
              Wallet Address:{" "}
            </Text>
            <Text style={[{ color: colors.text }, styles.text]}>
              {props.walletAddress}
            </Text>
          </View>
          <View style={styles.sideBySideFlexStart}>
            <Text style={[{ color: colors.text }, styles.text]}>Name:</Text>
            <Text style={[{ color: colors.text }, styles.text]}>
              {" "}
              {props.name}
            </Text>
          </View>
        </View>
      </View>
      <Text style={[{ color: colors.text }, styles.text]}>{props.message}</Text>
      <View style={styles.sideBySideCenter}>
        {!showWithdrawalPopUp && !commentOn ? (
          <View style={styles.sideBySideCenter}>
            <View style={styles.button2}>
              <Text
                onPress={() => setshowWithdrawalPopUp(!showWithdrawalPopUp)}
                style={[{ color: colors.text }, styles.buttonText]}
              >
                Accept
              </Text>
            </View>
            <View style={styles.button2}>
              <Text
                onPress={() => setCommentOn(true)}
                style={[
                  { alignSelf: "center", color: colors.text },
                  styles.buttonText,
                ]}
              >
                Comment
              </Text>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>

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
                  You have accepted this favor. Please await confirmation from
                  the volunteer.
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
              Are you sure you want to accept this favor?
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
                <Text style={styles.buttonText}>Accept</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {commentOn ? (
        <View>
          <Comment />
          <View style={[styles.sideBySideCenter]}>
            <View style={styles.button2}>
              <Text
                onPress={() => setCommentOn(!commentOn)}
                style={styles.buttonText}
              >
                Post
              </Text>
            </View>
            <View style={styles.button2}>
              <Text
                onPress={() => setCommentOn(!commentOn)}
                style={styles.buttonText}
              >
                Cancel
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Offer;
