import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import ProgressBar from "../components/ProgressBar";

interface ConfidenceSectionProps {
  fact: any;
  isLoading: boolean;
}

function ConfidenceSection({ fact, isLoading }: ConfidenceSectionProps) {
  const [confidence, setConfidence] = useState<any>();

  useEffect(() => {
    if (fact?.confidence?.level) {
      if (
        fact?.confidence?.level !== "unknown" &&
        fact?.confidence?.level.toLowerCase() !== "nan%"
      ) {
        setConfidence(fact?.confidence?.level);
      } else {
        setConfidence("0%");
      }
    }

    if (fact?.fact?.confidence?.level) {
      if (
        fact?.fact?.confidence?.level !== "unknown" &&
        fact?.fact?.confidence?.level.toLowerCase() !== "nan%"
      ) {
        setConfidence(fact?.fact?.confidence?.level);
      } else {
        setConfidence("0%");
      }
    }
  }, [fact]);

  const confidencePercent =
    confidence &&
    confidence !== "unknown" &&
    confidence.toLowerCase() !== "nan%"
      ? Math.ceil(parseFloat(confidence))
      : "0%";

  // Convert string percentage to number and handle edge cases
  const getNumericValue = (value: string | number): number => {
    if (typeof value === "number") {
      return Math.ceil(value);
    }
    // Remove % and convert to number
    const numValue = parseFloat(value.replace("%", ""));
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
            <ProgressBar value={getNumericValue(confidencePercent)} />
          )}
        </div>
        <div>
          <p className="font-bold flex items-center">
            {isLoading ? (
              <Skeleton width={150} />
            ) : (
              <p>
                {typeof confidencePercent === "string"
                  ? confidencePercent
                  : Math.ceil(confidencePercent) + "%"}{" "}
                Confidence Level
              </p>
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
