import React from "react";
import ReactNative from "react-native";
import { CardList } from "./components/Card/CardList";
import Colors from "./styles/colors";

const App = () => {
  const [cards, setCards] = React.useState([
    { id: "1", title: "Card 1" },
    { id: "2", title: "Card 2" },
    { id: "3", title: "Card 3" },
  ]);

  const onConfirmDeletion = (id: string) => {
    setCards(cards.filter((card) => id !== card.id));
  };

  return (
    <ReactNative.View
      style={{ backgroundColor: Colors.primary_background, flex: 1 }}>
      <CardList
        cards={cards}
        swipeDirection="right"
        removeCard={onConfirmDeletion}
        renderContent={(card) => <ReactNative.Text>Testi</ReactNative.Text>}
      />
      {/* {cards.map((cardId, index) => (
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
      ))} */}
      <ReactNative.View
        style={{ borderColor: "#000000", borderWidth: 4, height: 50 }}
      />
    </ReactNative.View>
  );
};

export default App;
