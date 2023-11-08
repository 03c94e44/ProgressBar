import {
  useReducer,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const ACTIONS = {
  INCREASE: "INCREASE",
  RESET: "RESET",
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREASE:
      return action.payload;
    case ACTIONS.RESET:
      return 0;
    default:
      return state;
  }
}
const ProgressBar = (
  { seconds, targetPercentage, startPercentage = 0 },
  ref
) => {
  const [state, dispatch] = useReducer(reducer, 1);
  const [start, setStart] = useState(false);
  const startTime = useRef();

  useImperativeHandle(ref, () => ({
    toggleStart: () => {
      startTime.value = null;
      setStart((prev) => !prev);
    },
    reset: () => {
      setStart(false);
      startTime.current = null;
      dispatch({ type: ACTIONS.RESET });
    },
    percentage: state,
  }));

  useEffect(() => {
    startTime.value = null;
  }, [seconds, targetPercentage, startPercentage]);

  useEffect(() => {
    let animationFrameId;

    const animateProgress = (timestamp) => {
      if (!start) return;
      const timeOffset = (startPercentage / targetPercentage) * seconds * 1000;
      if (!startTime.value) {
        startTime.value = timestamp - timeOffset;
      }

      const elapsedTime = timestamp - startTime.value;
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
      console.log("cancelAnimationFrame");
      cancelAnimationFrame(animationFrameId);
    };
  }, [seconds, targetPercentage, startPercentage, start]);

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

export default forwardRef(ProgressBar);
