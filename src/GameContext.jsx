import { createContext, useContext, useReducer } from "react";

const defaultState = {
  bucks: 10,
  assets: [
    // { name: "Small House", level: 0, time: 3, rent: 2, cost: 5, inc: 1.05, onRent: false, auto: false },
    {
      name: "Studio Apartment",
      level: 0,
      time: 3,
      rent: 2,
      cost: 5,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "One-Bedroom Apartment",
      level: 0,
      time: 6,
      rent: 5,
      cost: 10,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Two-Bedroom Apartment",
      level: 0,
      time: 9,
      rent: 10,
      cost: 20,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    { name: "Townhouse", level: 0, time: 12, rent: 20, cost: 40, inc: 1.05, onRent: false, auto: false },
    {
      name: "Small Single-Family Home",
      level: 0,
      time: 15,
      rent: 40,
      cost: 80,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    { name: "Condo", level: 0, time: 18, rent: 80, cost: 160, inc: 1.05, onRent: false, auto: false },
    {
      name: "Large Single-Family Home",
      level: 0,
      time: 21,
      rent: 160,
      cost: 320,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    { name: "Duplex", level: 0, time: 24, rent: 320, cost: 640, inc: 1.05, onRent: false, auto: false },
    {
      name: "Three-Bedroom House",
      level: 0,
      time: 27,
      rent: 640,
      cost: 1280,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Four-Bedroom House",
      level: 0,
      time: 30,
      rent: 1280,
      cost: 2560,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Luxury Apartment",
      level: 0,
      time: 33,
      rent: 2560,
      cost: 5120,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Penthouse",
      level: 0,
      time: 36,
      rent: 5120,
      cost: 10240,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Beachfront Property",
      level: 0,
      time: 39,
      rent: 10240,
      cost: 20480,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Farmhouse",
      level: 0,
      time: 42,
      rent: 20480,
      cost: 40960,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Vacation Property",
      level: 0,
      time: 45,
      rent: 40960,
      cost: 81920,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Commercial Retail Space",
      level: 0,
      time: 48,
      rent: 81920,
      cost: 163840,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Office Building",
      level: 0,
      time: 51,
      rent: 163840,
      cost: 327680,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Industrial Warehouse",
      level: 0,
      time: 54,
      rent: 327680,
      cost: 655360,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Multi-Family Residential Building",
      level: 0,
      time: 57,
      rent: 655360,
      cost: 1310720,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
    {
      name: "Mixed-Use Development",
      level: 0,
      time: 60,
      rent: 1310720,
      cost: 2621440,
      inc: 1.05,
      onRent: false,
      auto: false,
    },
  ],
};

const data = JSON.parse(localStorage.getItem("state") ?? "null") ?? defaultState;
function reducer(state, action) {
  const { type, payload } = action;

  let mods;

  switch (type) {
    case "txn":
      mods = { ...state, bucks: state.bucks + payload };
      break;

    case "buy":
      mods = {
        ...state,
        bucks: state.bucks - state.assets[payload].cost,
        assets: state.assets.map((ast, i) =>
          payload === i
            ? { ...ast, level: ast.level + 1, inc: ast.inc + 0.05, cost: ast.cost * ast.inc }
            : ast
        ),
      };
      break;

    case "onrent":
      mods = {
        ...state,
        assets: state.assets.map((ast, i) => (payload === i ? { ...ast, onRent: true } : ast)),
      };
      break;

    case "offrent":
      mods = {
        ...state,
        assets: state.assets.map((ast, i) => (payload === i ? { ...ast, onRent: false } : ast)),
      };
      break;

    case "manage":
      mods = {
        ...state,
        bucks: state.bucks - state.assets[payload].rent * 20,
        assets: state.assets.map((ast, i) => (payload === i ? { ...ast, auto: true } : ast)),
      };
      break;

    default:
      mods = state;
  }

  localStorage.setItem("state", JSON.stringify(mods));

  return mods;
}

export function SaveProvider({ children }) {
  const reduced = useReducer(reducer, data);
  return <GameContext.Provider value={reduced}>{children}</GameContext.Provider>;
}

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);
