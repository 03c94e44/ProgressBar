import { useState } from "react";
import ProgressBar from "./ProgressBar.jsx";
export default function App(props) {
  const [seconds, setSeconds] = useState(5);
  const [startPercentage, setStartPercentage] = useState(0);
  const [targetPercentage, setTargetPercentage] = useState(20);
  return (
    <div className="App">
      <label>
        <span>seconds：</span>
        <input
          type="text"
          onChange={(e) => setSeconds(e.target.value)}
          value={seconds}
        />
      </label>
      <br />
      <label>
        <span>targetPercentage：</span>
        <input
          type="text"
          onChange={(e) => setTargetPercentage(e.target.value)}
          value={targetPercentage}
        />
      </label>
      <br />
      <label>
        <span>startPercentage：</span>
        <input
          type="text"
          onChange={(e) => setStartPercentage(e.target.value)}
          value={startPercentage}
        />
      </label>
      <ProgressBar
        seconds={seconds}
        targetPercentage={targetPercentage}
        startPercentage={startPercentage}
      />
    </div>
  );
}
