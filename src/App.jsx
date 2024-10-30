import { useEffect, useRef, useState } from "react";
import { useGameContext } from "./GameContext";

const App = () => {
  const [state, dispatch] = useGameContext();
  const timerRefs = useRef(Array(state.assets.length).fill(0));
  const [timings, setTimings] = useState(state.assets.map(({ time }) => time));

  useEffect(() => {
    const ids = timerRefs.current;
    state.assets.forEach(({ level, time, rent, onRent, auto }, ix) => {
      if (level && (auto || onRent))
        ids[ix] = setInterval(() => {
          setTimings((timings) => {
            if (timings[ix] <= 0) {
              timings[ix] = time;
              Promise.resolve().then(() => dispatch({ type: "txn", payload: rent * level }));
              if (onRent) Promise.resolve().then(() => dispatch({ type: "offrent", payload: ix }));
            } else {
              timings[ix] -= 0.1;
            }
            return [...timings];
          });
        }, 1e2);
    });
    return () => ids.forEach((id) => clearInterval(id));
  }, [dispatch, state]);

  return (
    <>
      <header className="top">
        <span id="mspn">${state.bucks.toFixed(2)}</span>
        <button
          id="sbtn"
          onClick={() => dispatch({ type: "save" })}>
          Save
        </button>
      </header>

      <section className="mid">
        {state.assets.map(({ name, level, time, rent, cost, onRent, auto }, ix) => (
          <div
            key={ix}
            className="item">
            <figure>
              <img
                alt={name}
                src={`imgs/${ix.toString().padStart(2, 0)}.png`}
              />
              <figcaption>{name}</figcaption>
            </figure>
            <p className="inmid">
              <span className="tspn">{JSON.stringify({ cost: cost.toFixed(2), level, rent, time })}</span>
              <progress
                className="pbar"
                value={time - timings[ix]}
                max={time}></progress>
            </p>
            <p className="atend">
              <button
                className="bbtn"
                disabled={state.bucks < cost}
                onClick={() => dispatch({ type: "buy", payload: ix })}>
                Buy
              </button>
              {!auto && !onRent && !!level && (
                <>
                  <button
                    className="rbtn"
                    onClick={() => dispatch({ type: "onrent", payload: ix })}>
                    Rent
                  </button>
                  <button
                    className="mbtn"
                    disabled={state.bucks < rent * 20}
                    onClick={() => dispatch({ type: "manage", payload: ix })}>
                    Manage
                  </button>
                </>
              )}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default App;
