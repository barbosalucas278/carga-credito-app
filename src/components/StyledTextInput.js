import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React from "react";
import theme from "../theme";

export default function StyledTextInput({ style = {}, error, size, ...props }) {
  const inputStyle = [
    styles.textInput,
    style,
    error && styles.error,
    size == "large" && styles.large,
    size == "medium" && styles.medium,
  ];
  return <TextInput  style={inputStyle} {...props}></TextInput>;
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colores.details,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: theme.font.main,
  },
  error: {
    borderColor: theme.colores.error,
  },
  large: {
    width:
      Dimensions.get("screen").width / 2 + Dimensions.get("screen").width / 4,
  },
  medium: {
    width:
      Dimensions.get("screen").width / 2 + Dimensions.get("screen").width / 3,
  },
});
