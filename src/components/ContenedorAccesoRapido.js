import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import IconoAccesoRapido from "./IconoAccesoRapido.js";
import theme from "../theme.js";
function ContenedorAccesoRapido(props) {
  const [users, setUsers] = useState([
    { email: "invitado@invitado.com", password: "22222222" },
    { email: "usuario@usuario.com", password: "33333333" },
    { email: "tester@tester.com", password: "55555555" },
  ]);

  return (
    <View style={styles.contenedor}>
      <Text style={{ fontFamily: theme.font.main }}>Acceso Rápido</Text>
      <View style={styles.row}>
        <IconoAccesoRapido
          {...users[0]}
          handleClick={props.onClick}
        ></IconoAccesoRapido>

        <IconoAccesoRapido
          {...users[1]}
          handleClick={props.onClick}
        ></IconoAccesoRapido>

        <IconoAccesoRapido
          {...users[2]}
          handleClick={props.onClick}
        ></IconoAccesoRapido>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default ContenedorAccesoRapido;
