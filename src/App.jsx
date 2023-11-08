import { useRef, useState } from 'react';
import ProgressBar from './ProgressBar.jsx';
import OriginProgress from './OriginProgress.jsx';
export default function App(props) {
  const [seconds, setSeconds] = useState(5);
  const [startPercentage, setStartPercentage] = useState(0);
  const [targetPercentage, setTargetPercentage] = useState(20);
  const progressRef = useRef(null);
  return (
    <div className="App">
      <button onClick={() => progressRef.current.toggleStop()}>toggle stop</button>
      <label>
        <span>seconds：</span>
        <input type="text" onChange={(e) => setSeconds(+e.target.value)} value={seconds} />
      </label>
      <br />
      <label>
        <span>targetPercentage：</span>
        <input type="text" onChange={(e) => setTargetPercentage(+e.target.value)} value={targetPercentage} />
      </label>
      <br />
      <label>
        <span>startPercentage：</span>
        <input type="text" onChange={(e) => setStartPercentage(+e.target.value)} value={startPercentage} />
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
