import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";

function AuthorSection({ fact, isLoading }) {
  const [source, setSource] = useState(null);

  useEffect(() => {
    if (fact?.url) {
      const domain = new URL(fact?.url).hostname;
      setSource(domain);
    }
    if (fact?.fact?.url) {
      const domain = new URL(fact?.fact?.url).hostname;
      setSource(domain);
    }
  }, [fact]);

  const author = fact?.confidence?.author
    ? fact?.confidence?.author // if there's no author, use hostname
    : fact?.fact?.confidence?.author
    ? fact?.fact?.confidence?.author
    : "No Author";

  const newAuthor =
    typeof author !== "string" && author[0] !== ""
      ? author[0]
      : source
      ? source
      : "No Author";

  return (
    <div className="mt-3 w-[25rem]">
      <p className="text-gray-500 mt-3">
        {isLoading ? <Skeleton width={50} /> : "Author"}
      </p>
      <div className="flex gap-3 items-start my-5  cursor-pointer">
        {isLoading ? (
          <Skeleton circle width={50} height={50} />
        ) : (
          <PersonIcon />
        )}
        <div>
          <p className="font-semibold first-letter:capitalize">
            {isLoading ? <Skeleton width={150} /> : newAuthor}
          </p>
        </div>
      </div>
    </div>
  );
}
export default AuthorSection;
