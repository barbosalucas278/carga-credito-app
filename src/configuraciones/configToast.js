import Toast, {
  BaseToast,
  ErrorToast,
  SuccessToast,
} from "react-native-toast-message";
import { StyleSheet } from "react-native";
import theme from "../theme";
export const createConfiguracionToast = () => {
  return {
    //  Overwrite 'success' type,

    success: (props) => (
      <SuccessToast
        {...props}
        style={stylesToastSuccess.body}
        contentContainerStyle={stylesToastSuccess.contenedor}
        text1Style={stylesToastSuccess.tituloSuccess}
        text2Style={stylesToastSuccess.subTituloSuccess}
      />
    ),
    //  Overwrite 'error' type,

    error: (props) => (
      <ErrorToast
        {...props}
        style={stylesToastError.body}
        contentContainerStyle={stylesToastError.contenedor}
        text1Style={stylesToastError.tituloError}
        text2Style={stylesToastError.subTituloError}
      />
    ),
    warning: (props) => (
      <BaseToast
        style={stylesToastWarning.body}
        {...props}
        contentContainerStyle={stylesToastWarning.contenedor}
        text1Style={stylesToastWarning.tituloWarning}
        text2Style={stylesToastWarning.subTituloWarning}
      />
    ),
    /*
          Or create a completely new type - `tomatoToast`,
          building the layout from scratch.
      
          I can consume any custom `props` I want.
          They will be passed when calling the `show` method (see below)
        */
    // tomatoToast: ({ text1, props }) => (
    //   <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
    //     <Text>{text1}</Text>
    //     <Text>{props.uuid}</Text>
    //   </View>
    // ),
  };
};
const stylesToastError = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 15,
    height: 100,
    backgroundColor: theme.colores.error,
  },
  body: {
    marginBottom: 50,
    height: 100,
  },
  tituloError: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  subTituloError: {
    fontSize: theme.fontSizes.small,
    color: "white",
    fontWeight: theme.fontWeights.bold,
  },
});

const stylesToastSuccess = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 15,
    height: 100,
    backgroundColor: theme.colores.success,
  },
  body: {
    marginBottom: 50,
    height: 100,
  },
  tituloSuccess: { fontSize: theme.fontSizes.body, color: "white" },
  subTituloSuccess: {
    fontSize: theme.fontSizes.small,
  },
});

const stylesToastWarning = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 15,
    height: 100,
    backgroundColor: theme.colores.warning,
  },
  body: {
    marginBottom: 50,
    height: 100,
  },
  tituloWarning: { fontSize: theme.fontSizes.body },
  subTituloWarning: {
    fontSize: theme.fontSizes.small,
  },
});
