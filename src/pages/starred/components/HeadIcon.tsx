import React from "react";
import Image from "next/image";
import BlueButton from "@/components/ui/BlueButton";
import { Checkbox } from "@mui/material";
import Link from "next/link";
import Pagination from "./pagination";

import down from "../../../../public/icons/down.svg";
import refresh from "../../../../public/icons/refresh.svg";

function HeadIcon({ activeOption, onOptionChange, onClick }) {
  const showButton = activeOption === "New";

  return (
    <div className="flex justify-between items-center w-[100%] mr-[3rem]">
      {/* These are the three icons to the left */}
      <div className="flex flex-row items-center pl-[1rem]">
        <Checkbox onClick={onClick} />
        <Image
          src={down}
          alt="documents"
          className="cursor-pointer ml-2"
          width={10}
        />
        <Image
          src={refresh}
          alt="documents"
          className="cursor-pointer ml-5"
          width={20}
        />
      </div>
      <div className="flex gap-4 items-center pr-[1rem]">
        {/* Pagination section */}
        <Pagination />
        {/* Blue action button */}
        {showButton && (
          <Link href="./home/addcontent/addcontent">
            <BlueButton />
          </Link>
        )}
      </div>
    </div>
  );
}

export default HeadIcon;
