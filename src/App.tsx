import React from "react";
import ReactNative from "react-native";
import { SwipableCard } from "./components/Card/SwipableCard";
import Colors from "./styles/colors";
import { onDeleteItem } from "./utils/utils";

const App = () => {
  const [cancelWasPressed, setCancelWasPressed] = React.useState(false);
  const [cards, setCards] = React.useState(["1", "2", "3"]);

  const onConfirmDeletion = (id: string) => {
    setCards(cards.filter((cardId) => id !== cardId));
  };

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
          forceCardBackToView={cancelWasPressed}
          onPress={(id) => console.log(id)}
          onSwipe={(id) =>
            onDeleteItem(
              () => onConfirmDeletion(id),
              () => setCancelWasPressed(!cancelWasPressed),
            )
          }>
          <ReactNative.Text>Testi</ReactNative.Text>
        </SwipableCard>
      ))}
    </ReactNative.View>
  );
};

export default App;
