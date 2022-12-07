import { Exercise, Workout } from "@utils/types";
import { createUniqueId } from "@utils/utils";
import React from "react";

interface IState {
  workOuts: Workout[];
}

type TCallBack = (state: IState) => IState;

const initialState: IState = {
  workOuts: [],
};

const reducer = (state: IState, callback: TCallBack) => callback(state);

const StoreContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<TCallBack>;
}>({ state: initialState, dispatch: () => {} });

export const useStore = () => {
  const ContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
      <StoreContext.Provider value={{ state, dispatch }}>
        {children}
      </StoreContext.Provider>
    );
  };

  const { state, dispatch } = React.useContext(StoreContext);

  const addWorkout = (title: string) => {
    let addedWorkout: Workout = { id: createUniqueId(), title, exercises: [] };
    dispatch((state) => ({
      ...state,
      workOuts: [...state.workOuts, addedWorkout],
    }));
    return addedWorkout;
  };

  const removeWorkout = (id: string) => {
    let removedWorkout = state.workOuts.find((workOut) => workOut.id === id);
    dispatch((state) => ({
      ...state,
      workOuts: state.workOuts.filter((workOut) => id !== workOut.id),
    }));
    return removedWorkout;
  };

  const addExercise = (
    workOutId: string,
    title: string,
    reps: number,
    sets: number,
  ) => {
    let addedExercise: Exercise | undefined;
    const workOuts = state.workOuts.map((workOut) => {
      if (workOutId === workOut.id) {
        addedExercise = {
          id: createUniqueId(),
          title,
          reps,
          sets,
        };
        workOut.exercises.push(addedExercise);
      }
      return workOut;
    });
    dispatch((state) => ({
      ...state,
      workOuts,
    }));
    return addedExercise;
  };

  const removeExercise = (workOutId: string, exerciseId: string) => {
    let removedExercise: Exercise | undefined;
    const workOuts = state.workOuts.map((workOut) => {
      if (workOutId === workOut.id) {
        removedExercise = workOut.exercises.find(
          (exercise) => exercise.id === exerciseId,
        );
        return {
          ...workOut,
          exercises: workOut.exercises.filter(
            (exercise) => exercise.id !== exerciseId,
          ),
        };
      }
      return workOut;
    });
    dispatch((state) => ({
      ...state,
      workOuts,
    }));
    return removedExercise;
  };

  return {
    ContextProvider,
    dispatch,
    state,
    addWorkout,
    removeWorkout,
    addExercise,
    removeExercise,
  };
};

export const StoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { ContextProvider } = useStore();
  return <ContextProvider>{children}</ContextProvider>;
};

export default StoreProvider;
