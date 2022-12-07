import React from "react";
import ReactNative from "react-native";
import { CardList } from "@components/Card/CardList";
import { useStore } from "@store/store";
import { CustomModal } from "@components/CustomModal/CustomModal";
import { InputModal } from "@components/CustomModal/InputModal";
import { InputData } from "@components/Input/types";
import { Button } from "@components/Button/Button";
import CommonStyles from "@styles/commonStyles";

interface WorkoutInput extends InputData {
  value: string;
}

interface ExerciseInput extends InputData {
  value: string;
}

interface WorkOutScheduleViewProps {
  workOutId: string;
  closeModal: () => void;
}

const WorkOutScheduleView: React.FC<WorkOutScheduleViewProps> = ({
  workOutId,
  closeModal,
}) => {
  const { state, addExercise, removeExercise } = useStore();
  const [inputModal, setInputModal] = React.useState<Element | null>(null);
  const [disableModalScroll, setDisableModalScroll] = React.useState(false);
  const workOut = state.workOuts.find((workOut) => workOutId === workOut.id);

  if (!workOut) {
    return null;
  }

  const submitExercise = (inputs: ExerciseInput[]) => {
    const title = inputs[0].value;
    title && addExercise(workOut.id, title);
    setInputModal(null);
  };

  return (
    <CustomModal
      disableSwipe={disableModalScroll}
      title={workOut.title}
      closeModal={closeModal}>
      <>
        {inputModal}
        <CardList
          cards={workOut.exercises}
          swipeDirection="right"
          removeCard={(id) => removeExercise(workOut.id, id)}
          setParentScrollsDisabled={setDisableModalScroll}
        />
        <Button
          title="Add"
          type="confirm"
          onPress={() =>
            setInputModal(
              <InputModal
                title="Add new exercise"
                inputs={[
                  {
                    id: "title",
                    label: "Title",
                    value: "",
                    type: "text",
                    autoFocus: true,
                  },
                ]}
                onSubmit={submitExercise}
                closeModal={() => setInputModal(null)}
              />,
            )
          }
        />
      </>
    </CustomModal>
  );
};

const workOutSchedulesViewStyles = ReactNative.StyleSheet.create({
  title: {
    ...CommonStyles.title,
  },
});

interface WorkOutSchedulesViewProps {}

export const WorkOutSchedulesView: React.FC<
  WorkOutSchedulesViewProps
> = ({}) => {
  const { state, addWorkout, removeWorkout } = useStore();
  const [workoutModal, setWorkoutModal] = React.useState<Element | null>(null);
  const [inputModal, setInputModal] = React.useState<Element | null>(null);

  const submitWorkout = (inputs: WorkoutInput[]) => {
    const title = inputs[0].value;
    title && addWorkout(title);
    setInputModal(null);
  };

  const onCardPress = (id: string) => {
    setWorkoutModal(
      <WorkOutScheduleView
        workOutId={id}
        closeModal={() => setWorkoutModal(null)}
      />,
    );
  };

  return (
    <ReactNative.View style={{ flex: 1 }}>
      <>
        {inputModal}
        {workoutModal}
        <ReactNative.View style={CommonStyles.header}>
          <ReactNative.Text style={workOutSchedulesViewStyles.title}>
            Workouts
          </ReactNative.Text>
        </ReactNative.View>
        <CardList
          cards={state.workOuts}
          swipeDirection="right"
          removeCard={removeWorkout}
          onCardPress={onCardPress}
          renderContent={(card) => <ReactNative.Text>Testi</ReactNative.Text>}
        />
        <Button
          title="Add"
          type="confirm"
          onPress={() =>
            setInputModal(
              <InputModal
                title="Add new workout"
                inputs={[
                  {
                    id: "title",
                    label: "Title",
                    value: "",
                    type: "text",
                    autoFocus: true,
                  },
                ]}
                onSubmit={submitWorkout}
                closeModal={() => setInputModal(null)}
              />,
            )
          }
        />
      </>
    </ReactNative.View>
  );
};
