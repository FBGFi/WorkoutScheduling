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

const cardStyles = ReactNative.StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.secondary,
  },
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
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

  const onPressIn = (e: any) => {
    console.log("onPressIn", e);
  };

  const onPressOut = (e: any) => {
    console.log("onPressOut", e);
  };

  const onLongPress = (e: any) => {
    console.log("onLongPress", e);
  };

  return (
    <ReactNative.View style={cardStyles.container}>
      {/* --- Start of button --- */}
      <ReactNative.TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}>
        <ReactNative.View style={cardStyles.wrapper}>
          <ReactNative.Text style={cardStyles.title}>{title}</ReactNative.Text>
          {children && (
            <ExpandButton
              onPress={() => setIsCollapsed(!isCollapsed)}
              isCollapsed={isCollapsed}
            />
          )}
        </ReactNative.View>
      </ReactNative.TouchableOpacity>
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
