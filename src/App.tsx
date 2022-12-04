import React from "react";
import ReactNative from "react-native";
import { Card } from "./components/Card/Card";
import Colors from "./styles/colors";

const App = () => {
  const [title, setTitle] = React.useState("Card title");
  return (
    <ReactNative.View
      style={{ backgroundColor: Colors.primary_background, flex: 1 }}>
      <Card id="card" title={title} onPress={(id) => setTitle(id)}>
        <ReactNative.Text>Testi</ReactNative.Text>
      </Card>
    </ReactNative.View>
  );
};

export default App;
