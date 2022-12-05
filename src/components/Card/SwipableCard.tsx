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
    <ReactNative.TouchableWithoutFeedback onPress={onPress}>
      <ReactNative.View style={expandButtonStyles.wrapper}>
        <ReactNative.Text style={expandButtonStyles.icon}>
          {isCollapsed ? "<" : "^"}
        </ReactNative.Text>
      </ReactNative.View>
    </ReactNative.TouchableWithoutFeedback>
  );
};

const swipableCardStyles = ReactNative.StyleSheet.create({
  outerWrapper: {
    position: "relative",
  },
  innerWrapper: {
    flexDirection: "row",
    width: ReactNative.Dimensions.get("window").width,
    position: "absolute",
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: Colors.secondary_background,
    width: ReactNative.Dimensions.get("window").width,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 4,
    borderColor: Colors.secondary,
  },
  collapsibleContainer: {
    backgroundColor: Colors.primary_background,
    width: ReactNative.Dimensions.get("window").width,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
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

interface SwipableCardProps extends React.PropsWithChildren {
  title: string;
  id: string;
  onPress?: (id: string) => void;
  onSwipe: (id: string) => void;
  swipeDirection: "left" | "right";
  showTopBorder?: boolean;
}

export const SwipableCard: React.FC<SwipableCardProps> = ({
  children,
  title,
  id,
  onPress,
  onSwipe,
  swipeDirection,
  showTopBorder = true,
}) => {
  const [elementHeight, setElementHeight] = React.useState(0);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [collapsibleContainerHeight, setCollapsibleContainerHeight] =
    React.useState(0);
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const screenWidth = ReactNative.Dimensions.get("window").width;
  const wrapperRef = React.useRef<ReactNative.View | null>(null);
  const swiperRef = React.useRef<ReactNative.ScrollView | null>(null);
  const offSetMargins = {
    marginLeft: swipeDirection === "right" ? screenWidth : 0,
    marginRight: swipeDirection === "left" ? screenWidth : 0,
  };

  const onScrollEnd = (
    e: ReactNative.NativeSyntheticEvent<ReactNative.NativeScrollEvent>,
  ) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    const activationPoint =
      screenWidth * (swipeDirection === "left" ? 0.4 : 0.6);
    const isScrolledOffView =
      (swipeDirection === "left" && xOffset > activationPoint) ||
      (swipeDirection === "right" && xOffset < activationPoint);
    if (isScrolledOffView) {
      scrollOffView(true);
      setTimeout(() => onSwipe(id), 1);
    } else {
      scrollToView(true);
    }
  };

  /**
   * Modify view opacity when scrolling in or out of the view
   */
  const onScroll = (
    e: ReactNative.NativeSyntheticEvent<ReactNative.NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    let contentOpacity = 1;
    let opacityFactor = 1;
    // was swiped to left, not taking into account the bounce scrolling over the boundaries
    if (swipeDirection === "left" && contentOffsetX > 0) {
      opacityFactor = (screenWidth - contentOffsetX) / screenWidth;
    } else if (swipeDirection === "right" && contentOffsetX < screenWidth) {
      opacityFactor = contentOffsetX / screenWidth;
    }
    if (opacityFactor < 0.99) {
      contentOpacity = contentOpacity * opacityFactor;
    }
    wrapperRef.current?.setNativeProps({
      style: { ...swipableCardStyles.innerWrapper, opacity: contentOpacity },
    });
  };

  const scrollToView = (animated = false) => {
    if (swiperRef.current) {
      if (swipeDirection === "right") {
        swiperRef.current.scrollToEnd({
          animated,
        });
      } else {
        swiperRef.current.scrollTo({
          x: 0,
          animated,
        });
      }
    }
  };

  const scrollOffView = (animated = false) => {
    if (swiperRef.current) {
      if (swipeDirection === "left") {
        swiperRef.current.scrollToEnd({
          animated,
        });
      } else {
        swiperRef.current.scrollTo({
          x: 0,
          animated,
        });
      }
    }
  };

  const scrollViewTo = (where: "view" | "out") => {
    if (swiperRef.current) {
      if (where === "view") scrollToView(true);
      if (where === "out") scrollOffView(true);
    }
  };

  React.useEffect(() => {
    if (isCollapsed) {
      setElementHeight(headerHeight);
    } else {
      setElementHeight(headerHeight + collapsibleContainerHeight);
    }
  }, [isCollapsed, headerHeight, collapsibleContainerHeight]);

  React.useLayoutEffect(() => {
    // Scroll the element off screen first, then do animated scroll for nice effect
    scrollOffView();
    scrollViewTo("view");
  }, [swiperRef, screenWidth, swipeDirection]);

  return (
    <ReactNative.View
      style={{
        ...swipableCardStyles.outerWrapper,
        height: elementHeight,
      }}>
      <ReactNative.View
        ref={wrapperRef}
        style={swipableCardStyles.innerWrapper}>
        <ReactNative.View>
          {/* --- Start of title container --- */}
          <ReactNative.ScrollView
            horizontal
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.3}
            ref={swiperRef}
            onScroll={onScroll}
            onScrollEndDrag={onScrollEnd}
            onMomentumScrollEnd={() => {}}
            contentContainerStyle={{
              width: screenWidth * 2,
            }}>
            <ReactNative.TouchableOpacity
              touchSoundDisabled={!onPress}
              activeOpacity={onPress ? 0.7 : 1}
              onPress={() => onPress && onPress(id)}>
              <ReactNative.View
                style={{
                  ...swipableCardStyles.headerContainer,
                  ...offSetMargins,
                  borderTopWidth: showTopBorder ? 4 : 0,
                }}
                onLayout={(e) => {
                  const { height } = e.nativeEvent.layout;
                  setHeaderHeight(height);
                }}>
                <ReactNative.Text style={swipableCardStyles.title}>
                  {title}
                </ReactNative.Text>
                {children && (
                  <ExpandButton
                    onPress={() => setIsCollapsed(!isCollapsed)}
                    isCollapsed={isCollapsed}
                  />
                )}
              </ReactNative.View>
            </ReactNative.TouchableOpacity>
          </ReactNative.ScrollView>
          {/* --- End of title container --- */}

          {/* --- Start of collapsible container --- */}
          {children && !isCollapsed && (
            <ReactNative.View
              style={swipableCardStyles.collapsibleContainer}
              onLayout={(e) => {
                const { height } = e.nativeEvent.layout;
                setCollapsibleContainerHeight(height);
              }}>
              {children}
            </ReactNative.View>
          )}
          {/* --- End of collapsible container --- */}
        </ReactNative.View>
      </ReactNative.View>
    </ReactNative.View>
  );
};
