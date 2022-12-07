import React from "react";

import { SafeAreaView, TextInput, View } from "react-native";
import { styles } from "../constants/style";
import { useTheme } from "@react-navigation/native";

const Comment = () => {
  const [text, onChangeText] = React.useState("");
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <View>
        <View
          style={[
            { alignSelf: "center", color: colors.text },
            styles.buttonText,
          ]}
        >
          <TextInput
            style={[
              styles.input2,
              { borderColor: colors.text, color: colors.text },
            ]}
            onChangeText={onChangeText}
            value={text}
            multiline
            placeholder="Comment"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Comment;
