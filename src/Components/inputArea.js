import React, { useState } from "react";
import "./inputArea.css";
import DisplayTimer from "./displayTimer";

const Header = () => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleTimerExpire = () => {
    setTimerExpired(true);
    // You can perform additional actions when the timer expires
  };
  const handleStartTimer = () => {
    setTimerExpired(false); // Reset the timer when starting
    setTimerKey(timerKey + 1);
  };

  const handleChange = (e) => {
    // Update the state with the current value of the input field
    setInputValue(e.target.value);
  };

  return (
    <div>
      <section>
        How many minutes:
        <input
          type="number"
          id="minutes"
          name="minutes"
          value={inputValue}
          onChange={handleChange}
          required
        />
      </section>
      <section>
        How many times: <input type="number" required name="times" />
      </section>
      <div id="start">
        <button id="startButton" onClick={handleStartTimer}>
          Let's Go...
        </button>
      </div>
      <div>
        {!timerExpired ? (
          <DisplayTimer
            key={timerKey}
            initialTimeInSeconds={inputValue * 60}
            onTimerExpire={handleTimerExpire}
          />
        ) : (
          <p>Timer Expired!</p>
        )}
      </div>
    </div>
  );
};

export default Header;
