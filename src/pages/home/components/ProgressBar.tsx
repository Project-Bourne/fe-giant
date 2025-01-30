import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressBar({ value = 0 }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show 0 during server-side rendering
  const displayValue = mounted ? value : 0;

  const color =
    displayValue <= 20
      ? "#FF0000"
      : displayValue > 20 && displayValue <= 74
      ? "#FFBF00"
      : "#00CC99";

  return (
    <div>
      <CircularProgressbar
        value={displayValue}
        text={`${displayValue}%`}
        strokeWidth={11}
        styles={{
          path: {
            stroke: color,
          },
          trail: {
            stroke: "#d6d6d6",
          },
          text: {
            fill: "black",
          },
        }}
      />
    </div>
  );
}

export default ProgressBar;
