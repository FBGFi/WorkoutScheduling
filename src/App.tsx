import React from "react";
import ReactNative from "react-native";
import Colors from "./styles/colors";
import Dimensions from "./styles/dimensions";

const App = () => {
  return (
    <ReactNative.View
      style={{ backgroundColor: Colors.primary_background, flex: 1 }}>
      <ReactNative.Text
        style={{ color: Colors.secondary, fontSize: Dimensions.font_small }}>
        Hi
      </ReactNative.Text>
      <ReactNative.Text
        style={{ color: Colors.secondary, fontSize: Dimensions.font_regular }}>
        Hi
      </ReactNative.Text>
      <ReactNative.Text
        style={{ color: Colors.secondary, fontSize: Dimensions.font_large }}>
        Hi
      </ReactNative.Text>
    </ReactNative.View>
  );
};

export default App;
