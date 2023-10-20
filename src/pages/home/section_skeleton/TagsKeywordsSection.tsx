import { useTruncate } from "@/components/custom-hooks";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

function TagsKeywordsSection({ fact, isLoading }) {
  // const { data } = useSelector((state: any) => state.factcheck);

  // Check if data.url exists using optional chaining
  const source = fact?.fact?.url ? fact?.fact?.url : "No Source";
  const nSource =
    (source !== "No Source" && source !== "" && source.includes("www.")) ||
    source.includes("https")
      ? new URL(source).hostname
      : source;

  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Source"}
      </p>
      <div className="flex items-center mt-1 p-2 overflow-hidden text-[0.8rem]  hover:text-sirp-primary">
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate uppercase" // This class truncates the text if it overflows
        >
          {nSource}
        </a>
      </div>
    </div>
  );
}

export default TagsKeywordsSection;
