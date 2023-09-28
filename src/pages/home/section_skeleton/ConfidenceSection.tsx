import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import ProgressBar from "../components/ProgressBar";

function ConfidenceSection({ fact, isLoading }) {
  // const { data } = useSelector((state: any) => state.factcheck);
  const confidencePercent =
    fact?.confidence?.level && fact?.confidence?.level !== "unknown"
      ? fact?.confidence?.level
      : 0;

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
            <ProgressBar
              value={
                typeof confidencePercent === "string"
                  ? confidencePercent.replace("%", "")
                  : confidencePercent
              }
            /> //circular progress bar
          )}
        </div>
        <div>
          <p className="font-bold">
            {isLoading ? (
              <Skeleton width={150} />
            ) : (
              `${confidencePercent} Confidence Level`
            )}
          </p>
          {isLoading ? (
            <Skeleton width={150} />
          ) : (
            <p className="text-sirp-primary2 text-xs rounded-[1rem] border text-center w-[8rem]">
              Review confidence
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ConfidenceSection;
