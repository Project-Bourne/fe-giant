import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { useTruncate } from "@/components/custom-hooks";

function TitleSection({ fact, isLoading }) {
  // const { data } = useSelector((state: any) => state.factcheck);

  // Check if data.url exists
  const title = fact?.fact?.confidence?.title
    ? fact?.fact?.confidence?.title
    : "No Title";
  return (
    <div className="mx-5 md:w-full ">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Title"}
      </p>
      <h1 className="text-black text-2xl first-letter:capitalize px-2">
        {isLoading ? <Skeleton /> : title}
      </h1>
    </div>
  );
}

export default TitleSection;
