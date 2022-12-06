import React from "react";
import ReactNative from "react-native";
import Colors from "../../styles/colors";
import CommonStyles from "../../styles/commonStyles";
import Dimensions from "../../styles/dimensions";

const customModalStyles = ReactNative.StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.primary_background,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.secondary_background,
    paddingVertical: Dimensions.whitespace_vertical,
    paddingHorizontal: Dimensions.whitespace_horizontal,
  },
  title: {
    ...CommonStyles.title,
    flex: 1,
  },
  contentContainer: {
    paddingVertical: Dimensions.whitespace_vertical,
    paddingHorizontal: Dimensions.whitespace_horizontal,
  },
});

interface CustomModalProps extends React.PropsWithChildren {
  title: string;
  setModal: (modal: null) => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  children,
  setModal,
}) => {
  return (
    <ReactNative.Modal
      animationType="slide"
      onRequestClose={() => setModal(null)}>
      <ReactNative.View style={customModalStyles.wrapper}>
        {/* --- Header start --- */}
        <ReactNative.View style={customModalStyles.header}>
          <ReactNative.Text style={customModalStyles.title}>
            {title}
          </ReactNative.Text>
          <ReactNative.TouchableOpacity onPress={() => setModal(null)}>
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
    </ReactNative.Modal>
  );
};
