import { Workout } from "@utils/types";
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
    dispatch((state) => ({
      ...state,
      workOuts: [
        ...state.workOuts,
        { id: createUniqueId(), title, exercises: [] },
      ],
    }));
  };

  const removeWorkout = (id: string) => {
    dispatch((state) => ({
      ...state,
      workOuts: state.workOuts.filter((workOut) => id !== workOut.id),
    }));
  };

  const addExercise = (workOutId: string, title: string) => {
    dispatch((state) => ({
      ...state,
      workOuts: state.workOuts.map((workOut) => {
        if (workOutId === workOut.id) {
          workOut.exercises.push({
            id: createUniqueId(),
            title,
            reps: 0,
            sets: 0,
          });
        }
        return workOut;
      }),
    }));
  };

  const removeExercise = (workOutId: string, exerciseId: string) => {
    dispatch((state) => ({
      ...state,
      workOuts: state.workOuts.map((workOut) => {
        if (workOutId === workOut.id) {
          return {
            ...workOut,
            exercises: workOut.exercises.filter(
              (exercise) => exercise.id !== exerciseId,
            ),
          };
        }
        return workOut;
      }),
    }));
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
