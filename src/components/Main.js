import { StyleSheet, View } from "react-native";
import { React, useState, useEffect, useContext } from "react";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { createConfiguracionToast } from "../configuraciones/configToast";
//Iconos desde react-native-vector-icons
import Icon from "react-native-vector-icons/FontAwesome5";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthContext from "../context/firebaseContext/AuthContext";
//declaro el contexto de firebase
//Instanciar el componente d enavecaion que queremos.
const Stack = createNativeStackNavigator();
//configuracion del Toast
const configToast = createConfiguracionToast();
export default function Main() {
  const { isLogin } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark"></StatusBar>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          {isLogin ? (
            <>
              <Stack.Screen name="Home" component={Home}></Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login}></Stack.Screen>
            </>
          )}
        </Stack.Navigator>
        <Toast config={configToast} />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({});
