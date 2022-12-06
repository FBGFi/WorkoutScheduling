import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { InputData } from "@components/Input/types";
import Colors from "@styles/colors";
import Dimensions from "@styles/dimensions";
import React from "react";
import ReactNative from "react-native";

const screenHeight = ReactNative.Dimensions.get("window").height;

const inputModalStyles = ReactNative.StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  formContainer: {
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: Colors.primary_background,
    marginVertical: 30,
    paddingVertical: Dimensions.whitespace_vertical,
    paddingHorizontal: Dimensions.whitespace_horizontal,
  },
  inputWrapper: {
    marginBottom: Dimensions.whitespace_horizontal,
  },
});

interface InputModalProps<InputValue extends InputData> {
  inputs: InputValue[];
  closeModal: () => void;
  onSubmit: (inputs: InputValue[]) => void;
}

export function InputModal<InputValue extends InputData>({
  inputs,
  closeModal,
  onSubmit,
}: InputModalProps<InputValue>): JSX.Element {
  const [changedInputs, setChangedInputs] = React.useState(inputs);

  const onChange = (changedInput: InputValue, value: InputValue["value"]) => {
    setChangedInputs(
      changedInputs.map((input) => {
        if (input.id === changedInput.id) {
          return {
            ...input,
            value: value,
          };
        }
        return input;
      }),
    );
  };

  const onConfirm = () => {
    onSubmit(changedInputs);
  };

  return (
    <ReactNative.Modal transparent onRequestClose={closeModal}>
      <ReactNative.View style={inputModalStyles.wrapper}>
        <ReactNative.View style={inputModalStyles.formContainer}>
          {/* --- Inputs start --- */}
          <ReactNative.ScrollView style={{ maxHeight: screenHeight - 300 }}>
            {inputs.map((input, index) => (
              <ReactNative.View
                key={input.id + index}
                style={inputModalStyles.inputWrapper}>
                <Input
                  label={input.label}
                  value={input.value}
                  onChange={(value) => onChange(input, value)}
                  autoFocus={input.autoFocus}
                />
              </ReactNative.View>
            ))}
          </ReactNative.ScrollView>
          {/* --- Inputs end --- */}

          {/* --- Buttons start --- */}
          <ReactNative.View style={{ flexDirection: "row" }}>
            <Button
              title="Close"
              style={{ flex: 1 }}
              onPress={closeModal}
              type="cancel"
            />
            <Button
              title="Add"
              style={{ flex: 1 }}
              onPress={onConfirm}
              type="confirm"
            />
          </ReactNative.View>
          {/* --- Buttons end --- */}
        </ReactNative.View>
      </ReactNative.View>
    </ReactNative.Modal>
  );
}
