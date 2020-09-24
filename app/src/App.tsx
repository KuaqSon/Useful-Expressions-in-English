import React, { useState } from "react";
import data from "./data.json";
import Board from "./components/Board";
import { DebounceInput } from "react-debounce-input";
import "./App.css";

function App() {
  const [lookup, setLookup] = useState("");

  return (
    <div className="App">
      <div className="top">
        <div className="top_title">Useful Expressions in English</div>
        <div className="search">
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            onChange={(event) => setLookup(event.target.value)}
            className="search_input"
            placeholder="Type here to search..."
            autoFocus={true}
          />
        </div>
        <div className="credit">
          <div>
            Source:
            <a href="https://www.ihbristol.com/useful-english-expressions" target="_blank" rel="noopener noreferrer">
              Learn Useful Expressions in English
            </a>
          </div>
          <div>Made by Quang Son with ❤</div>
        </div>
      </div>
      <Board list={data} lookup={lookup} />
    </div>
  );
}

export default App;
