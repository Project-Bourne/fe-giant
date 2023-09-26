import { useTruncate } from "@/components/custom-hooks";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

function TagsKeywordsSection({ fact, isLoading }) {
  // const { data } = useSelector((state: any) => state.factcheck);

  // Check if data.url exists using optional chaining
  const source = fact?.url ? fact?.url : "No Title";

  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Source"}
      </p>
      <div className="flex gap-3 items-center mt-3 p-2 overflow-hidden text-[0.8rem] hover:text-sirp-primary">
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate" // This class truncates the text if it overflows
        >
          {source}
        </a>
      </div>
    </div>
  );
}

export default TagsKeywordsSection;
