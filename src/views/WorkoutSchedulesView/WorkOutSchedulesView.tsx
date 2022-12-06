import React from "react";
import ReactNative from "react-native";
import { CardList } from "@components/Card/CardList";
import { useStore } from "@store/store";
import { CustomModal } from "@components/CustomModal/CustomModal";
import { Workout } from "@utils/types";

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

  return (
    <ReactNative.View>
      <>
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
          onPress={() => addNewWorkout("Workout " + state.workOuts.length)}
        />
      </>
    </ReactNative.View>
  );
};
