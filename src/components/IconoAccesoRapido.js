import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../theme";

function IconoAccesoRapido(props) {
  const { email, password } = props;
  const procesarNombre = (email) => {
    return email.split("@")[0];
  };
  return (
    <TouchableOpacity
      style={styles.contenedorRedondo}
      onPress={() => props.handleClick({ email: email, password: password })}
    >
      <Text style={styles.nombre}>{procesarNombre(email)}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  contenedorRedondo: {
    backgroundColor: theme.colores.secondary,
    borderRadius: 10,
    width: 80,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  nombre: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.font.main,
  },
});
export default IconoAccesoRapido;
