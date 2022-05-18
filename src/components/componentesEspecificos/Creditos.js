import { StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "../../theme";

export default function Creditos(props) {
  const { creditos } = props;
  return (
    <View>
      <Text style={styles.text}>{creditos}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 200,
    marginBottom: 250,
    fontFamily: theme.font.main,
  },
});
