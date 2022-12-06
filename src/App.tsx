import React from "react";
import ReactNative from "react-native";
import Colors from "@styles/colors";
import { WorkOutSchedulesView } from "@views/WorkoutSchedulesView/WorkOutSchedulesView";
import StoreProvider from "@store/store";

const App = () => {
  return (
    <ReactNative.View
      style={{ backgroundColor: Colors.primary_background, flex: 1 }}>
      <StoreProvider>
        <WorkOutSchedulesView />
      </StoreProvider>
    </ReactNative.View>
  );
};

export default App;
