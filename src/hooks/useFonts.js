import * as Font from "expo-font";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker";

export default useFonts = async () => {
  await Font.loadAsync({
    PermanentMarker_400Regular: PermanentMarker_400Regular,
  });
};
