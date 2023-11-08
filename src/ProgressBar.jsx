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
    // 開始或暫停進度條
    toggleStart: () => {
      startTime.value = null;
      setStart((prev) => !prev);
    },
    // 重設進度條
    reset: () => {
      setStart(false);
      startTime.current = null;
      dispatch({ type: ACTIONS.RESET });
    },
    // 提供目前進度給父元件
    percentage: state,
  }));

  useEffect(() => {
    // 如果 seconds, targetPercentage, startPercentage 改變就重設開始時間避免進度跳躍
    startTime.value = null;
  }, [seconds, targetPercentage, startPercentage]);

  useEffect(() => {
    let animationFrameId;
    const animateProgress = (timestamp) => {
      if (!start) return;
      // 如果初始值不是0，就用現在時間減去設定的時間
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
        payload: Math.min(percentage, targetPercentage), // 使用 Math.min 避免進度超過 targetPercentage
      });
    };
    animationFrameId = requestAnimationFrame(animateProgress);
    return () => {
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
