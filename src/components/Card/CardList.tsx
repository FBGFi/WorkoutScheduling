import React from "react";
import ReactNative from "react-native";
import Dimensions from "@styles/dimensions";
import { onDeleteItem } from "@utils/utils";
import { CardItem } from "@utils/types";
import { SwipableCard } from "./SwipableCard";

interface CardListProps {
  cards: CardItem[];
  swipeDirection: "left" | "right";
  removeCard: (id: string) => void;
  renderContent?: (card: CardItem) => React.ReactNode;
  onCardPress?: (id: string) => void;
}

/**
 * Wrapper for lists of cards
 */
export const CardList: React.FC<CardListProps> = ({
  cards,
  swipeDirection,
  removeCard,
  renderContent,
  onCardPress,
}) => {
  const [cancelWasPressed, setCancelWasPressed] = React.useState(false);

  return (
    <ReactNative.View
      style={{
        marginBottom: -Dimensions.border_width * ((cards.length || 1) - 1),
      }}>
      {cards.map((card, index) => (
        <SwipableCard
          key={card.id}
          id={card.id}
          index={index}
          swipeDirection={swipeDirection}
          title={card.title}
          forceCardBackToView={cancelWasPressed}
          onPress={onCardPress}
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
