import Colors from "@styles/colors";
import Dimensions from "@styles/dimensions";
import Fonts from "@styles/fonts";
import React from "react";
import ReactNative from "react-native";

const buttonStyles = ReactNative.StyleSheet.create({
  wrapper: {
    paddingVertical: Dimensions.whitespace_vertical,
    paddingHorizontal: Dimensions.whitespace_horizontal,
  },
  text: {
    color: "#FFFFFF",
    fontSize: Dimensions.font_small,
    fontFamily: Fonts.Titillium_semibold,
    textAlign: "center",
  },
});

interface ButtonProps {
  title: string;
  type: "cancel" | "confirm";
  onPress: () => void;
  style?: ReactNative.StyleProp<ReactNative.ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type,
  onPress,
  style,
}) => {
  return (
    <ReactNative.TouchableNativeFeedback onPress={onPress}>
      <ReactNative.View
        style={[
          buttonStyles.wrapper,
          {
            backgroundColor:
              type === "cancel" ? Colors.secondary : Colors.primary,
          },
          style,
        ]}>
        <ReactNative.Text style={buttonStyles.text}>{title}</ReactNative.Text>
      </ReactNative.View>
    </ReactNative.TouchableNativeFeedback>
  );
};
