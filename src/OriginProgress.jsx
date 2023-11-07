import { useRef, useState, useEffect } from "react";

const ProgressDialog = (props) => {
  const { open, sec, speedUp, msg } = props;
  const [progress, setProgress] = useState(0);
  const [spread, setSpread] = useState("");
  const { t } = useTranslation();
  const timer = useRef();
  const count = useRef();

  useEffect(() => {
    if (open) {
      timer.current = setInterval(() => {
        setProgress((prevProgress) => {
          const post = prevProgress + 100 / sec;
          return post >= 30 ? 30 : post;
        });
      }, 1000);
      return () => {
        clearInterval(timer.current);
      };
    }
  }, [open]);

  useEffect(() => {
    if (speedUp[0]) clearInterval(timer.current);
    if (speedUp[0] && progress >= 0) {
      const time = speedUp[0]; // 加速秒數
      const purpose = speedUp[1] || 100; // 加速後的目標進度
      timer.current = setInterval(() => {
        setProgress((prevProgress) => {
          const post = prevProgress + 1;
          return post >= purpose ? purpose : post;
        });
      }, (time / (purpose - progress)) * 1000);
      return () => {
        clearInterval(timer.current);
      };
    }
  }, [speedUp]); // speedUp => after the number of seconds to close Dialog

  useEffect(() => {
    clearInterval(count.current);
    if (msg) {
      count.current = setInterval(() => {
        setSpread((prevSpread) =>
          prevSpread == "..." ? "" : `${prevSpread}.`
        );
      }, 1000);
      return () => {
        clearInterval(count.current);
      };
    }
  }, [msg]);

  const message = msg ? (
    <span>
      {msg} {spread}
    </span>
  ) : null;

  return (
    <div open={open}>
      {message} - {progress}
    </div>
  );
};

export default ProgressDialog;
