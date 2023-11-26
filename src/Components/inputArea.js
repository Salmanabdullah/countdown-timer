import React, { useState } from "react";
import "./inputArea.css";
import DisplayTimer from "./displayTimer";
import soundAlert from "../assets/alert.wav";

const Header = () => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputTimes, setInputTimes] = useState("");

  /************* When times expires **************/
  const handleTimerExpire = () => {
    setTimerExpired(true);

    if (inputTimes > 0) {
      setInputTimes(inputTimes - 1);
      let sound = new Audio(soundAlert);
      sound.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      handleStartTimer();
    }
    /********when inputTimes become zero **********/
    if (inputTimes === 1) {
      setTimerExpired(true)
    }
    
  };
  /************* Countdown starts **************/
  const handleStartTimer = () => {
    if (
      isNaN(inputMinutes) ||
      isNaN(inputTimes) ||
      inputMinutes <= 0 ||
      inputTimes <= 0
    ) {
      alert("Please enter valid values for minutes and repeat.");
      return;
    }
    
    setTimerExpired(false); // Reset the timer when starting
    setTimerKey(timerKey + 1);
  };
  /************* input values **************/
  const handleMinutesChange = (e) => {
    // Update the state with the current value of the input field
    setInputMinutes(e.target.value);
  };

  const handleTimesChange = (e) => {
    // Update the state with the current value of the input field
    setInputTimes(e.target.value);
  };

  return (
    <div id="container">
      <section>
        Minutes:{" "}
        <input
          type="number"
          id="minutes"
          name="minutes"
          value={inputMinutes}
          onChange={handleMinutesChange}
          required
        />
      </section>
      <section>
        Repeat:{" "}
        <input
          type="number"
          value={inputTimes}
          onChange={handleTimesChange}
          required
          name="times"
        />
      </section>
      <div id="start">
        <button id="startButton" onClick={handleStartTimer}>
          Let's Go...
        </button>
      </div>
      <div>
        {!timerExpired ? (
          <div>
            <DisplayTimer
              key={timerKey}
              initialTimeInSeconds={inputMinutes*60}
              onTimerExpire={handleTimerExpire}
            />
          </div>
        ) : (
          <div id="timeContainer">
            <span id="displayTime">00</span>
            <span id="colon">:</span>
            <span id="displayTime">00</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
