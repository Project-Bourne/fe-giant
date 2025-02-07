import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProgressBar from "../components/ProgressBar";
import dynamic from "next/dynamic";

// Dynamically import CircularProgressbar with no SSR
const DynamicProgressBar = dynamic(() => import("../components/ProgressBar"), {
  ssr: false,
  loading: () => (
    <div className="w-[100px] h-[100px] rounded-full bg-gray-200" />
  ),
});

interface ConfidenceSectionProps {
  fact: any;
  isLoading: boolean;
}

function ConfidenceSection({ fact, isLoading }: ConfidenceSectionProps) {
  const [confidence, setConfidence] = useState<string>("0");

  useEffect(() => {
    if (!fact) return;

    const confidenceLevel =
      fact?.confidence?.level || fact?.fact?.confidence?.level;

    if (
      confidenceLevel &&
      confidenceLevel !== "unknown" &&
      confidenceLevel.toLowerCase() !== "nan%"
    ) {
      setConfidence(confidenceLevel);
    } else {
      setConfidence("0");
    }
  }, [fact]);

  const getNumericValue = (value: string | number): number => {
    if (typeof value === "number") return Math.ceil(value);
    const numValue = parseFloat(String(value).replace("%", ""));
    return isNaN(numValue) ? 0 : Math.ceil(numValue);
  };

  return (
    <div className="mt-3 w-[25rem]">
      <p className="text-gray-500 mt-3 pl-10">
        {isLoading ? <Skeleton width={150} /> : "Confidence"}
      </p>
      <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
        <div className="w-12">
          {isLoading ? (
            <Skeleton width={50} height={50} circle />
          ) : (
            <DynamicProgressBar value={getNumericValue(confidence)} />
          )}
        </div>
        <div>
          <p className="font-bold flex items-center">
            {isLoading ? (
              <Skeleton width={150} />
            ) : (
              `${getNumericValue(confidence)}% Confidence Level`
            )}
          </p>
          {/* {isLoading ? (
            <Skeleton width={150} />
          ) : (
            <p className="text-sirp-primary2 text-xs rounded-[1rem] border text-center w-[8rem]">
              Review confidence
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ConfidenceSection;
