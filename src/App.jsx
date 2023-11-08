import { useRef, useState } from "react";
import ProgressBar from "./ProgressBar.jsx";

export default function App() {
  const [seconds, setSeconds] = useState(10);
  const [startPercentage, setStartPercentage] = useState(0);
  const [targetPercentage, setTargetPercentage] = useState(50);
  const progressRef = useRef(null);
  const currentTo100 = () => {
    setStartPercentage(progressRef.current.percentage);
    setTargetPercentage(100);
    setSeconds(2);
  };
  return (
    <div className="App">
      <button onClick={() => currentTo100()}>currentTo100</button>
      <button onClick={() => progressRef.current.reset()}>reset</button>
      <button onClick={() => progressRef.current.toggleStart()}>
        toggle start
      </button>
      <label>
        <span>seconds：</span>
        <input
          type="text"
          onChange={(e) => setSeconds(+e.target.value)}
          value={seconds}
        />
      </label>
      <br />
      <label>
        <span>targetPercentage：</span>
        <input
          type="text"
          onChange={(e) => setTargetPercentage(+e.target.value)}
          value={targetPercentage}
        />
      </label>
      <br />
      <label>
        <span>startPercentage：</span>
        <input
          type="text"
          onChange={(e) => setStartPercentage(+e.target.value)}
          value={startPercentage}
        />
      </label>
      <ProgressBar
        ref={progressRef}
        seconds={seconds}
        targetPercentage={targetPercentage}
        startPercentage={startPercentage}
      />
    </div>
  );
}
