import { Workout } from "@utils/types";
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

  const addNewWorkout = (title: string) => {
    dispatch((state) => ({
      ...state,
      workOuts: [...state.workOuts, { id: Date.now().toString(), title }],
    }));
  };

  const removeWorkout = (id: string) => {
    dispatch((state) => ({
      ...state,
      workOuts: state.workOuts.filter((workOut) => id !== workOut.id),
    }));
  };

  return { ContextProvider, dispatch, state, addNewWorkout, removeWorkout };
};

export const StoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { ContextProvider } = useStore();
  return <ContextProvider>{children}</ContextProvider>;
};

export default StoreProvider;
