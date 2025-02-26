import React from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import { useSelector } from "react-redux";

function LocationSection({ fact, isLoading }) {
  // const { data } = useSelector((state: any) => state.factcheck);
  const location = fact?.fact?.countries || fact?.countries || "No location";

  return (
    <div className="w-[25rem]">
      <p className="text-gray-500">
        {isLoading ? <Skeleton width={50} /> : "Location"}
      </p>
      <div className="flex gap-3 items-start mt-3">
        {isLoading ? (
          <Skeleton width={50} height={50} circle />
        ) : (
          <PublicIcon />
        )}

        <div>
          {/* <p className="font-bold">
            {isLoading ? <Skeleton width={150} /> : "Nigeria"}
          </p> */}
          <p className="text-gray-500 text-sm">
            {isLoading ? (
              <Skeleton width={150} />
            ) : (
              <div className="flex flex-wrap gap-x-1">
                {typeof location !== "string" && location?.length > 0
                  ? location.map(
                      (
                        country,
                        index, // display all array countries and dynamically add comma "," to each element except the last item
                      ) => (
                        <div key={index}>
                          {country}
                          {index !== location?.length - 1 && ","}
                        </div>
                      ),
                    )
                  : "No location"}
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
export default LocationSection;
