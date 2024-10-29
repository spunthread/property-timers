import { useCallback, useEffect, useState } from "react";

const App = () => {
  useEffect(() => {
    console.log("effect started");

    return () => {
      console.log("effect cleanup");
    };
  }, []);

  console.log({ popupsDetails: null, visiblePopup: [] });

  return (
    <>
      <header className="top">
        <span id="mspn"></span>
        <button id="sbtn">Save</button>
      </header>

      <section className="mid">
        <div className="item">
          <figure>
            <img src="asset/00.png" />
            <figcaption>Small House</figcaption>
          </figure>
          <p className="inmid">
            <span className="tspn"></span>
            <progress
              className="pbar"
              max="2.9"></progress>
          </p>
          <p className="atend">
            <button
              className="bbtn"
              data-reff="0">
              Buy
            </button>
            <button
              className="rbtn"
              data-reff="0">
              Rent
            </button>
            <button
              className="mbtn"
              data-reff="0">
              Manage
            </button>
          </p>
        </div>
      </section>
    </>
  );
};

export default App;
