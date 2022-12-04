import React from "react";
import ReactNative from "react-native";
import Colors from "../../styles/colors";
import Dimensions from "../../styles/dimensions";
import Fonts from "../../styles/fonts";

const expandButtonStyles = ReactNative.StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.secondary,
    height: 40,
    width: 40,
    borderRadius: 20,
    marginTop: "auto",
    marginBottom: "auto",
  },
  icon: {
    fontSize: 40,
    margin: "auto",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

interface ExpandButtonProps {
  onPress: () => void;
  isCollapsed: boolean;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({
  onPress,
  isCollapsed,
}) => {
  return (
    <ReactNative.TouchableHighlight onPress={onPress}>
      <ReactNative.View style={expandButtonStyles.wrapper}>
        <ReactNative.Text style={expandButtonStyles.icon}>
          {isCollapsed ? "<" : "^"}
        </ReactNative.Text>
      </ReactNative.View>
    </ReactNative.TouchableHighlight>
  );
};

const swipableButtonStyles = ReactNative.StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: ReactNative.Dimensions.get("window").width,
    position: "absolute",
  },
  container: {
    flexDirection: "row",
    width: ReactNative.Dimensions.get("window").width,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 4,
    borderColor: Colors.secondary,
  },
});

interface SwipableButtonProps extends React.PropsWithChildren {
  onPress: () => void;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  swipeDirection: "left" | "right";
}

const SwipableButton: React.FC<SwipableButtonProps> = ({
  children,
  onPress,
  onSwipeRight,
  onSwipeLeft,
  swipeDirection,
}) => {
  const swiperRef = React.useRef<ReactNative.ScrollView | null>(null);

  const onScrollEnd = (
    e: ReactNative.NativeSyntheticEvent<ReactNative.NativeScrollEvent>,
  ) => {
    if (!swiperRef.current) return;
    const xOffset = e.nativeEvent.contentOffset.x;
    const screenWidth = ReactNative.Dimensions.get("window").width;
    // Scroll to right
    if (xOffset >= screenWidth * 0.3 || xOffset > screenWidth * 0.7) {
      onSwipeRight && onSwipeRight();
    } else {
      swiperRef.current.scrollTo({ y: 0, x: 0, animated: true });
    }
  };

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.scrollTo({
        x: ReactNative.Dimensions.get("window").width * 2,
        animated: false,
      });
    }
  }, [swiperRef]);

  return (
    <ReactNative.View style={swipableButtonStyles.wrapper}>
      <ReactNative.ScrollView
        horizontal
        disableIntervalMomentum={true}
        showsHorizontalScrollIndicator={true}
        decelerationRate={0.3}
        ref={swiperRef}
        onScrollEndDrag={onScrollEnd}
        onMomentumScrollEnd={() => {}}
        contentContainerStyle={{
          width: ReactNative.Dimensions.get("window").width * 2,
        }}>
        <ReactNative.TouchableOpacity onPress={onPress}>
          <ReactNative.View
            style={{
              ...swipableButtonStyles.container,
              marginLeft:
                swipeDirection === "right"
                  ? ReactNative.Dimensions.get("window").width
                  : 0,
              marginRight:
                swipeDirection === "left"
                  ? ReactNative.Dimensions.get("window").width
                  : 0,
            }}>
            {children}
          </ReactNative.View>
        </ReactNative.TouchableOpacity>
      </ReactNative.ScrollView>
    </ReactNative.View>
  );
};

const cardStyles = ReactNative.StyleSheet.create({
  wrapper: {
    position: "relative",
    // borderWidth: 4,
    // borderColor: Colors.secondary,
  },
  collapsibleContainer: {
    borderTopWidth: 4,
    borderColor: Colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: Colors.secondary,
    fontSize: Dimensions.font_large,
    fontFamily: Fonts.Staatliches,
    flex: 1,
  },
});

interface CardProps extends React.PropsWithChildren {
  title: string;
  id: string;
  onPress: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ children, title, id, onPress }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <ReactNative.View style={cardStyles.wrapper}>
      {/* --- Start of button --- */}
      <SwipableButton
        swipeDirection="right"
        onPress={() => onPress(id)}
        onSwipeRight={() => console.log("swiperino")}>
        <ReactNative.Text style={cardStyles.title}>{title}</ReactNative.Text>
        {children && (
          <ExpandButton
            onPress={() => setIsCollapsed(!isCollapsed)}
            isCollapsed={isCollapsed}
          />
        )}
      </SwipableButton>
      {/* --- End of button --- */}

      {/* --- Start of collapsible container --- */}
      {children && !isCollapsed && (
        <ReactNative.View style={cardStyles.collapsibleContainer}>
          {children}
        </ReactNative.View>
      )}
      {/* --- End of collapsible container --- */}
    </ReactNative.View>
  );
};
