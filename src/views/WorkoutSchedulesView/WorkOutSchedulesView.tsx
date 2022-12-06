import React from "react";
import ReactNative from "react-native";
import { CardList } from "@components/Card/CardList";
import { useStore } from "@store/store";
import { CustomModal } from "@components/CustomModal/CustomModal";
import { Workout } from "@utils/types";
import { InputModal } from "@components/CustomModal/InputModal";
import { InputData } from "@components/Input/types";

interface WorkoutInput extends InputData {
  value: string;
}

interface WorkOutScheduleViewProps {
  workOut: Workout;
  closeModal: () => void;
}
const WorkOutScheduleView: React.FC<WorkOutScheduleViewProps> = ({
  workOut,
  closeModal,
}) => {
  return <CustomModal title={workOut.title} closeModal={closeModal} />;
};

interface WorkOutSchedulesViewProps {}

export const WorkOutSchedulesView: React.FC<
  WorkOutSchedulesViewProps
> = ({}) => {
  const { state, addNewWorkout, removeWorkout } = useStore();
  const [workoutModal, setWorkoutModal] = React.useState<Element | null>(null);
  const [inputModal, setInputModal] = React.useState<Element | null>(null);

  const submitWorkout = (inputs: WorkoutInput[]) => {
    const title = inputs[0].value;
    title && addNewWorkout(title);
    setInputModal(null);
  };

  return (
    <ReactNative.View>
      <>
        {inputModal}
        {workoutModal}
        <CardList
          cards={state.workOuts}
          swipeDirection="right"
          removeCard={removeWorkout}
          onCardPress={(id) => {
            const workOut = state.workOuts.find((workOut) => workOut.id === id);
            workOut &&
              setWorkoutModal(
                <WorkOutScheduleView
                  workOut={workOut}
                  closeModal={() => setWorkoutModal(null)}
                />,
              );
          }}
          renderContent={(card) => <ReactNative.Text>Testi</ReactNative.Text>}
        />
        <ReactNative.Button
          title="Add"
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
