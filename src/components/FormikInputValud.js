import { StyleSheet } from "react-native";
import React from "react";
import { useField } from "formik";
import StyledTextInput from "../components/StyledTextInput";
import StyledText from "../components/StyledText";

export default function FormikInputValue({ name, ...props }) {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <StyledTextInput
        error={meta.error}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        {...props}
      ></StyledTextInput>
      {meta.error && (
        <StyledText error style={styles.error}>
          {meta.error}
        </StyledText>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
