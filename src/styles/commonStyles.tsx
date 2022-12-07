import ReactNative from "react-native";
import Colors from "./colors";
import Dimensions from "./dimensions";
import Fonts from "./fonts";

export const CommonStyles = ReactNative.StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: Colors.secondary_background,
    paddingVertical: Dimensions.whitespace_small,
    paddingHorizontal: Dimensions.whitespace_medium,
  },
  title: {
    color: Colors.secondary,
    fontSize: Dimensions.font_large,
    fontFamily: Fonts.Staatliches,
  },
});

export default CommonStyles;
