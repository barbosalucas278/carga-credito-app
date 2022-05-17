import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Formik, useFormikContext } from "formik";
import { loginValidationSchema } from "../validationSchemas/login";
import FormikInputValue from "../components/FormikInputValud";
import StyledText from "../components/StyledText";
import StyledTouchableHighlight from "../components/StyledTouchableHighlight";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import theme from "../theme";
import AuthContext from "../context/firebaseContext/AuthContext";
import ContenedorAccesoRapido from "../components/ContenedorAccesoRapido";
const initialValues = {
  email: "",
  password: "",
};
let resetPresForm = {};
const ResettingForm = () => {
  const { resetForm } = useFormikContext();
  resetPresForm = resetForm;
  return null;
};
export default function Login({ navigation }) {
  const { logIn, isLogin, setIsLogin } = useContext(AuthContext);
  const [spinner, showSpinner] = useState(false);
  const [formulario, showFormulario] = useState(true);
  useEffect(() => {
    let cancel = false;
    if (isLogin) {
      if (cancel) return;
      setIsLogin(true);
      navigation.navigate("Home");
    }
    return () => {
      cancel = true;
    };
  }, [isLogin]);

  const onLogin = (userValues) => {
    const { email, password } = userValues;
    Keyboard.dismiss();
    showFormulario(false);
    showSpinner(true);
    logIn(email, password)
      .then(() => {
        setTimeout(() => {
          showFormulario(true);
          showSpinner(false);
          resetPresForm(); //reseteo el form
        }, 1000);
        navigation.navigate("Home");
      })
      .catch((error) => {
        showFormulario(true);
        showSpinner(false);
        Toast.show({
          type: "error",
          text1: "Ha ocurrido un error",
          text2: error,
          position: "bottom",
        });
      });
  };
  const handleClickRapido = (user) => {
    onLogin(user);
  };
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={onLogin}
      validateOnBlur
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.contenedor2}>
              <View style={styles.contenedorLogoEmpresa}>
                <Image
                  resizeMode="contain"
                  style={{ width: 100, height: 100 }}
                  source={require("../../assets/icon.png")}
                ></Image>
                <StyledText
                  fontSize="heading"
                  aling="center"
                  style={{ fontFamily: theme.font.main }}
                >
                  Carga
                </StyledText>
                <StyledText fontSize="heading" aling="center">
                  de Crédito
                </StyledText>
              </View>
              {formulario && (
                <View style={styles.contenedor}>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <View style={styles.contenedorForm}>
                      <FormikInputValue
                        placeholder="Email"
                        name="email"
                        keyboardType="email-address"
                        size="large"
                      ></FormikInputValue>
                      <FormikInputValue
                        placeholder="Password"
                        name="password"
                        secureTextEntry
                        size="large"
                      ></FormikInputValue>
                      <StyledTouchableHighlight
                        color="secondary"
                        onPress={handleSubmit}
                        btnLogin
                      >
                        Iniciar Sesión
                      </StyledTouchableHighlight>
                      <ResettingForm />
                    </View>
                  </KeyboardAvoidingView>
                  <ContenedorAccesoRapido
                    onClick={handleClickRapido}
                  ></ContenedorAccesoRapido>
                </View>
              )}
              {spinner && (
                <View style={styles.contenedor}>
                  <ActivityIndicator size={180} color={theme.colores.details} />
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contenedor2: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.colores.primary,
  },
  contenedorLogoEmpresa: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  contenedorForm: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 300,
    marginTop: -100,
  },
  contenedorSpinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
