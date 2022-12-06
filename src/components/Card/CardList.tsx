import React from "react";
import ReactNative from "react-native";
import Dimensions from "@styles/dimensions";
import { onDeleteItem } from "@utils/utils";
import { SwipableCard } from "./SwipableCard";
import { CardItem } from "./types";

interface CardListProps {
  cards: CardItem[];
  swipeDirection: "left" | "right";
  removeCard: (id: string) => void;
  renderContent?: (card: CardItem) => React.ReactNode;
}

/**
 * Wrapper for lists of cards
 */
export const CardList: React.FC<CardListProps> = ({
  cards,
  swipeDirection,
  removeCard,
  renderContent,
}) => {
  const [cancelWasPressed, setCancelWasPressed] = React.useState(false);

  return (
    <ReactNative.View
      style={{ marginBottom: -Dimensions.border_width * (cards.length - 1) }}>
      {cards.map((card, index) => (
        <SwipableCard
          key={card.id}
          id={card.id}
          index={index}
          swipeDirection={swipeDirection}
          title={card.title}
          forceCardBackToView={cancelWasPressed}
          onPress={(id) => console.log(id)}
          onSwipe={(id) =>
            onDeleteItem(
              () => removeCard(id),
              () => setCancelWasPressed(!cancelWasPressed),
            )
          }>
          {renderContent && renderContent(card)}
        </SwipableCard>
      ))}
    </ReactNative.View>
  );
};
