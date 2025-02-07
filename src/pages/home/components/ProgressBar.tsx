import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressBarProps {
  value: number;
}

function ProgressBar({ value = 0 }: ProgressBarProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null or a placeholder during SSR
  if (!isMounted) {
    return <div className="w-[100px] h-[100px] rounded-full bg-gray-200" />;
  }

  const displayValue = Math.ceil(Number(value) || 0);

  const color =
    displayValue <= 20
      ? "#FF0000"
      : displayValue > 20 && displayValue <= 74
      ? "#FFBF00"
      : "#00CC99";

  return (
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
  );
}

export default ProgressBar;
