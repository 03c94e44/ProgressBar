import { useReducer, useEffect, useRef } from "react";

const ACTIONS = {
  INCREASE: "INCREASE",
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREASE:
      return action.payload;
    default:
      return state;
  }
}
const ProgressBar = ({ seconds, targetPercentage, startPercentage = 0 }) => {
  const [state, dispatch] = useReducer(reducer, 1);

  useEffect(() => {
    let startTime;
    let animationFrameId;

    const animateProgress = (timestamp) => {
      const timeOffset = (startPercentage / targetPercentage) * seconds * 1000;
      if (!startTime) {
        startTime = timestamp - timeOffset;
      }

      const elapsedTime = timestamp - startTime;
      const percentage = Math.round(
        (elapsedTime / (seconds * 1000)) * targetPercentage
      );
      if (percentage <= targetPercentage) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
      dispatch({
        type: ACTIONS.INCREASE,
        payload: Math.min(percentage, targetPercentage),
      });
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [seconds, targetPercentage, startPercentage]);

  return (
    <div
      className="progress-bar"
      style={{ width: "200px", border: "1px solid white", margin: "0 auto" }}
    >
      <div
        className="progress"
        style={{ width: `${state}%`, backgroundColor: "red", color: "white" }}
      >
        {state}%
      </div>
    </div>
  );
};

export default ProgressBar;
