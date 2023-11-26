import React, { useState, useEffect } from "react";
import './displayTimer.css'

const DisplayTimer = ({ initialTimeInSeconds, onTimerExpire }) => {
  const [countdownTime, setCountdownTime] = useState(initialTimeInSeconds);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdownTime > 0) {
        setCountdownTime(countdownTime - 1);
      } else {
        clearInterval(countdownInterval);
        onTimerExpire(); // Callback function when the timer reaches zero
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [countdownTime, onTimerExpire]);

  // Function to format time (add leading zero if needed)
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const minutes = Math.floor(countdownTime / 60);
  const seconds = countdownTime % 60;

  return (
    <div id="timeContainer">
      <span id="displayTime">{formatTime(minutes)}</span>
      <span id="colon">:</span>
      <span id="displayTime">{formatTime(seconds)}</span>
    </div>
  );
};

export default DisplayTimer;
