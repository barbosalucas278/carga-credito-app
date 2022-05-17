import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { React, useContext, useState, useEffect } from "react";
import AuthContext from "../context/firebaseContext/AuthContext";
import theme from "../theme";
import ActionButton from "react-native-action-button";
import { auth } from "../../firebase";
import Scan from "../components/componentesEspecificos/Scan";
import Creditos from "../components/componentesEspecificos/Creditos";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  getUsuarioByEmail,
  resetPuntosUser,
} from "../services/FirestoreServices";

export default function Home({ navigation }) {
  const { logOut } = useContext(AuthContext);
  const [showScan, setShowScan] = useState(false);
  const [showCreditos, setShowCreditos] = useState(true);
  const [puntos, setPuntos] = useState(0);
  const [user, setUser] = useState(null);
  const logout = () => {
    logOut().then(() => navigation.navigate("Login"));
  };
  useEffect(() => {
    getUsuarioByEmail(
      auth.currentUser.email,
      (data) => {
        const respuesta = data.docs.map((doc) => doc.data());
        const { puntos } = respuesta[0];
        setUser(respuesta[0]);
        setPuntos(puntos);
      },
      (error) => {
        Toast.show({
          type: "error",
          text1: error.code,
          position: "bottom",
        });
      }
    );
  }, []);

  const handleIconChangeLanguage = () => {
    return (
      <Image
        source={require("../../assets/menu.png")}
        resizeMode="cover"
        style={styles.imageBtn}
      ></Image>
    );
  };
  const esAdmin = (emailUsario) => {
    if (emailUsario == "admin@admin.com") {
      return true;
    }
    return false;
  };
  const handleReset = () => {
    resetPuntosUser("usuarios", user).then(() => {
      Toast.show({
        type: "success",
        text1: "Sus puntos se han reseteado",
        position: "top",
      });
    });
  };
  const handleCreditos = () => {
    setShowScan(false);
    setShowCreditos(true);
  };
  const handleScan = () => {
    setShowScan(true);
    setShowCreditos(false);
  };
  const handleCreditoCargado = () => {
    handleCreditos();
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        {showScan && (
          <Scan
            esAdmin={esAdmin(auth.currentUser.email)}
            onCreditoCargado={handleCreditoCargado}
            user={user}
          ></Scan>
        )}
        {showCreditos && <Creditos creditos={puntos}></Creditos>}
      </View>
      <ActionButton
        buttonColor="transparent"
        position={"left"}
        degrees={360}
        spacing={30}
        hideShadow
        renderIcon={handleIconChangeLanguage}
        useNativeFeedback={false}
        // style={{ width: "30%" }}
      >
        <ActionButton.Item onPress={logout}>
          <Image
            source={require("../../assets/logout.png")}
            resizeMode="cover"
            style={styles.imageSalir}
          ></Image>
        </ActionButton.Item>
        {esAdmin(auth.currentUser.email) && (
          <ActionButton.Item onPress={handleReset}>
            <Image
              source={require("../../assets/reset.png")}
              resizeMode="cover"
              style={styles.imageSalir}
            ></Image>
          </ActionButton.Item>
        )}

        {showScan && (
          <ActionButton.Item onPress={handleCreditos}>
            <Image
              source={require("../../assets/creditos.png")}
              resizeMode="cover"
              style={styles.imageBtn}
            ></Image>
          </ActionButton.Item>
        )}
        {showCreditos && (
          <ActionButton.Item onPress={handleScan}>
            <Image
              source={require("../../assets/scan.png")}
              resizeMode="cover"
              style={styles.imageBtn}
            ></Image>
          </ActionButton.Item>
        )}
      </ActionButton>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colores.primary,
  },
  btnScreen1: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.5,
    backgroundColor: theme.colores.secondary,
  },
  btnScreen2: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.42,
    backgroundColor: theme.colores.details2,
  },
  btnLogout: {
    position: "relative",
    bottom: 0,
    left: 0,
  },
  imageSalir: {
    width: Dimensions.get("screen").width * 0.165,
    height: Dimensions.get("screen").height * 0.075,
  },
  imageBtn: {
    width: Dimensions.get("screen").width * 0.165,
    height: Dimensions.get("screen").height * 0.075,
  },
});
