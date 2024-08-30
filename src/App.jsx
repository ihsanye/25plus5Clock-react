import './App.css'

function App() {

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div id="set-label">
        <p>Break Lenght</p>
        <p>Session Lenght</p>
      </div>
      <div id="set-time">
        <div id="break-label">
          <button id="break-decrement">-</button>
          <p id='break-lenght'>5</p>
          <button id="break-increment">+</button>
        </div>
        <div id="session-label">
          <button id="session-decrement">-</button>
          <p id='session-length'>25</p>
          <button id="session-increment">+</button>
        </div>
      </div>
      <div id="timer-label">
        <p>Session</p>
        <h2 id='time-left'>25:00</h2>
      </div>
      <div id="adjusting">
        <button id="start_stop">start</button>
        <button id="reset">reset</button>
      </div>
      <q id="quote">Long term consistency beats short term intensity</q>
      <p>-Bruce Lee</p>
    </div>
  )
}

export default App
