import { StyleSheet, Text } from "react-native";
import React from "react";
import theme from "../theme.js";

export default function StyledText({
  children,
  color,
  fontSize,
  fontWeight,
  aling,
  style,
  error,
  ...restOfProps
}) {
  const textStyles = [
    styles.text,
    color === "primary" && styles.colorPrimary,
    color === "secondary" && styles.colorSecondary,
    error && styles.error,
    fontSize === "subHeading" && styles.subHeading,
    fontSize === "heading" && styles.heading,
    fontWeight === "bold" && styles.bold,
    aling === "center" && styles.textAlingCenter,
    { fontFamily: theme.font.main },
    style,
  ];
  return (
    <Text style={textStyles} {...restOfProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colores.text,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  colorPrimary: {
    color: theme.colores.text,
  },
  colorSecondary: {
    color: theme.colores.details2,
  },
  bold: { fontWeight: theme.fontWeights.bold },
  subHeading: {
    fontSize: theme.fontSizes.subHeading,
  },
  heading: {
    fontSize: theme.fontSizes.heading,
  },
  textAlingCenter: {
    textAlign: "center",
  },
  error: {
    color: theme.colores.error,
    fontSize: theme.fontSizes.body,
    marginBottom: 20,
    marginTop: -5,
  },
});
