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
  /**
   * Text displayed in the header
   */
  title: string;
  /**
   * Id of the card passed in the callbacks
   */
  id: string;
  /**
   * If used in a list, shift each card up according to their index
   */
  index?: number;
  /**
   * On header press
   */
  onPress?: (id: string) => void;
  /**
   * Swipe callback
   */
  onSwipe: (id: string) => void;
  /**
   * Which way the card is swipable
   */
  swipeDirection: "left" | "right";
  /**
   * To trigger bringing card back to view, simply change this parameter
   */
  forceCardBackToView?: any;
}

/**
 * Card that has animated swipe action with callback called after the swipe is done
 */
export const SwipableCard: React.FC<SwipableCardProps> = ({
  children,
  title,
  id,
  index,
  onPress,
  onSwipe,
  swipeDirection,
  forceCardBackToView,
}) => {
  const screenWidth = ReactNative.Dimensions.get("window").width;
  const offSetMargins = {
    marginLeft: swipeDirection === "right" ? screenWidth : 0,
    marginRight: swipeDirection === "left" ? screenWidth : 0,
  };

  const [elementHeight, setElementHeight] = React.useState(0);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [collapsibleContainerHeight, setCollapsibleContainerHeight] =
    React.useState(0);
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const wrapperRef = React.useRef<ReactNative.View | null>(null);
  const swiperRef = React.useRef<ReactNative.ScrollView | null>(null);
  const scrollAnimationRef = React.useRef(
    new ReactNative.Animated.Value(
      swipeDirection === "right" ? 0 : screenWidth,
    ),
  );

  /**
   * Called when user releases the scroll
   */
  const onScrollEnd = (
    e: ReactNative.NativeSyntheticEvent<ReactNative.NativeScrollEvent>,
  ) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    scrollAnimationRef.current.setValue(xOffset);
    const activationPoint =
      screenWidth * (swipeDirection === "left" ? 0.4 : 0.6);
    const isScrolledOffView =
      (swipeDirection === "left" && xOffset > activationPoint) ||
      (swipeDirection === "right" && xOffset < activationPoint);
    if (isScrolledOffView) {
      scrollOffView(true, true);
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
    if (swipeDirection === "left" && contentOffsetX > 0) {
      opacityFactor = (screenWidth - contentOffsetX) / screenWidth;
    } else if (swipeDirection === "right" && contentOffsetX < screenWidth) {
      opacityFactor = contentOffsetX / screenWidth;
    }
    // Opacityfactor is never quite 1
    if (opacityFactor < 0.99) {
      contentOpacity = contentOpacity * opacityFactor;
    }
    wrapperRef.current?.setNativeProps({
      style: { ...swipableCardStyles.innerWrapper, opacity: contentOpacity },
    });
  };

  /**
   * Scroll the container from off screen to visible
   */
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

  /**
   * Scrolls container out of the view, and calls the onSwipe callback if argument provided
   */
  const scrollOffView = (animated = false, callOnSwipe = false) => {
    if (swiperRef.current) {
      scrollAnimationRef.current.addListener((animation) => {
        console.log(animation.value);
        swiperRef.current?.scrollTo({
          x: animation.value,
          animated: false,
        });
      });
      ReactNative.Animated.timing(scrollAnimationRef.current, {
        toValue: swipeDirection === "left" ? screenWidth : 0,
        duration: animated ? 200 : 0,
        useNativeDriver: true,
        easing: ReactNative.Easing.ease,
      }).start(() => callOnSwipe && onSwipe(id));
    }
  };

  const scrollViewTo = (where: "view" | "out") => {
    if (swiperRef.current) {
      if (where === "view") scrollToView(true);
      if (where === "out") scrollOffView(true);
    }
  };

  // Sets element height according to the header + container height
  React.useEffect(() => {
    if (isCollapsed) {
      setElementHeight(headerHeight);
    } else {
      setElementHeight(headerHeight + collapsibleContainerHeight);
    }
  }, [isCollapsed, headerHeight, collapsibleContainerHeight]);

  // Scroll the element off screen first, then do animated scroll for nice effect
  React.useLayoutEffect(() => {
    scrollOffView();
    scrollViewTo("view");
  }, [swiperRef, screenWidth, swipeDirection, forceCardBackToView]);

  return (
    <ReactNative.View
      style={{
        ...swipableCardStyles.outerWrapper,
        height: elementHeight,
        top: index ? index * -4 : 0,
      }}>
      <ReactNative.View
        ref={wrapperRef}
        style={swipableCardStyles.innerWrapper}>
        <ReactNative.View>
          {/* --- Start of title container --- */}
          <ReactNative.Animated.ScrollView
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
          </ReactNative.Animated.ScrollView>
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
