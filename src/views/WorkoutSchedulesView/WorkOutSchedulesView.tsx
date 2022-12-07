import React from "react";
import ReactNative from "react-native";
import { CardList } from "@components/Card/CardList";
import { useStore } from "@store/store";
import { CustomModal } from "@components/CustomModal/CustomModal";
import { InputModal } from "@components/CustomModal/InputModal";
import { InputData } from "@components/Input/types";
import { Button } from "@components/Button/Button";
import CommonStyles from "@styles/commonStyles";

interface ExerciseViewProps {
  workOutId: string;
  exerciseId: string;
  closeModal: () => void;
}

const ExerciseView: React.FC<ExerciseViewProps> = ({
  workOutId,
  exerciseId,
  closeModal,
}) => {
  const { state } = useStore();
  const workOut = state.workOuts.find((workOut) => workOutId === workOut.id);
  const exercise = workOut?.exercises.find(
    (exercise) => exerciseId === exercise.id,
  );
  if (!exercise || !workOut) return null;
  return (
    <CustomModal title={workOut.title} closeModal={closeModal}>
      <ReactNative.Text>{exercise.title}</ReactNative.Text>
    </CustomModal>
  );
};

interface WorkoutInput extends InputData {
  value: string;
}

interface ExerciseInput extends InputData {
  id: "title" | "sets" | "reps";
  value: string | number;
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
  const [exerciseModal, setExerciseModal] = React.useState<Element | null>(
    null,
  );
  const [disableModalScroll, setDisableModalScroll] = React.useState(false);
  const workOut = state.workOuts.find((workOut) => workOutId === workOut.id);

  if (!workOut) {
    return null;
  }

  const submitExercise = (inputs: ExerciseInput[]) => {
    const title = inputs.find((input) => input.id === "title")
      ?.value as unknown as string;
    const reps = inputs.find((input) => input.id === "reps")
      ?.value as unknown as number;
    const sets = inputs.find((input) => input.id === "sets")
      ?.value as unknown as number;
    if (title && reps && sets) {
      const addedExercise = addExercise(workOut.id, title, sets, reps);
      if (addedExercise) {
        setInputModal(null);
        openExerciseModal(addedExercise.id);
      }
    }
  };

  const openExerciseModal = (id: string) => {
    setExerciseModal(
      <ExerciseView
        workOutId={workOutId}
        exerciseId={id}
        closeModal={() => setExerciseModal(null)}
      />,
    );
  };

  return (
    <CustomModal
      disableSwipe={disableModalScroll}
      title={workOut.title}
      closeModal={closeModal}>
      <>
        {inputModal}
        {exerciseModal}
        <CardList
          cards={workOut.exercises}
          swipeDirection="right"
          removeCard={(id) => removeExercise(workOut.id, id)}
          setParentScrollsDisabled={setDisableModalScroll}
          onCardPress={openExerciseModal}
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
                  {
                    id: "sets",
                    label: "Sets",
                    value: 0,
                    type: "number",
                    autoFocus: false,
                  },
                  {
                    id: "reps",
                    label: "Reps",
                    value: 0,
                    type: "number",
                    autoFocus: false,
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
    if (title) {
      const addedWorkout = addWorkout(title);
      setInputModal(null);
      openWorkoutModal(addedWorkout.id);
    }
  };

  const openWorkoutModal = (id: string) => {
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
          onCardPress={openWorkoutModal}
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
