import ReactNative from "react-native";

/**
 * Create alert dialog to confirm item deletions
 */
export const onDeleteItem = (
  onPressConfirm: () => void,
  onPressCancel?: () => void,
) => {
  ReactNative.Alert.alert(
    "Confirm deletion",
    "Are you sure you want to delete this item?",
    [
      {
        text: "Cancel",
        onPress: onPressCancel ? () => onPressCancel() : undefined,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => onPressConfirm(),
      },
    ],
  );
};
