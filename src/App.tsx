import React from "react";
import ReactNative from "react-native";
import { SwipableCard } from "./components/Card/SwipableCard";
import Colors from "./styles/colors";

const App = () => {
  const [cards, setCards] = React.useState(["1", "2", "3"]);
  return (
    <ReactNative.View
      style={{ backgroundColor: Colors.primary_background, flex: 1 }}>
      {cards.map((cardId, index) => (
        <SwipableCard
          key={cardId}
          id={cardId}
          index={index}
          swipeDirection="right"
          title={`Card title ${cardId}`}
          onPress={(id) => console.log(id)}
          onSwipe={(i) => setCards(cards.filter((id) => id !== i))}>
          <ReactNative.Text>Testi</ReactNative.Text>
        </SwipableCard>
      ))}
    </ReactNative.View>
  );
};

export default App;
