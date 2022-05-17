import { StyleSheet, LogBox } from "react-native";
import { React, useState } from "react";
import Main from "./src/components/Main";
import AnimatedSplash from "react-native-animated-splash-screen";
import SplashAnimado from "./src/components/SplashAnimado";
import useSplashIsLoaded from "./src/hooks/useSplashIsLoaded";
import AuthProvider from "./src/context/firebaseContext/AuthProvider";
import useFonts from "./src/hooks/useFonts";
import AppLoading from "expo-app-loading";
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const { isLoaded } = useSplashIsLoaded();
  const [IsReady, SetIsReady] = useState(false);
  const FontLoading = async () => {
    await useFonts(); // Font is being loaded here
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={FontLoading}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }
  return (
    <AuthProvider>
      <AnimatedSplash
        translucent={true}
        isLoaded={isLoaded}
        backgroundColor="#ffffff"
        customComponent={<SplashAnimado />}
      >
        <Main></Main>
      </AnimatedSplash>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
