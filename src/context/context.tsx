"use client";

import React, { useState } from "react";

export interface StateValues {
  equation: string;
  setEquation?: React.Dispatch<React.SetStateAction<string>>;
}

type Context = React.Context<StateValues>;

const initialStateValues: StateValues = {
  equation: "0"
};

export const AppContext: Context = React.createContext<StateValues>(initialStateValues);

type State<Type> = [Type, React.Dispatch<React.SetStateAction<Type>>];

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = (props: ContextProviderProps) => {
  const [equation, setEquation]: State<string> = useState<string>(initialStateValues.equation);

  return (
    <AppContext.Provider value={{ equation, setEquation }}>
      {props.children}
    </AppContext.Provider>
  );
};