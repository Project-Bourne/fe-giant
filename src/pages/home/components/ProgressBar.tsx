import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressBar({ value }) {
  const color =
    value <= 20 ? "#FF0000" : value > 20 && value <= 74 ? "#FFBF00" : "#00CC99";

  return (
    <div>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
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
