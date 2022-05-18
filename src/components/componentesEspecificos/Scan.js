import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Constants from "expo-constants";
import { updatePuntosUser } from "../../services/FirestoreServices";
import theme from "../../theme";

export default function Scanner(props) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { esAdmin, user } = props;
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [isFocused]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    let hash = data.trim();
    let qrNumber;

    switch (hash) {
      case "8c95def646b6127282ed50454b73240300dccabc":
        qrNumber = 10;
        break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172":
        qrNumber = 50;
        break;
      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
        qrNumber = 100;
        break;
      default:
        qrNumber = 0;
        break;
    }
    validateBarCode(qrNumber);
  };

  const validateBarCode = (qrNumber) => {
    let hayError = false;
    if (qrNumber === 0) {
      Toast.show({
        type: "error",
        text1: "Código inválido",
        position: "bottom",
      });
    } else {
      if (esAdmin) {
        if (qrNumber === 10) {
          if (user.acum < 2) {
            user.acum++;
            user.puntos += 10;
            hayError = false;
          } else {
            hayError = true;
          }
        }

        if (qrNumber === 50) {
          if (user.acum2 < 2) {
            user.acum2++;
            user.puntos += 50;
            hayError = false;
          } else {
            hayError = true;
          }
        }

        if (qrNumber === 100) {
          if (user.acum3 < 2) {
            user.acum3++;
            user.puntos += 100;
            hayError = false;
          } else {
            hayError = true;
          }
        }
      } else {
        if (qrNumber === 10) {
          if (user.acum < 1) {
            user.acum++;
            user.puntos += 10;
            hayError = false;
          } else {
            hayError = true;
          }
        }

        if (qrNumber === 50) {
          if (user.acum2 < 1) {
            user.acum2++;
            user.puntos += 50;
            hayError = false;
          } else {
            hayError = true;
          }
        }

        if (qrNumber === 100) {
          if (user.acum3 < 1) {
            user.acum3++;
            user.puntos += 100;
            hayError = false;
          } else {
            hayError = true;
          }
        }
      }
      updateCreditScore();
    }

    if (!hayError && qrNumber !== 0) {
      Toast.show({
        type: "success",
        text1: "Éxito!",
        position: "bottom",
      });
      props.onCreditoCargado();
    }
    if (hayError && qrNumber !== 0) {
      Toast.show({
        type: "error",
        text1: "No podes acumular más de éste crédito",
        position: "bottom",
      });
    }
  };

  const updateCreditScore = () => {
    updatePuntosUser("usuarios", user);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.containerScanner}>
        <ActivityIndicator size={180} color={theme.colores.details} />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <Text>La aplicación no tiene acceso a la camara de su dispositivo.</Text>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <View style={styles.containerScanner}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.wrapper}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        {scanned && (
          <Button
            color="green"
            title={"Volver a scannear"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "black",
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
  },
  containerScanner: {
    // backgroundColor: "black",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.8,
  },
  wrapper: {
    // backgroundColor: "black",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.83,
  },
  bottomWrapper: {
    backgroundColor: "#212842",
    height: Dimensions.get("screen").height * 0.12,
  },
  buttonContainer: {
    marginTop: Constants.statusBarHeight,
    alignItems: "flex-end",
    // justifyContent: "center",
    // backgroundColor: "#212842",
    height: Dimensions.get("screen").height * 0.3,
  },
});
