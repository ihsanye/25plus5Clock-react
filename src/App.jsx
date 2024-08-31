import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingType] = useState("SESSION");
  const [play, setPlay] = useState(false);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const increaseBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  }

  const decreaseBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  }

  const increaseSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  }

  const decreaseSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  }

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60)
      setTimingType("BREAK")
      audio.play()
    }
    if (!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  }

  const clock = () => {
    if (play) {
      timeout
      resetTimer()
    } else {
      clearTimeout(timeout)
    }
  }

  useEffect(() => {
    clock();
  }, [play, timeLeft, timeout])

  const timeFormatter = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft - mins * 60;
    const formattedSecs = secs < 10 ? '0' + secs : secs;
    const formattedMins = mins < 10 ? '0' + mins : mins;
    return `${formattedMins}:${formattedSecs}`;
  }

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div id="set-label">
        <p>Break Lenght</p>
        <p>Session Lenght</p>
      </div>
      <div id="set-time">
        <div id="break-label">
          <button disabled={play} onClick={decreaseBreak} id="break-decrement">-</button>
          <p id='break-length'>{breakLength}</p>
          <button disabled={play} onClick={increaseBreak} id="break-increment">+</button>
        </div>
        <div id="session-label">
          <button disabled={play} onClick={decreaseSession} id="session-decrement">-</button>
          <p id='session-length'>{sessionLength}</p>
          <button disabled={play} onClick={increaseSession} id="session-increment">+</button>
        </div>
      </div>
      <div id='timer-part'>
        <p id="timer-label">{title}</p>
        <h2 id='time-left'>{timeFormatter()}</h2>
      </div>
      <div id="adjusting">
        <button onClick={handlePlay} id="start_stop">start/stop</button>
        <button onClick={handleReset} id="reset">reset</button>
      </div>
      <q id="quote">Long term consistency beats short term intensity</q>
      <p>-Bruce Lee</p>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
  )
}

export default App
