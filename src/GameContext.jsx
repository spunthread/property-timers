import { createContext, useContext } from "react";

const defaultState = {};

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export function SaveProvider({ children }) {
  return <GameContext.Provider>{children}</GameContext.Provider>;
}
