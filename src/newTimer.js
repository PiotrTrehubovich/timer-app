import React from "react";
import { useState, useEffect } from "react";
import "./newTimer.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NewTimer = () => { 
  const [[mins, secs], setTime] = useState([25, 0]);
  const [work, setWork] = useState(true);
  const [timerActive, setTimerActive] = useState(false);
  const [message, setMessage] = useState("Press 'Start' to start the timer");
  const [bgColor, setBgColor] = useState("timer timer-start");

  function tick() {
    if (mins === 0 && secs === 0) {
      nextTimer();
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  useEffect(() => {
    if (timerActive) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  function startTimer() {
    setTimerActive(true);
    setBgColor(work ? "timer timer-work" : "timer timer-chill");
    setMessage(
      work
        ? "Now concentrate and work. Don't distract your attention to your phone or Youtube videos"
        : "Сhill now. Spend your free time with pleasure. Let your brain relax"
    );
  }

  function stopTimer() {
    setTimerActive(false);
    setMessage("Press 'Start' or 'Next' to continue");
    setBgColor("timer timer-start");
  }

  function nextTimer() {
    setTime(!work ? [25, 0] : [5, 0]);
    setWork(work => !work);
    if (timerActive) {
      setMessage(
        !work
          ? "Now concentrate and work. Don't distract your attention to your phone or Youtube videos"
          : "Сhill now. Spend your free time with pleasure. Let your brain relax"
      );
      setBgColor(work ? "timer timer-chill" : "timer timer-work");
    }
  }

  return (
    <div className={bgColor}>
      <h1 className="main-header">Start your working day with our timer!</h1>
      <p className="countDownTimer">{`${mins}:${secs < 10 ? `0${secs}` : secs}`}</p>
      <h2 className="secondary-header">{message}</h2>
      <button className="button" onClick={startTimer}>Start</button>
      <button className="button" onClick={stopTimer}>Stop</button>
      <button className="button" onClick={nextTimer}>Next</button>
    </div>
  );
}

export default NewTimer;