import React from "react";
import ReactNative from "react-native";
import Dimensions from "@styles/dimensions";
import Colors from "@styles/colors";
import Fonts from "@styles/fonts";

const inputStyles = ReactNative.StyleSheet.create({
  label: {
    fontSize: Dimensions.font_tiny,
    paddingLeft: Dimensions.whitespace_medium,
    color: Colors.secondary,
    fontFamily: Fonts.Titillium_semibold,
  },
  input: {
    borderColor: Colors.secondary,
    borderWidth: Dimensions.border_width,
    fontSize: Dimensions.font_small,
    color: Colors.secondary_font,
    fontFamily: Fonts.Titillium_semibold,
    paddingLeft: Dimensions.whitespace_medium,
  },
});

interface StringifiableObject {
  toString(): string;
}

interface InputProps<ValueType extends StringifiableObject> {
  value: ValueType;
  onBlur?: (value: ValueType) => void;
  onChange?: (value: ValueType) => void;
  label: string;
  autoFocus?: boolean;
}

export function Input<ValueType extends StringifiableObject>({
  value,
  onBlur,
  label,
  onChange,
  autoFocus,
}: InputProps<ValueType>): JSX.Element {
  const [inputValue, setInputValue] = React.useState(value.toString());
  const inputRef = React.useRef<ReactNative.TextInput | null>(null);

  const getKeyBoardType = (): ReactNative.KeyboardTypeOptions => {
    switch (typeof value) {
      case "number":
        return "numeric";
    }
    return "default";
  };

  const convertValue = (changedValue: string): ValueType => {
    let convertedValue: any = changedValue;
    switch (typeof value) {
      case "number":
        convertedValue = Number(changedValue);
        break;
    }
    return convertedValue as ValueType;
  };

  const onInputChange = (changedValue: string) => {
    setInputValue(changedValue);
    onChange && onChange(convertValue(changedValue));
  };

  const onInputBlur = () => {
    onBlur && onBlur(convertValue(inputValue));
  };

  return (
    <ReactNative.View>
      <ReactNative.Text style={inputStyles.label}>{label}</ReactNative.Text>
      <ReactNative.TextInput
        ref={inputRef}
        autoFocus={autoFocus}
        value={inputValue.toString()}
        onChange={(e) => onInputChange(e.nativeEvent.text)}
        onBlur={onInputBlur}
        style={inputStyles.input}
        keyboardType={getKeyBoardType()}
      />
    </ReactNative.View>
  );
}
