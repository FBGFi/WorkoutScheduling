import React from "react";
import ReactNative from "react-native";
import Colors from "./styles/colors";
import Dimensions from "./styles/dimensions";
import Fonts from "./styles/fonts";

const App = () => {
  return (
    <ReactNative.View
      style={{ backgroundColor: Colors.primary_background, flex: 1 }}>
      <ReactNative.Text
        style={{
          color: Colors.secondary,
          fontSize: Dimensions.font_large,
          fontFamily: Fonts.Staatliches,
        }}>
        Hi
      </ReactNative.Text>
      <ReactNative.Text
        style={{
          color: Colors.secondary,
          fontSize: Dimensions.font_large,
          fontFamily: Fonts.Titillium,
        }}>
        Hi
      </ReactNative.Text>
      <ReactNative.Text
        style={{
          color: Colors.secondary,
          fontSize: Dimensions.font_large,
          fontFamily: Fonts.Titillium_cursive,
        }}>
        Hi
      </ReactNative.Text>
      <ReactNative.Text
        style={{
          color: Colors.secondary,
          fontSize: Dimensions.font_large,
          fontFamily: Fonts.Titillium_semibold,
        }}>
        Hi
      </ReactNative.Text>
      <ReactNative.Text
        style={{
          color: Colors.secondary,
          fontSize: Dimensions.font_large,
          fontFamily: Fonts.Titillium_bold,
        }}>
        Hi
      </ReactNative.Text>
    </ReactNative.View>
  );
};

export default App;
