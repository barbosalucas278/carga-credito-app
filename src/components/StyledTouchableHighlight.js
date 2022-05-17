import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import React from "react";
import theme from "../theme";
export default function StyledTouchableHighlight({
  children,
  onPress,
  color,
  btnLogin,
  btnScreen,
  btnLogout,
  btnVolverHome,
  style,
  ...restOfProps
}) {
  const btnStyles = [
    styles.btn,
    color == "secondary" && styles.secondary,
    color == "primary" && styles.primary,
    btnLogin && styles.btnLogin,
    btnScreen && styles.btnScreen,
    btnLogout && styles.btnLogout,
    btnVolverHome && styles.btnVolverHome,
    style,
  ];
  return (
    <TouchableHighlight onPress={onPress} {...restOfProps}>
      <View style={btnStyles}>
        <Text
          style={[
            { fontFamily: theme.font.main },
            btnScreen && styles.textVotar,
            btnLogout && styles.textVotar,
            btnVolverHome && styles.textVotar,
          ]}
        >
          {children}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnLogin: {
    paddingVertical: 15,
    paddingHorizontal:
      Dimensions.get("screen").width / 2 - Dimensions.get("screen").width / 3,
    borderRadius: 10,
  },
  btnScreen: {
    backgroundColor: "green",
  },
  btnLogout: {
    paddingHorizontal: 30,
    paddingVertical: 24,
    color: "white",
    backgroundColor: "red",
  },
  btnVolverHome: {
    paddingHorizontal: 30,
    paddingVertical: 24,
    backgroundColor: "green",
    width: Dimensions.get("screen").width * 0.3,
    borderBottomEndRadius: 20,
  },
  textVotar: {
    color: "white",
  },
  secondary: {
    color: "#fefefe",
    backgroundColor: theme.colores.secondary,
  },
  primary: {
    color: "#fff",
    backgroundColor: theme.colores.details2,
  },
});
