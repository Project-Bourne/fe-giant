import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProgressBar from "./ProgressBar";
// import Link from "next/link";

import default_avatar from "../../../../public/icons/profile.svg";
import map from "../../../../public/icons/map.svg";
import date_img from "../../../../public/icons/date.svg";
// import { data } from "@/utils/home.constants";
import {
  useFormatDate,
  useFormatTime,
  useTruncate,
} from "@/components/custom-hooks";
import Link from "next/link";

const MataDataContent = ({
  title,
  confidence,
  author,
  author_avatar,
  location,
  date,
  tags,
  source,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-white w-[63rem] h-[100%] rounded-[1rem] mt-10 mx-5 pb-7">
      {/* title  */}
      <div className="mx-5">
        <p className="text-gray-500">
          {isLoading ? <Skeleton width={50} /> : "Title"}
        </p>
        <h1 className="text-black text-3xl capitalize">
          {isLoading ? <Skeleton /> : title}
        </h1>
      </div>

      <div className="mx-5 flex flex-wrap gap-10">
        {/* author  */}
        <div className="mt-3 w-[25rem]">
          <p className="text-gray-500 mt-3">
            {isLoading ? <Skeleton width={50} /> : "Author"}
          </p>
          {/* avatar  */}
          <div className="flex gap-3 items-center my-5">
            {isLoading ? (
              <Skeleton circle width={50} height={50} />
            ) : (
              <Image
                src={author_avatar ?? default_avatar}
                alt="documents"
                className="cursor-pointer"
                width={50}
              />
            )}
            <div>
              <p className="font-bold capitalize">
                {isLoading ? <Skeleton width={150} /> : author || "--"}
              </p>
              <p className="text-gray-500 text-sm flex gap-x-2">
                {isLoading ? (
                  <Skeleton width={150} />
                ) : location && location.length > 0 ? (
                  location?.map((item, index) => {
                    if (location?.length - 1 === index) {
                      return <div className="flex gap-x-2">{item}</div>;
                    } else {
                      return <div className="flex gap-x-2">{item},</div>;
                    }
                  })
                ) : (
                  "--"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* confidence  */}
        <div className="mt-3 w-[25rem]">
          <p className="text-gray-500 mt-3 pl-10">
            ``
            {isLoading ? <Skeleton width={150} /> : "Confidence"}
          </p>
          <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
            <div className="w-12">
              {isLoading ? (
                <Skeleton width={50} height={50} circle />
              ) : (
                <ProgressBar value={confidence?.replace("%", "")} />
              )}
            </div>
            <div>
              <p className="font-bold">
                {isLoading ? <Skeleton width={150} /> : `Confidence Level`}
              </p>
              {isLoading ? (
                <Skeleton width={150} />
              ) : (
                <p className="text-sirp-primary2 text-xs rounded-[1rem] border text-center w-[8rem] mt-1">
                  Review confidence
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[25rem]">
          <p className="text-gray-500">
            {isLoading ? <Skeleton width={50} /> : "Location"}
          </p>
          <div className="flex gap-3 items-center mt-3">
            {isLoading ? (
              <Skeleton width={50} height={50} circle />
            ) : (
              <Image
                src={map}
                alt="documents"
                className="cursor-pointer"
                width={50}
              />
            )}
            <div>
              <p className="font-bold">
                {isLoading ? <Skeleton width={150} /> : location ?? "--"}
              </p>
              <p className="text-gray-500 text-sm">
                {isLoading ? <Skeleton width={150} /> : location ?? "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[25rem]">
          <p className="text-gray-500 pl-10">
            {isLoading ? <Skeleton width={50} /> : "Date"}
          </p>
          <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
            {isLoading ? (
              <Skeleton width={50} height={50} circle />
            ) : (
              <Image
                src={date_img}
                alt="documents"
                className="cursor-pointer"
                width={50}
              />
            )}
            <div>
              <p className="font-bold">
                {isLoading ? <Skeleton width={150} /> : useFormatDate(date)}
              </p>
              <p className="text-gray-500 text-sm">
                {isLoading ? (
                  <Skeleton width={150} />
                ) : (
                  <small>{useFormatTime(date)}</small>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[25rem]">
          <p className="text-gray-500">
            {isLoading ? <Skeleton width={50} /> : "Tags & Keywords"}
          </p>
          {/* <div className="flex gap-3 items-center mt-3"> */}
          <div>
            <ul className="flex flex-wrap gap-1 w-full mt-3">
              {tags?.length > 0 &&
                tags?.map((tag, index) => (
                  <div key={index}>
                    {isLoading ? (
                      <Skeleton width={70} />
                    ) : (
                      <Link
                        href={tag?.href}
                        target="_blank"
                        className="border px-2 py-1 rounded-[0.7rem] text-[0.7rem] bg-sirp-keynotebg"
                      >
                        {tag?.origin.replace("https://", "")}
                      </Link>
                    )}
                  </div>
                ))}
            </ul>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default MataDataContent;
