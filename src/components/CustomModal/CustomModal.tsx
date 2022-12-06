import React from "react";
import ReactNative from "react-native";
import Colors from "@styles/colors";
import CommonStyles from "@styles/commonStyles";
import Dimensions from "@styles/dimensions";

const screenWidth = ReactNative.Dimensions.get("window").width;

const customModalStyles = ReactNative.StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.primary_background,
    width: screenWidth,
    marginLeft: screenWidth,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.secondary_background,
    paddingVertical: Dimensions.whitespace_small,
    paddingHorizontal: Dimensions.whitespace_medium,
  },
  title: {
    ...CommonStyles.title,
    flex: 1,
  },
  contentContainer: {
    paddingVertical: Dimensions.whitespace_small,
    paddingHorizontal: Dimensions.whitespace_medium,
  },
});

interface CustomModalProps extends React.PropsWithChildren {
  title: string;
  closeModal: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  children,
  closeModal,
}) => {
  const scrollAnimationRef = React.useRef(
    new ReactNative.Animated.Value(screenWidth),
  );
  const swiperRef = React.useRef<ReactNative.ScrollView | null>(null);

  /**
   * Called when user releases the scroll
   */
  const onScrollEnd = (
    e: ReactNative.NativeSyntheticEvent<ReactNative.NativeScrollEvent>,
  ) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    scrollAnimationRef.current.setValue(xOffset);
    const activationPoint = screenWidth * 0.4;
    const isScrolledOffView = xOffset < activationPoint;
    if (isScrolledOffView) {
      scrollOffView(true);
    } else {
      scrollToView();
    }
  };

  /**
   * Scroll the container from off screen to visible
   */
  const scrollToView = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollToEnd({
        animated: true,
      });
    }
  };

  /**
   * Scrolls container out of the view, and calls the setModal callback if argument provided
   */
  const scrollOffView = (callOnSwipe = false) => {
    if (swiperRef.current) {
      scrollAnimationRef.current.addListener((animation) => {
        swiperRef.current?.scrollTo({
          x: animation.value,
          animated: false,
        });
      });
      ReactNative.Animated.timing(scrollAnimationRef.current, {
        toValue: 0,
        duration: callOnSwipe ? 200 : 0,
        useNativeDriver: true,
        easing: ReactNative.Easing.ease,
      }).start(() => callOnSwipe && closeModal());
    }
  };

  return (
    <ReactNative.Modal transparent onRequestClose={() => scrollOffView(true)}>
      <ReactNative.Animated.ScrollView
        horizontal
        disableIntervalMomentum={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.3}
        ref={swiperRef}
        onLayout={() => scrollToView()}
        onScrollEndDrag={onScrollEnd}
        onMomentumScrollEnd={() => {}}
        contentContainerStyle={{
          width: screenWidth * 2,
        }}>
        <ReactNative.View style={customModalStyles.wrapper}>
          {/* --- Header start --- */}
          <ReactNative.View style={customModalStyles.header}>
            <ReactNative.Text style={customModalStyles.title}>
              {title}
            </ReactNative.Text>
            <ReactNative.TouchableOpacity onPress={() => scrollOffView(true)}>
              <ReactNative.Text style={CommonStyles.title}>X</ReactNative.Text>
            </ReactNative.TouchableOpacity>
          </ReactNative.View>
          {/* --- Header end --- */}

          {/* --- Container start --- */}
          <ReactNative.View style={customModalStyles.contentContainer}>
            {children}
          </ReactNative.View>
          {/* --- Container end --- */}
        </ReactNative.View>
      </ReactNative.Animated.ScrollView>
    </ReactNative.Modal>
  );
};
